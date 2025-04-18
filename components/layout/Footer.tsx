/**
 * A footer component displaying copyright and credits information.
 */

import { alpha, Box, Container, Typography, Link } from '@mui/material';

export default function Footer() {
    return (
        <Box component="footer" sx={{ py: 2 }}>
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant="body2">
                    &copy; {new Date().getFullYear()} Tutorial Site. All rights reserved .
                </Typography>
                <Typography variant="body2">
                    Site realizat de Alexandra Lung și{' '}
                    <Link
                        href="https://www.linkedin.com/in/eduard-dumitrescul-177b9b253/"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                    >
                        Eduard-Valentin Dumitrescul
                    </Link>.
                </Typography>
            </Container>
        </Box>
    );
}
