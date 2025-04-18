// pages/tutorial/index.tsx

import { GetStaticProps } from 'next';
import Layout from '../../components/layout/Layout';
import { getNavigation } from '../../lib/navigation';
import { Container, Typography } from '@mui/material';
import CategorySection, {TutorialItem} from "./CategorySection";

interface NavigationFlat {
    [path: string]: string;
}

interface TutorialIndexProps {
    navigation: {
        flat: NavigationFlat;
        tree: Record<string, any>;
    };
}

const TutorialIndex: React.FC<TutorialIndexProps> = ({ navigation }) => {
    const navFlat = navigation.flat || {};
    const grouped = groupByCategory(navFlat);

    return (
        <Layout
            nav={navigation}
            metadata={undefined}
        >
            <Container sx={{ py: 4 }}>
                <Typography variant="h3" gutterBottom>
                    Toate Tutorialele
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Tutorialele grupate in funcție de categorie / laborator.
                </Typography>

                {Object.entries(grouped).map(([category, items]) => (
                    <CategorySection key={category} category={category} items={items} />
                ))}
            </Container>
        </Layout>
    );
};

// @ts-ignore
export const getStaticProps: GetStaticProps<TutorialIndexProps> = async () => {
    const navigation = getNavigation();

    return {
        props: { navigation },
        revalidate: 600,
    };
};

function groupByCategory(navigationFlat: NavigationFlat): Record<string, TutorialItem[]> {
    const categories: Record<string, TutorialItem[]> = {};

    Object.entries(navigationFlat).forEach(([path, title]) => {
        const pathParts = path.split('/').filter(Boolean);
        if (pathParts.length >= 2 && pathParts[0] === 'tutorial') {
            const category = pathParts[1];
            categories[category] = categories[category] || [];
            categories[category].push({ path, title });
        }
    });

    Object.keys(categories).forEach((category) =>
        categories[category].sort((a, b) => a.title.localeCompare(b.title))
    );

    return categories;
}

export default TutorialIndex;
