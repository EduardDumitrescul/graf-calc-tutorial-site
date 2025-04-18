// A simple search form component that allows the user to input a search query and submit it.

import { Box, Button, TextField } from "@mui/material";

interface SearchFormProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onSubmit: () => void;
}

// The SearchForm component renders an input field for the search term and a submit button.
export default function SearchForm({ searchTerm, setSearchTerm, onSubmit }: SearchFormProps) {
    return (
        <Box
            component="form"
            sx={{ display: 'flex', gap: 2, mb: 4 }}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit(); // Trigger search when the form is submitted
            }}
        >
            <TextField
                fullWidth
                value={searchTerm} // Controlled input for search term
                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                placeholder="Căutare..."
                label="Caută"
            />
            <Button type="submit" variant="contained">
                Caută
            </Button>
        </Box>
    );
}
