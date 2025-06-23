/**
 * Cleans up and formats a markdown filename for display.
 * - Replaces dashes/underscores with spaces
 * - Removes `.md` or `.mdx` extension
 * - Capitalizes first letter of each word
 */
export function parseFilename(filename: string): string {
    return filename
        .replace(/[_]/g, ' ')
        .replace(/\.md$|\.mdx$/i, '')
        .replace(/\b\w/g, char => char.toUpperCase());
}
