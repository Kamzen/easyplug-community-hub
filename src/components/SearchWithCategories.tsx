import React, { useState } from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
  IconButton,
  Menu,
  MenuList,
  Paper,
  Typography,
  Divider,
  styled,
  InputBase
} from "@mui/material";
import { Search as SearchIcon, ExpandMore, Close } from "@mui/icons-material";

const categories = [
  {
    name: "Electronics",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Gaming", "Audio"]
  },
  {
    name: "Vehicles",
    subcategories: ["Cars", "Motorcycles", "Trucks", "Parts", "Accessories"]
  },
  {
    name: "Property",
    subcategories: ["Houses", "Apartments", "Land", "Commercial", "Rentals"]
  },
  {
    name: "Services",
    subcategories: [
      "Cleaning",
      "Tutoring",
      "Photography",
      "Repair",
      "Consulting"
    ]
  },
  {
    name: "Food",
    subcategories: ["Fresh Produce", "Bakery", "Beverages", "Snacks", "Organic"]
  }
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${theme.palette.primary.light}`,
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

export const SearchWithCategories = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  return (
    <Box 
      sx={{ 
        display: "flex", 
        alignItems: "center", 
        gap: 2,
        width: '100%',
        maxWidth: 800,
        mx: 'auto',
        mb: 4,
        px: 2,
        flexDirection: { xs: 'column', sm: 'row' },
        '& > *': {
          width: { xs: '100%', sm: 'auto' },
        },
      }}
    >
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search for products, brands, and more…"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
          endAdornment={
            searchValue && (
              <IconButton
                size="small"
                onClick={() => setSearchValue('')}
                sx={{ mr: 1 }}
              >
                <Close fontSize="small" />
              </IconButton>
            )
          }
        />
      </Search>
      
      <FormControl 
        size="small" 
        variant="outlined" 
        sx={{ 
          minWidth: 200,
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'background.paper',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: 'primary.main',
              boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
            },
          },
        }}
      >
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          renderValue={(selected) => (
            <Typography variant="body2" color="text.primary">
              {selected}
            </Typography>
          )}
          IconComponent={(props) => (
            <IconButton 
              {...props} 
              size="small" 
              onClick={handleCategoryClick}
              sx={{
                right: 4,
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              }}
            >
              <ExpandMore />
            </IconButton>
          )}
          inputProps={{ 'aria-label': 'Select category' }}
          MenuProps={{
            PaperProps: {
              sx: {
                mt: 1,
                boxShadow: 3,
              },
            },
          }}
        >
          <MenuItem value="All Categories">
            <Typography variant="body2">All Categories</Typography>
          </MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>
              <Typography variant="body2">{cat.name}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { 
            width: 480,
            maxHeight: 500,
            display: 'flex',
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: 3,
            mt: 1,
          }
        }}
        MenuListProps={{
          sx: {
            p: 0,
            '&:focus': { outline: 'none' },
          },
        }}
      >
        <Box sx={{ display: 'flex', width: '100%' }}>
          {/* Main Categories */}
          <Box sx={{ width: '40%', borderRight: 1, borderColor: 'divider', bgcolor: 'grey.50' }}>
            <MenuList sx={{ py: 0 }}>
              <MenuItem
                onClick={() => {
                  setSelectedCategory("All Categories");
                  handleClose();
                }}
                selected={selectedCategory === "All Categories"}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  },
                  '&:hover': {
                    bgcolor: 'action.hover',
                  },
                  py: 1.5,
                  px: 2,
                }}
              >
                <Typography variant="subtitle2" fontWeight={500}>
                  All Categories
                </Typography>
              </MenuItem>
              
              {categories.map((category) => (
                <MenuItem
                  key={category.name}
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    handleClose();
                  }}
                  selected={selectedCategory === category.name}
                  sx={{
                    '&.Mui-selected': {
                      bgcolor: 'primary.light',
                      color: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.light',
                      },
                    },
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                    py: 1.5,
                    px: 2,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight={500}>
                    {category.name}
                  </Typography>
                </MenuItem>
              ))}
            </MenuList>
          </Box>

          {/* Subcategories */}
          <Box sx={{ width: '60%', maxHeight: 400, overflowY: 'auto' }}>
            {hoveredCategory ? (
              <Box sx={{ p: 2 }}>
                <Typography variant="subtitle1" fontWeight={600} color="text.primary" gutterBottom>
                  {categories.find(c => c.name === hoveredCategory)?.name || 'Categories'}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {categories
                    .find(c => c.name === hoveredCategory)
                    ?.subcategories.map((sub) => (
                      <Box 
                        key={sub}
                        onClick={() => {
                          handleClose();
                        }}
                        sx={{
                          p: 1.5,
                          borderRadius: 1,
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          '&:hover': {
                            bgcolor: 'primary.light',
                            borderColor: 'primary.main',
                            color: 'primary.main',
                          },
                          width: 'calc(50% - 8px)',
                          boxSizing: 'border-box',
                        }}
                      >
                        <Typography variant="body2" noWrap>
                          {sub}
                        </Typography>
                      </Box>
                    ))}
                </Box>
              </Box>
            ) : (
              <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
                <Typography variant="body2">
                  Hover over a category to see subcategories
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};
