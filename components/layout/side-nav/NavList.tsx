/**
 * A recursive list component for rendering nested navigation items.
 * It supports collapsible folders and renders navigation links or nested lists based on the item structure.
 */

import { List, Collapse } from '@mui/material';
import NavItemLink from './NavItemLink';
import NavItemFolder from './NavItemFolder';

type NavItem = {
    path?: string;
    [key: string]: NavItem | string | undefined;
};

interface NavListProps {
    items: Record<string, NavItem>;
    parentPath: string;
    level: number;
    expandedFolders: Record<string, boolean>;
    toggleFolder: (path: string) => void;
}

export default function NavList({ items, parentPath, level, expandedFolders, toggleFolder }: NavListProps) {
    return (
        <List disablePadding>
            {Object.entries(items).map(([name, value]) => {
                const currentPath = parentPath ? `${parentPath}/${name}` : name;

                if (typeof value === 'object' && value.path) {
                    return (
                        <NavItemLink key={value.path} name={name} path={value.path} level={level} />
                    );
                }

                if (typeof value === 'object') {
                    const isExpanded = expandedFolders[currentPath] || false;

                    return (
                        <NavItemFolder
                            key={currentPath}
                            name={name}
                            level={level}
                            isExpanded={isExpanded}
                            toggle={() => toggleFolder(currentPath)}
                        >
                            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                                <NavList
                                    items={value as Record<string, NavItem>}
                                    parentPath={currentPath}
                                    level={level + 1}
                                    expandedFolders={expandedFolders}
                                    toggleFolder={toggleFolder}
                                />
                            </Collapse>
                        </NavItemFolder>
                    );
                }

                return null;
            })}
        </List>
    );
}
