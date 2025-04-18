/**
 * A toggle button that switches between light and dark themes.
 * Syncs the selected theme with DOM attributes for styling compatibility.
 */

import { IconButton, Tooltip } from "@mui/material";
import React, { useEffect } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../ThemeContext";

export const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    useEffect(() => {
        if (theme === "dark") {
            document.body.setAttribute('data-theme', 'dark');
            document.documentElement.setAttribute('data-theme', 'dark');
            document.body.classList.add('dark-theme'); // pentru compatibilitate
        } else {
            document.body.setAttribute('data-theme', 'light');
            document.documentElement.setAttribute('data-theme', 'light');
            document.body.classList.remove('dark-theme');
        }
    }, [theme]);

    return (
        <Tooltip title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}>
            <IconButton onClick={toggleTheme} color="inherit">
                {theme === 'light' ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
        </Tooltip>
    );
};
