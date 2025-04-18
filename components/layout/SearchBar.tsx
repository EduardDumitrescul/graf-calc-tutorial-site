import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar({ searchTerm, setSearchTerm, handleSearch }) {
    return (
        <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Căutare..."
                sx={{ mr: 1 }}
            />
            <IconButton type="submit" sx={{ width: 40, height: 40, borderRadius: 1 }}>
                <SearchIcon />
            </IconButton>
        </Box>
    );
}
