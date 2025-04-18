import { Box, Button, TextField } from "@mui/material";

interface SearchFormProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    onSubmit: () => void;
}

export default function SearchForm({ searchTerm, setSearchTerm, onSubmit }: SearchFormProps) {
    return (
        <Box
            component="form"
            sx={{ display: 'flex', gap: 2, mb: 4 }}
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
        >
            <TextField
                fullWidth
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Căutare..."
                label="Caută"
            />
            <Button type="submit" variant="contained">
                Caută
            </Button>
        </Box>
    );
}
