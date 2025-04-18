import React from 'react';
import { Box, Typography, List, Divider } from '@mui/material';
import TutorialLink from './TutorialLink';

export interface TutorialItem {
    path: string;
    title: string;
}

interface CategorySectionProps {
    category: string;
    items: TutorialItem[];
}

const formatCategoryName = (category: string): string =>
    category
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

const CategorySection: React.FC<CategorySectionProps> = ({ category, items }) => (
    <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" fontWeight={600}>
                {formatCategoryName(category)}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
                {items.length} tutorial{items.length !== 1 && 'e'}
            </Typography>
        </Box>

        <List disablePadding>
            {items.map((item, index) => (
                <React.Fragment key={item.path}>
                    <TutorialLink {...item} />
                              {index < items.length - 1 && <Divider sx={{ ml: 2 }} />}
                </React.Fragment>
            ))}
        </List>
    </Box>
);

export default CategorySection;
