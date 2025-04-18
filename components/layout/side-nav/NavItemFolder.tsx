import { ListItemButton, ListItemText, IconButton, Box } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface NavItemFolderProps {
    name: string;
    level: number;
    isExpanded: boolean;
    toggle: () => void;
    children: React.ReactNode;
}

export default function NavItemFolder({ name, level, isExpanded, toggle, children }: NavItemFolderProps) {
    return (
        <>
            <ListItemButton onClick={toggle} sx={{ pl: 2 * level }}>
                <IconButton size="small">
                    {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
                <ListItemText primary={name} />
            </ListItemButton>
            {children}
        </>
    );
}
