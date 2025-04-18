/**
 * A navigation link item that highlights the active link based on the current route.
 * It navigates to the specified path when clicked.
 */

import { ListItemButton, ListItemText } from '@mui/material';
import { useRouter } from 'next/router';

interface NavItemLinkProps {
    name: string;
    path: string;
    level: number;
}

export default function NavItemLink({ name, path, level }: NavItemLinkProps) {
    const router = useRouter();
    const isActive = router.asPath.replaceAll('%20', ' ') === path;

    const handleNavigation = () => {
        router.push(path);
    };

    return (
        <ListItemButton
            selected={isActive}
            onClick={handleNavigation}
            sx={{ pl: 2 * level + 4 }}
        >
            <ListItemText primary={name} sx={{ fontWeight: isActive ? 'bold' : 'normal' }} />
        </ListItemButton>
    );
}
