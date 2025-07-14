
import React from 'react';
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  IconButton
} from '@mui/material';
import {
  Home,
  Category,
  Favorite,
  ShoppingCart,
  Person,
  Settings,
  Help,
  ChevronLeft,
  Store,
  Dashboard,
  Analytics,
  Inventory,
  Chat,
  People,
  AdminPanelSettings
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface SideDrawerProps {
  open: boolean;
  onClose: () => void;
  userType: 'user' | 'seller' | 'admin';
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ open, onClose, userType }) => {
  const navigate = useNavigate();

  const userMenuItems = [
    { text: 'Home', icon: <Home />, path: '/user-dashboard' },
    { text: 'Categories', icon: <Category />, path: '/categories' },
    { text: 'Favorites', icon: <Favorite />, path: '/favorites' },
    { text: 'My Orders', icon: <ShoppingCart />, path: '/orders' },
    { text: 'Profile', icon: <Person />, path: '/profile' },
    { text: 'Settings', icon: <Settings />, path: '/settings' },
    { text: 'Help', icon: <Help />, path: '/help' },
  ];

  const sellerMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/seller-dashboard' },
    { text: 'My Store', icon: <Store />, path: '/my-store' },
    { text: 'Products', icon: <Inventory />, path: '/products' },
    { text: 'Analytics', icon: <Analytics />, path: '/analytics' },
    { text: 'Orders', icon: <ShoppingCart />, path: '/seller-orders' },
    { text: 'Messages', icon: <Chat />, path: '/messages' },
    { text: 'Settings', icon: <Settings />, path: '/seller-settings' },
  ];

  const adminMenuItems = [
    { text: 'Dashboard', icon: <Dashboard />, path: '/admin-dashboard' },
    { text: 'User Management', icon: <People />, path: '/user-management' },
    { text: 'Product Moderation', icon: <Inventory />, path: '/product-moderation' },
    { text: 'Analytics', icon: <Analytics />, path: '/admin-analytics' },
    { text: 'Reports', icon: <AdminPanelSettings />, path: '/reports' },
    { text: 'System Settings', icon: <Settings />, path: '/system-settings' },
  ];

  const getMenuItems = () => {
    switch (userType) {
      case 'seller': return sellerMenuItems;
      case 'admin': return adminMenuItems;
      default: return userMenuItems;
    }
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: 64,
          height: 'calc(100vh - 64px)'
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary">
          {userType === 'seller' ? 'Seller Panel' : userType === 'admin' ? 'Admin Panel' : 'Menu'}
        </Typography>
        <IconButton onClick={onClose}>
          <ChevronLeft />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {getMenuItems().map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => handleNavigation(item.path)}>
              <ListItemIcon sx={{ color: '#ff6b35' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
