import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// Refolosim funcția walkSync pentru a găsi toate fișierele din director
export function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

// Obținem toate căile fișierelor Markdown
export async function getMdxPaths() {
    const tutorialDir = path.join(process.cwd(), 'tutorial');
    const paths = [];

    for (const filePath of walkSync(tutorialDir)) {
        if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
            // Convertim calea în formatul necesar pentru rutare Next.js
            const relativePath = path.relative(tutorialDir, filePath);
            const routePath = '/tutorial/' + relativePath.split(path.sep).join('/').replace(/\.mdx?$/, '');
            paths.push(routePath);
        }
    }

    return paths;
}

// Funcție ajutătoare pentru a elimina anumite elemente problematice din Markdown
function sanitizeMarkdown(content) {
    // Adăugăm spații în codul fenced pentru a evita problemele de parsare
    let sanitized = content;

    // Adăugăm un newline înainte și după blocurile de cod pentru a evita probleme de parsare
    sanitized = sanitized.replace(/```(\w+)?/g, '\n```$1\n');

    // Înlocuim supraînscrierea cu sintaxă simplă pentru a evita probleme de parsare
    sanitized = sanitized.replace(/(\w+)~(\w+)~/g, '$1_$2');
    sanitized = sanitized.replace(/(\w+)\^(\w+)\^/g, '$1^$2');

    return sanitized;
}

// Obținem conținutul fișierului Markdown
export async function getMdxContent(filePath) {
    const tutorialDir = path.join(process.cwd(), 'tutorial');

    // Eliminăm prefixul "/tutorial" din filePath pentru a evita dublarea
    const cleanPath = filePath.startsWith('/tutorial/')
        ? filePath.replace('/tutorial/', '/')
        : filePath;

    // Încercăm mai multe extensii posibile
    const possibleExtensions = ['.md', '.mdx'];
    let fullPath = null;

    for (const ext of possibleExtensions) {
        const testPath = path.join(tutorialDir, cleanPath + ext);
        if (fs.existsSync(testPath)) {
            fullPath = testPath;
            break;
        }
    }

    // Verificăm și pentru index.md în folder
    if (!fullPath) {
        for (const ext of possibleExtensions) {
            const testPath = path.join(tutorialDir, cleanPath, 'index' + ext);
            if (fs.existsSync(testPath)) {
                fullPath = testPath;
                break;
            }
        }
    }

    if (!fullPath) {
        throw new Error(`Nu s-a găsit fișierul MDX pentru calea: ${filePath}`);
    }

    try {
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Sanitizăm conținutul pentru a elimina potențiale probleme de parsare
        const sanitizedContent = sanitizeMarkdown(content);

        try {
            // Serializăm conținutul MDX cu pluginurile necesare
            const mdxSource = await serialize(sanitizedContent, {
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkMath],
                    rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }], rehypeKatex],
                    development: process.env.NODE_ENV === 'development'
                },
                scope: data
            });

            return {
                mdxSource,
                frontmatter: data
            };
        } catch (error) {
            console.error(`Eroare la serializarea MDX pentru ${fullPath}:`, error.message);
            // Adaugă un mesaj de eroare mai clar
            if (error.message.includes("Unexpected character")) {
                console.error("Verifică sintaxa MDX pentru caractere neașteptate, cum ar fi '!'.");
            }
            // Încercăm să serializăm un conținut simplu în caz de eroare
            const fallbackContent = `
# ${data.title || path.basename(fullPath).replace(/\.mdx?$/, '')}

${data.description || ''}

**Error:** A apărut o eroare la procesarea conținutului acestui tutorial. Echipa noastră lucrează la rezolvarea problemei.

${'```'}
${error.message}
${'```'}

**Conținut Brut:**

${'```markdown'}
${content.substring(0, 500)}... (truncat)
${'```'}
`;

            const fallbackMdx = await serialize(fallbackContent, {
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]],
                }
            });

            return {
                mdxSource: fallbackMdx,
                frontmatter: data,
                error: error.message
            };
        }
    } catch (error) {
        console.error(`Eroare la citirea sau parsarea fișierului ${fullPath}:`, error);
        throw error;
    }
} 