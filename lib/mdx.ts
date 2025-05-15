import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * Recursively walks through a directory and yields file paths.
 * This is useful for finding all Markdown (MDX) files in a directory.
 *
 * @param dir - The directory path to walk through.
 * @returns A generator that yields file paths for each file found.
 */
export function* walkSync(dir: string) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            // Recursively walk into subdirectories
            yield* walkSync(path.join(dir, file.name));
        } else {
            // Yield the file path
            yield path.join(dir, file.name);
        }
    }
}

/**
 * Scans the '/tutorial' directory for all MDX/Markdown files
 * and generates the file paths formatted for Next.js dynamic routing.
 *
 * @returns A promise that resolves to an array of paths for all tutorial pages.
 */
export async function getMdxPaths() {
    const tutorialDir = path.join(process.cwd(), 'tutorial');
    const paths: string[] = [];

    // Walk through the 'tutorial' directory to find all MDX/Markdown files
    for (const filePath of walkSync(tutorialDir)) {
        if (filePath.endsWith('.md') || filePath.endsWith('.mdx')) {
            // Convert file path to the format used for Next.js routing
            const relativePath = path.relative(tutorialDir, filePath);
            const routePath = '/tutorial/' + relativePath.split(path.sep).join('/').replace(/\.mdx?$/, '');
            paths.push(routePath);
        }
    }

    return paths;
}

/**
 * Sanitizes the Markdown content to ensure proper parsing and rendering.
 * This function handles issues such as code block formatting and special character replacement.
 *
 * @param content - The raw Markdown content to sanitize.
 * @returns The sanitized Markdown content.
 */
function sanitizeMarkdown(content: string) {
    let sanitized = content;

    // Add newlines before and after fenced code blocks to avoid parsing issues
    sanitized = sanitized.replace(/```(\w+)?/g, '\n```$1\n');

    // Replace tilde (~) and caret (^) superscript/subscript notation to avoid conflicts
    sanitized = sanitized.replace(/(\w+)~(\w+)~/g, '$1_$2');
    sanitized = sanitized.replace(/(\w+)\^(\w+)\^/g, '$1^$2');

    return sanitized;
}

/**
 * Retrieves and processes the content of a specific MDX/Markdown file.
 * It sanitizes the content, serializes it using `next-mdx-remote`, and returns the serialized content
 * along with frontmatter metadata.
 *
 * @param filePath - The path to the MDX/Markdown file (relative to the '/tutorial' directory).
 * @returns A promise that resolves to an object containing the serialized MDX content and frontmatter.
 */
export async function getMdxContent(filePath: string) {
    const tutorialDir = path.join(process.cwd(), 'tutorial');

    // Clean the file path by removing the '/tutorial' prefix
    const cleanPath = filePath.startsWith('/tutorial/')
        ? filePath.replace('/tutorial/', '/')
        : filePath;

    const possibleExtensions = ['.md', '.mdx'];
    let fullPath: string|null = null;

    // Attempt to find the file with the correct extension
    for (const ext of possibleExtensions) {
        const testPath = path.join(tutorialDir, cleanPath + ext);
        if (fs.existsSync(testPath)) {
            fullPath = testPath;
            break;
        }
    }

    // If no exact match, check for 'index.md' or 'index.mdx' in the folder
    if (!fullPath) {
        for (const ext of possibleExtensions) {
            const testPath = path.join(tutorialDir, cleanPath, 'index' + ext);
            if (fs.existsSync(testPath)) {
                fullPath = testPath;
                break;
            }
        }
    }

    // Throw an error if no file was found
    if (!fullPath) {
        throw new Error(`No MDX file found for path: ${filePath}`);
    }

    try {
        // Read the file contents
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents); // Extract frontmatter and content

        // Sanitize the content to avoid parsing issues
        const sanitizedContent = sanitizeMarkdown(content);

        try {
            // Serialize the MDX content using the `next-mdx-remote` package
            const mdxSource = await serialize(sanitizedContent, {
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkMath], // Enable GitHub Flavored Markdown and Math support
                    rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }], rehypeKatex], // Enable syntax highlighting and KaTeX
                    development: process.env.NODE_ENV === 'development'
                },
                scope: data // Pass frontmatter as the scope for MDX content
            });

            return {
                mdxSource,
                frontmatter: data
            };
        } catch (error) {
            // If serialization fails, return a fallback response with error information
            console.error(`Error serializing MDX for ${fullPath}:`, error.message);

            // If it's an unexpected character error, provide additional guidance
            if (error.message.includes("Unexpected character")) {
                console.error("Check MDX syntax for unexpected characters like '!'.");
            }

            const fallbackContent = `
# ${data.title || path.basename(fullPath).replace(/\.mdx?$/, '')}

${data.description || ''}

**Error:** There was an issue processing this tutorial's content. Our team is working on a fix.

\`\`\`
${error.message}
\`\`\`

**Raw Content (truncated):**

\`\`\`markdown
${content.substring(0, 500)}... (truncated)
\`\`\`
`;

            const fallbackMdx = await serialize(fallbackContent, {
                mdxOptions: {
                    remarkPlugins: [remarkGfm], // Only use GFM for fallback content
                    rehypePlugins: [[rehypeHighlight, { ignoreMissing: true }]], // Enable syntax highlighting for fallback content
                }
            });

            return {
                mdxSource: fallbackMdx,
                frontmatter: data,
                error: error.message
            };
        }
    } catch (error) {
        console.error(`Error reading or parsing the file ${fullPath}:`, error);
        throw error;
    }
}
