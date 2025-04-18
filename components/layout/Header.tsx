import {alpha, Box, Container, IconButton, Link, Tooltip, Typography, useTheme} from '@mui/material';

import NavButtons from './NavButtons';
import SearchBar from './SearchBar';
import React from "react";
import { ThemeToggleButton } from './ThemeToggleButton';
import NextLink from 'next/link';

export default function Header({ pathname, searchTerm, setSearchTerm, handleSearch }) {
    const theme = useTheme()
    const logoStyle = () => ({
        color: theme.palette.mode === 'dark'
            ? theme.palette.common.white
            : theme.palette.common.black,
    });

    return (
        <Box
            component="header"
            sx={(theme) => ({
                boxShadow: `0 2px 2px ${alpha(theme.palette.text.primary, 0.1)}`,
                py: 2,
            })}
        >
            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ width: 280 }}>
                    <Link href="/"  component={NextLink} passHref sx={{ textDecoration: 'none'}}>
                        <Typography variant="h5" sx={ logoStyle() }>
                            Grafică pe Calculator
                        </Typography>
                    </Link>
                </Box>

                <NavButtons pathname={pathname} />

                <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: 1 }}>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                    />
                    <ThemeToggleButton />
                </Box>
            </Container>
        </Box>
    );
}


