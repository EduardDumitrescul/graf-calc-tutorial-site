// This page handles search functionality, including rendering the search form and displaying search results.
// It uses Next.js's `getServerSideProps` for fetching search results on the server-side based on the query parameter.

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from "@mui/material";
import Layout from '../../components/layout/Layout';
import { getNavigation } from '../../lib/navigation';
import SearchResults, { SearchResult } from './SearchResults';
import SearchForm from "./SearchForm";

export default function SearchPage({ navigation, initialResults = [], initialQuery = '' }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(initialQuery); // Track search term input
    const [results, setResults] = useState<SearchResult[]>(initialResults); // Store search results
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState<string | null>(null); // Track error state

    // Trigger search when query parameter changes
    useEffect(() => {
        if (router.query.q) {
            const query = router.query.q as string;
            setSearchTerm(query);
            performSearch(query);
        }
    }, [router.query.q]);

    // Perform search by querying the API
    const performSearch = async (query: string) => {
        if (!query) return;

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            if (!response.ok) throw new Error('Search request failed');
            const data = await response.json();
            setResults(data);
        } catch {
            setError('An error occurred while searching. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout
            nav={navigation}
            metadata={undefined}
        >
            <Box sx={{ px: 3, py: 4, width: '100%' }}>
                <Typography variant="h4" gutterBottom>Rezultatele Căutării</Typography>

                <SearchForm
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSubmit={() => router.push(`/search?q=${encodeURIComponent(searchTerm)}`)}
                />

                <SearchResults
                    results={results}
                    loading={loading}
                    error={error}
                    searchTerm={searchTerm}
                />
            </Box>
        </Layout>
    );
}

// Fetch initial search results on the server side, if a query exists
export async function getServerSideProps({ query }) {
    const q = query.q || '';
    let initialResults = [];

    const navigation = getNavigation();

    if (q) {
        try {
            const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
            const host = process.env.VERCEL_URL || 'localhost:3000';
            const apiUrl = `${protocol}://${host}/api/search?q=${encodeURIComponent(q)}`;
            const response = await fetch(apiUrl);
            if (response.ok) initialResults = await response.json();
        } catch {
            console.error('Error fetching search results on server');
        }
    }

    return { props: { navigation, initialResults, initialQuery: q } };
}
