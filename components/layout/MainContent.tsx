/**
 * Main layout component that includes a sidebar navigation and a content area.
 * Accepts navigation data and child components to display.
 */

import { Box, Container } from '@mui/material';
import Navigation from './side-nav/Navigation';

export default function MainContent({ nav, children }) {
    return (
        <Box sx={{ flexGrow: 1, mt: 3 }}>
            <Container sx={{ display: 'flex', maxWidth: '100%' }}>
                <Box sx={{ width: 240, flexShrink: 0 }}>
                    <Navigation nav={nav} />
                </Box>
                <Box sx={{ flexGrow: 1, ml: 3, maxWidth: 'calc(100% - 250px)', pr: 3 }}>
                    {children}
                </Box>
            </Container>
        </Box>
    );
}
