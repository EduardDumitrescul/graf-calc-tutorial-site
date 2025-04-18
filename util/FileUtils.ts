export function parseFilename(filename: string): string {
    return filename
        .replace(/[-_]/g, ' ')
        .replace(/\.md$|\.mdx$/i, '')
        .replace(/\b\w/g, char => char.toUpperCase());
}

