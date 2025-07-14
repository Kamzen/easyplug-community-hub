
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  Menu,
  MenuList,
  Paper,
  Typography,
  Divider
} from '@mui/material';
import { Search, ExpandMore } from '@mui/icons-material';

const categories = [
  {
    name: 'Electronics',
    subcategories: ['Smartphones', 'Laptops', 'Tablets', 'Gaming', 'Audio']
  },
  {
    name: 'Vehicles',
    subcategories: ['Cars', 'Motorcycles', 'Trucks', 'Parts', 'Accessories']
  },
  {
    name: 'Property',
    subcategories: ['Houses', 'Apartments', 'Land', 'Commercial', 'Rentals']
  },
  {
    name: 'Services',
    subcategories: ['Cleaning', 'Tutoring', 'Photography', 'Repair', 'Consulting']
  },
  {
    name: 'Food',
    subcategories: ['Fresh Produce', 'Bakery', 'Beverages', 'Snacks', 'Organic']
  }
];

export const SearchWithCategories = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 600 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for items..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  px: 1,
                  py: 0.5,
                  borderLeft: '1px solid #ddd',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.04)' }
                }}
                onClick={handleCategoryClick}
              >
                <Typography variant="body2" sx={{ mr: 0.5 }}>
                  {selectedCategory}
                </Typography>
                <ExpandMore fontSize="small" />
              </Box>
            </InputAdornment>
          ),
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 250, maxHeight: 400 }
        }}
      >
        <MenuItem onClick={() => { setSelectedCategory('All Categories'); handleClose(); }}>
          <Typography>All Categories</Typography>
        </MenuItem>
        <Divider />
        {categories.map((category) => (
          <MenuItem
            key={category.name}
            onMouseEnter={() => setHoveredCategory(category.name)}
            onMouseLeave={() => setHoveredCategory(null)}
            onClick={() => { setSelectedCategory(category.name); handleClose(); }}
            sx={{ position: 'relative' }}
          >
            <Typography>{category.name}</Typography>
            {hoveredCategory === category.name && (
              <Paper
                sx={{
                  position: 'absolute',
                  left: '100%',
                  top: 0,
                  width: 200,
                  zIndex: 1000,
                  ml: 1
                }}
                elevation={4}
              >
                <MenuList>
                  {category.subcategories.map((sub) => (
                    <MenuItem key={sub} onClick={handleClose}>
                      <Typography variant="body2">{sub}</Typography>
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            )}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
