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
    results: SearchResult[];
    loading: boolean;
    error: string | null;
    searchTerm: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({
                                                         results,
                                                         loading,
                                                         error,
                                                         searchTerm,
                                                     }) => {
    if (loading) {
        return (
            <Box display="flex" justifyContent="center" my={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box my={4}>
                <Alert severity="error">{error}</Alert>
            </Box>
        );
    }

    if (results.length === 0) {
        return (
            <Box my={4}>
                <Typography variant="body1" color="text.secondary">
                    Nu s-au găsit rezultate pentru "<strong>{searchTerm}</strong>"
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Typography variant="subtitle1" gutterBottom>
                Au fost găsite: {results.length} tutorial{results.length > 1 ? 'e' : ''}
            </Typography>

            <Grid container spacing={4}>
                {results.map((result, index) => (
                    <Grid key={index} sx={{width: '100%'}}>
                        <ResultCard state={new ResultCardState(result, searchTerm)} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default SearchResults;
