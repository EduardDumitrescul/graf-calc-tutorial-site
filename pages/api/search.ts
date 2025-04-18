// This file handles the search functionality for the tutorial content
// It builds an index for all markdown files in the tutorial directory
// and provides an API route to search through the content and return relevant snippets.

// Importing necessary libraries and utilities
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { parseFilename } from "../../util/FileUtils";

// Defining the directory that contains tutorial files
const tutorialDir = path.join(process.cwd(), 'tutorial');

// Declaring the search index and content cache
const searchIndex: Record<string, string[]> = {}; // Index to store words and associated file paths
const contentCache: Record<string, { content: string; title: string }> = {}; // Cache to store the content of each file

// Function to build a search index from markdown files in the tutorial directory
function buildSearchIndex() {
    try {
        if (!fs.existsSync(tutorialDir)) {
            return;
        }

        // Recursive function to index the content of markdown files
        function indexDirectory(dir, basePath = '') {
            const files = fs.readdirSync(dir);

            for (const file of files) {
                const filePath = path.join(dir, file);
                const stat = fs.statSync(filePath);

                if (stat.isDirectory()) {
                    indexDirectory(filePath, path.join(basePath, file));
                } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
                    try {
                        const content = fs.readFileSync(filePath, 'utf8');
                        const { data, content: markdownContent } = matter(content);
                        const plainText = markdownContent.toLowerCase();

                        const urlPath = `/${path.join(basePath, file.replace(/\.mdx?$/, ''))}`
                            .replace(/\\/g, '/')
                            .replace(/\/+/g, '/');

                        contentCache[urlPath] = {
                            content: plainText,
                            title: parseFilename(file)
                        };

                        plainText.split(/\s+/).forEach(word => {
                            if (word.length > 2) {
                                if (!Array.isArray(searchIndex[word])) {
                                    searchIndex[word] = [];
                                }

                                if (!searchIndex[word].includes(urlPath)) {
                                    searchIndex[word].push(urlPath);
                                }
                            }
                        });
                    } catch (error) {
                        console.error(`Error indexing file ${filePath}:`, error);
                    }
                }
            }
        }

        // Start indexing from the tutorial directory
        indexDirectory(tutorialDir, 'tutorial');
    } catch (error) {
        console.error('Error building search index:', error);
    }
}

// Function to extract relevant snippets from content based on search terms
function extractRelevantSnippets(content: string, searchTerms: string[], maxSnippets = 3, snippetLength = 150) {
    const contentLower = content.toLowerCase();
    const matches = [];
    let lastIndex = 0;
    let count = 0;

    // Search through the content for each search term
    searchTerms.forEach(term => {
        let termIndex = 0;

        while (termIndex !== -1 && count < maxSnippets) {
            termIndex = contentLower.indexOf(term, termIndex + 1);

            if (termIndex !== -1) {
                const start = Math.max(0, termIndex - snippetLength / 2);
                const end = Math.min(content.length, termIndex + term.length + snippetLength / 2);

                let snippet = content.substring(start, end);

                if (start > 0) snippet = '...' + snippet;
                if (end < content.length) snippet = snippet + '...';

                const overlapWithPrevious = matches.some(existing => {
                    return (start >= existing.start && start <= existing.end) ||
                        (end >= existing.start && end <= existing.end);
                });

                if (!overlapWithPrevious) {
                    matches.push({
                        snippet,
                        start,
                        end,
                        relevance: contentLower.substring(start, end).split(term).length - 1
                    });
                    count++;
                }

                termIndex += term.length;
            }
        }
    });

    // Sort the snippets based on relevance
    matches.sort((a, b) => b.relevance - a.relevance);
    return matches.map(match => match.snippet);
}

// API handler for search queries
export default function handler(req, res) {
    try {
        const { q } = req.query;

        if (!q) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        if (Object.keys(searchIndex).length === 0) {
            buildSearchIndex();
        }

        // Split search query into individual terms and filter short words
        const searchTerms = q.toLowerCase().split(/\s+/).filter(term => term.length > 2);

        if (searchTerms.length === 0) {
            return res.status(400).json({ error: 'Search query must contain words with at least 3 characters' });
        }

        const documentFrequency: Record<string, number> = {};

        // Calculate document frequency for each search term
        searchTerms.forEach(term => {
            const matchingDocs = Object.keys(searchIndex).filter(indexTerm =>
                indexTerm.includes(term)
            ).flatMap(indexTerm => searchIndex[indexTerm]);

            matchingDocs.forEach(doc => {
                documentFrequency[doc] = (documentFrequency[doc] || 0) + 1;
            });
        });

        // Sort documents based on their relevance
        const sortedDocs = Object.keys(documentFrequency)
            .sort((a, b) => documentFrequency[b] - documentFrequency[a]);

        const results = sortedDocs.map(doc => {
            const { content, title } = contentCache[doc];
            const snippets = extractRelevantSnippets(content, searchTerms);

            // Convert the snippets into HTML using marked
            const formattedSnippets = snippets.map(snippet =>
                marked(snippet, { breaks: true })
            );

            return {
                url: doc,
                title: title,
                snippets: formattedSnippets
            };
        });

        res.status(200).json(results);
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ error: 'An error occurred while searching' });
    }
}
