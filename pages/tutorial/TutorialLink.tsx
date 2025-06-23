import React from 'react';
import { ListItem, Link as MuiLink, Box, Typography } from '@mui/material';
import NextLink from 'next/link';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface TutorialLinkProps {
    path: string;
    title: string;
}

const TutorialLink: React.FC<TutorialLinkProps> = ({ path, title }) => (
    <ListItem disablePadding sx={{ mb: 1 }}>
        <MuiLink
            component={NextLink}
            href={path}
            underline="none"
            color="inherit"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                px: 2,
                py: 1.5,
                borderRadius: 2,
                transition: 'background-color 0.2s ease, transform 0.15s ease',
                '&:hover': {
                    backgroundColor: 'action.hover',
                    transform: 'translateX(2px)',
                },
            }}
        >
            <Typography variant="body1" fontWeight={500}>
                {title.substring(2)}
            </Typography>
            <ArrowForwardIosIcon sx={{ fontSize: 16, opacity: 0.6 }} />
        </MuiLink>
    </ListItem>
);

export default TutorialLink;
