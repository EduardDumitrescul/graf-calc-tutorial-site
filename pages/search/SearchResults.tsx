// The SearchResults component displays the results of a search query, showing loading, error, or result states.

import React from 'react';
import {
    Alert,
    Box,
    CircularProgress,
    Grid,
    Typography,
} from '@mui/material';
import ResultCard, { ResultCardState } from './ResultCard';

export interface SearchResult {
    title: string;
    url: string;
    snippets: string[];
}

interface SearchResultsProps {
    results: SearchResult[]; // Search results to display
    loading: boolean; // Flag indicating loading state
    error: string | null; // Error message, if any
    searchTerm: string; // The search term used for the query
}

const SearchResults: React.FC<SearchResultsProps> = ({
                                                         results,
                                                         loading,
                                                         error,
                                                         searchTerm,
                                                     }) => {
    // Show loading spinner while data is being fetched
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
            </Box>
        );
    }

    // Show error alert if an error occurs during the search
    if (error) {
        return (
            <Box my={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    // Show message when no results are found
    if (results.length === 0) {
        return (
            <Box my={4}>
                <Typography variant="body1" color="text.secondary">
                    Nu s-au găsit rezultate pentru "<strong>{searchTerm}</strong>"
                </Typography>
            </Box>
        );
    }

    // Display results in grid layout if there are results
    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
                Au fost găsite: {results.length} tutorial{results.length > 1 ? 'e' : ''}
            </Typography>

            <Grid container spacing={4}>
                {results.map((result, index) => (
                    <Grid key={index} sx={{ width: '100%' }}>
                        <ResultCard state={new ResultCardState(result, searchTerm)} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchResults;
