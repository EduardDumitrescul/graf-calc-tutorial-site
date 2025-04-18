/**
 * A navigation component that displays a collapsible list of tutorial sections.
 * The list dynamically updates based on the current route and expanded folder state.
 */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import NavList from './NavList';

type NavItem = {
    path?: string;
    [key: string]: NavItem | string | undefined;
};

interface NavigationProps {
    nav: {
        tree: Record<string, NavItem>;
    };
}

const Navigation: React.FC<NavigationProps> = ({ nav }) => {
    const router = useRouter();
    const navTree = nav?.tree || {};
    const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const pathParts = router.asPath.replaceAll('%20', ' ').split('/').filter(Boolean);
        const expanded: Record<string, boolean> = {};

        if (pathParts[0] === 'tutorial') {
            pathParts.slice(1).forEach((_, index) => {
                const path = pathParts.slice(1, index + 2).join('/');
                expanded[path] = true;
            });
        }

        setExpandedFolders(expanded);
    }, [router.asPath]);

    const toggleFolder = (path: string) => {
        setExpandedFolders(prev => ({
            ...prev,
            [path]: !prev[path],
        }));
    };

    return (
        <nav style={{ flexShrink: 0, width: '100%' }}>
            <Typography variant="h6">Secțiuni Tutorial</Typography>
            {Object.keys(navTree).length === 0 ? (
                <Typography variant="body1">Nu există secțiuni disponibile.</Typography>
            ) : (
                <NavList
                    items={navTree}
                    level={0}
                    parentPath=""
                    expandedFolders={expandedFolders}
                    toggleFolder={toggleFolder}
                />
            )}
        </nav>
    );
};

export default Navigation;
