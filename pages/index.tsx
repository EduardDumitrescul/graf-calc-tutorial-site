/*
  The `Home` component renders the homepage for the website, featuring a brief introduction and a summary of available materials for the "Grafică pe Calculator" course.

  It fetches navigation data statically and displays basic details about the course and professor.

  Key parts:
    - **`getStaticProps`**: Fetches the navigation data needed for the page.
    - **`Home` Component**: Displays the course title, professor's name, and description with a call-to-action.
*/

import React from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import {
    Box,
    Button,
    Container,
    Stack,
    Typography,
} from '@mui/material';
import { getNavigation } from '../lib/navigation';
import Layout from '../components/layout/Layout';

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const navFlat = navigation?.flat ?? {};

    return (
        <Layout
            nav={navigation}
            metadata={{
                title: 'Grafică pe Calculator',
                description: 'Materiale pentru curs și laborator',
            }}
        >
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" fontWeight={700} gutterBottom>
                        Grafică pe Calculator – materiale suport
                    </Typography>

                    <Stack spacing={4} maxWidth="md" mx="auto">
                        <Typography variant="h6" color="text.secondary">
                            <strong> Prof. dr. habil. Stupariu Mihai-Sorin </strong>
                        </Typography>

                        <Typography variant="h6" color="text.secondary">
                            Pe acest site se găsesc materiale utile pentru curs, documentații pentru codurile din cadrul laboratorului și alte materiale folositoare pentru materia Grafică pe Calculator.
                        </Typography>
                    </Stack>
                </Box>
            </Container>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const navigation = getNavigation();

    return {
        props: { navigation },
        revalidate: 600, // Revalidate every 10 minutes
    };
};

export default Home;
