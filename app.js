/**
 * Express server for serving tutorial pages and search functionality.
 *
 * - Indexes local markdown files using Lunr for full-text search.
 * - Parses directory structure to dynamically build routes.
 * - Exposes endpoints for homepage, tutorials, materials, and search.
 */

'use strict';
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const lunr = require('lunr');

const PORT = process.env.PORT || 3000;

// Recursively walks a directory and yields all file paths
function* walkSync(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) {
        if (file.isDirectory()) {
            yield* walkSync(path.join(dir, file.name));
        } else {
            yield path.join(dir, file.name);
        }
    }
}

// Converts absolute tutorial file paths into relative URL paths
function getFileStructure(dirpath) {
    let structure = []
    for (const x of walkSync(dirpath)) {
        let cale = path.relative(__dirname, x).split(path.sep).join('/')
        structure.push(cale.replace('tutorial', '/tutorial'));
    }
    return structure;
}

// Load tutorial file structure
const fileStructure = getFileStructure(__dirname + '/tutorial');

// TODO: This function is referenced but not defined in this file
let routes = getRoutes(fileStructure);

let data = [];

// Builds the Lunr search index and stores line-level metadata
function createIndex() {
    return lunr(function () {
        this.pipeline.remove(lunr.stemmer)
        this.ref('ind');
        this.field('content');
        let ind = 0;

        fileStructure.forEach(file => {
            if (file.endsWith('.md')) {
                const markdown = fs.readFileSync(__dirname + file, 'utf8');
                const title = path.basename(file, '.md');

                let lines = markdown.split('\n').filter(line => line.trim() !== '');
                lines = lines.map(line => line.trim());

                for (let line = 0; line < lines.length; line++) {
                    // Capture a small snippet around the line for context
                    let context = "";
                    if (line === 0 || line === lines.length - 1) {
                        context = (line === 0 ? " ... " : lines[line - 1] + " \n ") + lines[line] + (line === lines.length - 1 ? "" : " \n " + lines[line + 1] + " ... ");
                    } else {
                        context = lines.slice(line - 1, line + 2).join(" \n ") + " ... ";
                    }

                    this.add({ ind: ind, content: lines[line] });
                    data.push({ id: ind, url: file.replace(".md", ""), title: title, line: lines[line], context: context });
                    ind++;
                }
            }
        });
    });
}

const index = createIndex();

// Routes
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Search API — returns rendered markdown snippets around matches
app.get('/search', (req, res) => {
    const query = req.query.searchKeyword || '';
    const results = index.search(query);

    const searchResults = results.reduce((acc, result) => {
        const info = data.find(item => item.id === parseInt(result.ref));
        const existingItemIndex = acc.findIndex(item => item.title === info.title);

        if (existingItemIndex === -1) {
            acc.push({ title: info.title, url: info.url, context: [marked.marked(info.context.replaceAll("#", ""))] });
        } else {
            acc[existingItemIndex].context.push(marked.marked(info.context.replaceAll("#", "")));
        }

        return acc;
    }, []);

    res.render('search', { title: 'Search Results', term: query, results: searchResults });
});

app.get('/tutorial', (req, res) => {
    res.render('tutorial', { title: 'Tutorial' });
});

app.get('/materials', (req, res) => {
    res.render('materials', { title: 'Materials' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server adresa http://localhost:${PORT}`);
});

module.exports = app;
