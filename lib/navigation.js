import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import {parseFilename} from "../util/FileUtils";

// Path către directorul tutorial
const tutorialDir = path.join(process.cwd(), 'tutorial');

// Verifică dacă un director există
function directoryExists(dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
    } catch (error) {
        return false;
    }
}

// Scanează recursiv directorul pentru a găsi toate fișierele markdown
function scanDirectory(dir, basePath = '', baseUrlPath = '/tutorial') {
    // Verifică dacă directorul există
    if (!directoryExists(dir)) {
        console.warn(`Directorul ${dir} nu există`);
        return {};
    }

    // Citim toate fișierele din director
    let files;
    try {
        files = fs.readdirSync(dir);
    } catch (error) {
        console.error(`Eroare la citirea directorului ${dir}:`, error);
        return {};
    }

    // Grupăm fișierele și directoarele
    const directories = [];
    const markdownFiles = [];

    // Separăm directoarele de fișiere
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            directories.push(file);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            markdownFiles.push(file);
        }
    }

    // Sortăm pentru a avea directoarele înaintea fișierelor
    const allItems = [...directories, ...markdownFiles];
    const result = {};

    // Pentru fiecare item, adăugăm la rezultat
    for (const item of allItems) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stats = fs.statSync(fullPath);

        let displayName = parseFilename(item)

        if (stats.isDirectory()) {
            // Este un director, scanăm recursiv
            const subUrlPath = `${baseUrlPath}/${item}`;
            const subDirItems = scanDirectory(fullPath, relativePath, subUrlPath);

            // Adăugăm la rezultat doar dacă directorul nu este gol
            if (Object.keys(subDirItems).length > 0) {
                result[displayName] = subDirItems;
            }
        } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
            // Este un fișier markdown
            try {
                // Citim metadatele din frontmatter
                const fileContent = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContent);

                // Folosim titlul din frontmatter sau numele formatat
                const title = data.title || displayName;

                // Construim calea URL
                const slug = path.basename(item, path.extname(item));
                const urlPath = `${baseUrlPath}/${slug}`;

                // Adăugăm la rezultat
                result[title] = {
                    path: urlPath
                };
            } catch (error) {
                console.error(`Eroare la procesarea fișierului ${fullPath}:`, error);
            }
        }
    }

    return result;
}

// Funcția principală pentru obținerea datelor de navigare
export function getNavigation() {
    console.log('Scanare director tutorial:', tutorialDir);

    // Scanează directorul pentru a obține structura arborescentă
    const tree = scanDirectory(tutorialDir);

    // Construiește și o structură plată pentru referință ușoară
    const flat = {};

    // Funcție recursivă pentru a construi structura plată
    function flattenTree(node, basePath = '') {
        Object.entries(node).forEach(([key, value]) => {
            if (value.path) {
                // Este un fișier
                flat[value.path] = key;
            } else {
                // Este un director, procesăm recursiv
                flattenTree(value, `${basePath}/${key}`);
            }
        });
    }

    flattenTree(tree);

    console.log('Navigation structure in getStaticProps:', Object.keys(tree).length, Object.keys(flat).length);

    return { tree, flat };
} 