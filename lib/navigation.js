/**
 * This module provides functionality to scan a directory structure for Markdown files,
 * extract metadata from the frontmatter of each file, and generate a hierarchical and flat
 * navigation structure. This is typically used for a tutorial or documentation system.
 *
 * The module exports two main functions:
 * - `getNavigation`: Retrieves the full hierarchical tree and a flat lookup structure for navigation.
 * - `scanDirectory`: Recursively scans directories and Markdown files, extracting metadata and organizing the structure.
 *
 * **Main Functions:**
 * 1. `directoryExists`: Checks if a given directory exists.
 * 2. `scanDirectory`: Recursively scans a directory for `.md` and `.mdx` files, and constructs a structured navigation.
 * 3. `getNavigation`: Calls `scanDirectory` to get both a hierarchical tree structure and a flat URL lookup.
 *
 * **Utility Functions:**
 * - `parseFilename`: Parses and formats filenames into readable titles.
 * - `matter`: Extracts metadata (frontmatter) from a Markdown file using `gray-matter`.
 *
 * **Error Handling:**
 * - If the directory does not exist, a warning is logged.
 * - If any issues occur when reading a file, the error is logged without interrupting the flow.
 *
 * **Directory Structure:**
 * - Directories are scanned first, followed by Markdown files.
 * - The frontmatter of each file (such as title) is used to build the navigation structure.
 *
 * **How It Works:**
 * 1. The `scanDirectory` function is called to scan the provided `tutorialDir` for all `.md` and `.mdx` files and directories.
 * 2. It recursively builds a nested structure of directories and files.
 * 3. The metadata from each Markdown file is extracted and used to generate URLs for navigation.
 * 4. `getNavigation` flattens the hierarchical structure into a flat structure for easy URL lookup.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { parseFilename } from "../util/FileUtils";

// Path to the tutorial directory
const tutorialDir = path.join(process.cwd(), 'tutorial');

// Checks if a directory exists
function directoryExists(dirPath) {
    try {
        return fs.statSync(dirPath).isDirectory();
    } catch (error) {
        return false;
    }
}

// Recursively scans a directory to find all Markdown files
function scanDirectory(dir, basePath = '', baseUrlPath = '/tutorial') {
    // Check if the directory exists
    if (!directoryExists(dir)) {
        console.warn(`Directory ${dir} does not exist`);
        return {};
    }

    // Read all files in the directory
    let files;
    try {
        files = fs.readdirSync(dir);
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
        return {};
    }

    // Group files and directories
    const directories = [];
    const markdownFiles = [];

    // Separate directories from files
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            directories.push(file);
        } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
            markdownFiles.push(file);
        }
    }

    // Sort directories before files
    const allItems = [...directories, ...markdownFiles];
    const result = {};

    // Add each item to the result
    for (const item of allItems) {
        const fullPath = path.join(dir, item);
        const relativePath = path.join(basePath, item);
        const stats = fs.statSync(fullPath);

        let displayName = parseFilename(item)

        if (stats.isDirectory()) {
            // It's a directory, scan recursively
            const subUrlPath = `${baseUrlPath}/${item}`;
            const subDirItems = scanDirectory(fullPath, relativePath, subUrlPath);

            // Add to result only if the directory is not empty
            if (Object.keys(subDirItems).length > 0) {
                result[displayName] = subDirItems;
            }
        } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
            // It's a Markdown file
            try {
                // Read frontmatter metadata
                const fileContent = fs.readFileSync(fullPath, 'utf8');
                const { data } = matter(fileContent);

                // Use the title from the frontmatter or formatted filename
                const title = data.title || displayName;

                // Construct the URL path
                const slug = path.basename(item, path.extname(item));
                const urlPath = `${baseUrlPath}/${slug}`;

                // Add to result
                result[title] = {
                    path: urlPath
                };
            } catch (error) {
                console.error(`Error processing file ${fullPath}:`, error);
            }
        }
    }

    return result;
}

// Main function to get the navigation data
export function getNavigation() {
    console.log('Scanning tutorial directory:', tutorialDir);

    // Scan the directory to get the tree structure
    const tree = scanDirectory(tutorialDir);

    // Build and flatten the structure for easy reference
    const flat = {};

    // Recursive function to flatten the tree structure
    function flattenTree(node, basePath = '') {
        Object.entries(node).forEach(([key, value]) => {
            if (value.path) {
                // It's a file
                flat[value.path] = key;
            } else {
                // It's a directory, process recursively
                flattenTree(value, `${basePath}/${key}`);
            }
        });
    }

    flattenTree(tree);

    console.log('Navigation structure in getStaticProps:', Object.keys(tree).length, Object.keys(flat).length);

    return { tree, flat };
}
