import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import Layout from '../../components/layout/Layout';
import { getMdxContent, getMdxPaths } from '../../lib/mdx';
import { getNavigation } from '../../lib/navigation';
import CodeBlock from './CodeBlock';
import { Box, Link } from '@mui/material';

interface Frontmatter {
    title?: string;
    description?: string;
    [key: string]: any;
}

interface NavigationItem {
    title: string;
    path: string;
    children?: NavigationItem[];
}

interface Navigation {
    tree: Record<string, NavigationItem>;
}

interface TutorialPageProps {
    mdxSource: MDXRemoteSerializeResult | null;
    frontmatter: Frontmatter;
    slug: string[];
    navigation: Navigation;
}

const TutorialPage: React.FC<TutorialPageProps> = ({
                                                       mdxSource,
                                                       frontmatter,
                                                       slug,
                                                       navigation,
                                                   }) => {
    const fallbackTitle = slug[slug.length - 1]
        .replace(/[-_]/g, ' ')
        .replace(/^\w/, (c) => c.toUpperCase());

    const pageTitle = frontmatter.title || fallbackTitle;
    const pageDescription = frontmatter.description || `Tutorial despre ${pageTitle}`;

    const metadata = { title: pageTitle, description: pageDescription };

    const components = {
        pre: CodeBlock ,
        a: (props) => <Link {...props} />,
    };

    return (
        <Layout nav={navigation} metadata={metadata}>
            <Box className="tutorial-content">
                {mdxSource && <MDXRemote {...mdxSource} components={components} />}
            </Box>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getMdxPaths();

    const formattedPaths = paths.map((path) => {
        const cleanPath = path.replace(/^\/?tutorial\//, '');
        return { params: { slug: cleanPath.split('/') } };
    });

    return {
        paths: formattedPaths,
        fallback: 'blocking',
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const slug = (params?.slug as string[]) || [];
    const slugPath = `/tutorial/${slug.join('/')}`;

    try {
        const { mdxSource, frontmatter } = await getMdxContent(slugPath);
        const navigation = await getNavigation();

        return {
            props: {
                mdxSource,
                frontmatter,
                slug,
                navigation,
            },
            revalidate: 600,
        };
    } catch (error) {
        console.error('Error loading tutorial content:', error);
        const navigation = getNavigation();

        return {
            props: {
                mdxSource: null,
                frontmatter: {},
                slug,
                navigation,
            },
            revalidate: 600,
        };
    }
};

export default TutorialPage;
