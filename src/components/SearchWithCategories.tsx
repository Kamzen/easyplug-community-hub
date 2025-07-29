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
  Divider
} from "@mui/material";
import { Search, ExpandMore } from "@mui/icons-material";

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

export const SearchWithCategories = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleCategoryClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setHoveredCategory(null);
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        placeholder="Search…"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        size="small"
        variant="outlined"
        sx={{ bgcolor: "background.paper", borderRadius: 2, minWidth: 180 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
      <FormControl size="small" variant="outlined" sx={{ minWidth: 140 }}>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          displayEmpty
          startAdornment={
            <InputAdornment position="start">
              <IconButton size="small" onClick={handleCategoryClick} edge="end">
                <ExpandMore />
              </IconButton>
            </InputAdornment>
          }
        >
          <MenuItem value="All Categories">All Categories</MenuItem>
          {categories.map((cat) => (
            <MenuItem key={cat.name} value={cat.name}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: { width: 200, maxHeight: 400 }
        }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              setSelectedCategory("All Categories");
              handleClose();
            }}
          >
            <Typography>All Categories</Typography>
          </MenuItem>
          <Divider />
          {categories.map((category) => (
            <Box key={category.name}>
              <MenuItem
                onMouseEnter={() => setHoveredCategory(category.name)}
                onMouseLeave={() => setHoveredCategory(null)}
                onClick={() => {
                  setSelectedCategory(category.name);
                  handleClose();
                }}
              >
                <Typography>{category.name}</Typography>
              </MenuItem>
              {hoveredCategory === category.name && (
                <Paper
                  sx={{
                    position: "absolute",
                    left: "100%",
                    top: 0,
                    width: 180,
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
            </Box>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};
