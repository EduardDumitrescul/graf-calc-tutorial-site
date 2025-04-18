// This page displays a list of resources related to learning OpenGL, wrapped within a Layout component.
// It fetches the navigation structure through `getStaticProps` to include in the page layout.

import Layout from '../../components/layout/Layout';
import { getNavigation } from '../../lib/navigation';
import { Box, Container, Typography, Paper, Link as MuiLink } from '@mui/material';

export default function Materials({ navigation }) {
    // List of external resources related to OpenGL
    const resources = [
        {
            title: 'Documentație Oficială',
            description: 'Khronos - OpenGL Documentation',
            link: 'https://www.opengl.org/documentation/',
        },
        {
            title: 'Learn OpenGL',
            description: 'Learn OpenGL - Modern OpenGL Tutorials',
            link: 'https://learnopengl.com/',
        },
        {
            title: 'Alte Tutoriale OpenGL',
            description: 'OpenGL Tutorial',
            link: 'https://www.opengl-tutorial.org/',
        },
    ];

    return (
        <Layout nav={navigation} metadata={undefined}>
            <Container maxWidth="md" sx={{ py: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Materiale
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Materiale și resurse pentru a învăța OpenGL.
                </Typography>

                <Box display="flex" flexDirection="column" gap={3}>
                    {resources.map((res, idx) => (
                        <Paper key={idx} elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                {res.title}
                            </Typography>
                            <Typography variant="body2">
                                <MuiLink
                                    href={res.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    underline="hover"
                                    color="primary"
                                >
                                    {res.description}
                                </MuiLink>
                            </Typography>
                        </Paper>
                    ))}
                </Box>
            </Container>
        </Layout>
    );
}

// Fetch navigation data for the layout on the server-side at build time
export async function getStaticProps() {
    const navigation = getNavigation();
    return { props: { navigation } };
}
