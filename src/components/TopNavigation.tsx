
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Switch,
  FormControlLabel,
  Avatar,
  Menu,
  MenuItem
} from '@mui/material';
import { Menu as MenuIcon, AccountCircle, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { LocationSelector } from './LocationSelector';
import { SearchWithCategories } from './SearchWithCategories';
import { ThemeToggle } from './ThemeToggle';

interface TopNavigationProps {
  onMenuToggle: () => void;
  userType: 'user' | 'seller' | 'admin';
  onUserTypeChange?: (type: 'user' | 'seller') => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({ 
  onMenuToggle, 
  userType, 
  onUserTypeChange 
}) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
    handleMenuClose();
  };

  const handleUserTypeToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newType = event.target.checked ? 'seller' : 'user';
    onUserTypeChange?.(newType);
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#ff6b35', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onMenuToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ mr: 3, fontWeight: 'bold' }}>
          LocalMarket
        </Typography>

        {(userType === 'seller' || userType === 'admin') && onUserTypeChange && (
          <FormControlLabel
            control={
              <Switch
                checked={userType === 'seller'}
                onChange={handleUserTypeToggle}
                color="default"
              />
            }
            label={userType === 'seller' ? 'Seller Mode' : 'User Mode'}
            sx={{ mr: 2, color: 'white' }}
          />
        )}

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <SearchWithCategories />
          <LocationSelector 
            selectedLocation="Polokwane" 
            onLocationChange={(location) => console.log('Location:', location)} 
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <ThemeToggle />
          <IconButton color="inherit" onClick={handleProfileMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Typography>{user.name}</Typography>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ExitToApp sx={{ mr: 1 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
