/**
 * Provides theme context and theme switching functionality to the app.
 * It maintains the current theme (light or dark) and allows toggling between them.
 * The theme preference is stored in localStorage and persists across sessions.
 */

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import {
    ThemeProvider as MUIThemeProvider,
    createTheme,
    PaletteMode,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

declare module '@mui/material/styles' {
    interface Palette {
        custom: {
            shader: { bg: string; border: string };
            cpp: { bg: string; border: string };
            default: { bg: string; border: string };
        };
    }

    interface PaletteOptions {
        custom?: {
            shader?: { bg: string; border: string };
            cpp?: { bg: string; border: string };
            default?: { bg: string; border: string };
        };
    }
}

interface ThemeContextType {
    theme: PaletteMode;
    toggleTheme: () => void;
}

const defaultContextValue: ThemeContextType = {
    theme: 'light',
    toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultContextValue);

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
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
                    custom: {
                        shader: {
                            bg: 'rgba(230, 245, 255, 0.6)',
                            border: 'rgba(100, 180, 255, 0.5)',
                        },
                        cpp: {
                            bg: 'rgba(240, 255, 240, 0.6)',
                            border: 'rgba(80, 200, 120, 0.5)',
                        },
                        default: {
                            bg: 'rgba(250, 250, 250, 0.6)',
                            border: 'rgba(0, 0, 0, 0.1)',
                        },
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
                    custom: {
                        shader: {
                            bg: 'rgba(15, 26, 44, 0.7)',
                            border: 'rgba(0, 100, 200, 0.4)',
                        },
                        cpp: {
                            bg: 'rgba(30, 30, 30, 0.7)',
                            border: 'rgba(100, 120, 150, 0.4)',
                        },
                        default: {
                            bg: 'rgba(40, 40, 40, 0.5)',
                            border: 'rgba(255, 255, 255, 0.1)',
                        },
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
