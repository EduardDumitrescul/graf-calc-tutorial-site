import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from "@mui/material";
import Layout from '../../components/layout/Layout';
import { getNavigation } from '../../lib/navigation';
import SearchResults, { SearchResult } from './SearchResults';
import SearchForm from "./SearchForm";
export default function SearchPage({ navigation, initialResults = [], initialQuery = '' }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState<string>(initialQuery);
    const [results, setResults] = useState<SearchResult[]>(initialResults);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (router.query.q) {
            const query = router.query.q as string;
            setSearchTerm(query);
            performSearch(query);
        }
    }, [router.query.q]);

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
