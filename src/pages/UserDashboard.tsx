
import React, { useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { TopNavigation } from '../components/TopNavigation';
import { SideDrawer } from '../components/SideDrawer';
import { CategoryGrid } from '../components/CategoryGrid';
import { FeaturedListings } from '../components/FeaturedListings';

const UserDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState('Polokwane');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <TopNavigation 
        onMenuToggle={handleDrawerToggle}
        userType="user"
      />
      
      <SideDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userType="user"
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: drawerOpen ? '240px' : 0,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
            Explore Categories
          </Typography>
          
          <CategoryGrid />

          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Featured Items
            </Typography>
          </Box>
          
          <FeaturedListings />
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboard;
