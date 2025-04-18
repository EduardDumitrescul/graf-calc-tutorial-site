import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme, PaletteMode } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
    theme: PaletteMode;
    toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
    theme: 'light',
    toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useTheme = () => {
    return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState<PaletteMode>('light');
    const [isThemeLoaded, setIsThemeLoaded] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as PaletteMode;
        if (savedTheme) {
            setTheme(savedTheme);
        }
        setIsThemeLoaded(true);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    if (!isThemeLoaded) return null;

    const muiTheme = createTheme({
        palette: {
            mode: theme,
            ...(theme === 'light'
                ? {
                    background: {
                        default: '#f6f6f6',
                        paper: '#ffffff',
                    },
                    text: {
                        primary: '#1f1f1f',
                        secondary: '#555555',
                    },
                }
                : {
                    background: {
                        default: '#181a1f',
                        paper: '#1f2229',
                    },
                    text: {
                        primary: '#e0e0e0',
                        secondary: '#a0a0a0',
                    },
                }),
        },
        typography: {
            fontFamily: '"Roboto", "monospace", sans-serif',
            fontSize: 14,
        },
    });

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <MUIThemeProvider theme={muiTheme}>
                <CssBaseline />
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};
