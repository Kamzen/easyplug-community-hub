
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Paper 
} from '@mui/material';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { TopNavigation } from '../components/TopNavigation';
import { SideDrawer } from '../components/SideDrawer';

const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Dummy data for admin charts
  const userGrowthData = [
    { name: 'Jan', users: 400, sellers: 100 },
    { name: 'Feb', users: 600, sellers: 150 },
    { name: 'Mar', users: 800, sellers: 200 },
    { name: 'Apr', users: 1200, sellers: 280 },
    { name: 'May', users: 1600, sellers: 350 },
    { name: 'Jun', users: 2000, sellers: 420 },
  ];

  const platformRevenueData = [
    { name: 'Week 1', revenue: 12000 },
    { name: 'Week 2', revenue: 15000 },
    { name: 'Week 3', revenue: 18000 },
    { name: 'Week 4', revenue: 22000 },
  ];

  const categoryPerformanceData = [
    { name: 'Electronics', transactions: 850 },
    { name: 'Vehicles', transactions: 420 },
    { name: 'Property', transactions: 280 },
    { name: 'Services', transactions: 650 },
    { name: 'Food', transactions: 380 },
  ];

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <TopNavigation 
        onMenuToggle={handleDrawerToggle}
        userType="admin"
      />
      
      <SideDrawer 
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userType="admin"
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
            Admin Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            {/* Platform Stats */}
            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: 3, bgcolor: '#ff6b35', color: 'white' }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">2,450</Typography>
                  <Typography variant="body2">Total Users</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: 3, bgcolor: '#f7931e', color: 'white' }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">420</Typography>
                  <Typography variant="body2">Active Sellers</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: 3, bgcolor: '#ffa500', color: 'white' }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">8,650</Typography>
                  <Typography variant="body2">Total Listings</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card sx={{ borderRadius: 3, bgcolor: '#ffb84d', color: 'white' }}>
                <CardContent>
                  <Typography variant="h4" fontWeight="bold">R 2.4M</Typography>
                  <Typography variant="body2">Platform Revenue</Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* User Growth Chart */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  User Growth Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={userGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="users" 
                      stackId="1" 
                      stroke="#ff6b35" 
                      fill="#ff6b35" 
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="sellers" 
                      stackId="1" 
                      stroke="#f7931e" 
                      fill="#f7931e" 
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Platform Revenue */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Weekly Revenue
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={platformRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#ff6b35" 
                      strokeWidth={3}
                      dot={{ fill: '#ff6b35', r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Category Performance */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Category Performance
                </Typography>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={categoryPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="transactions" fill="#ff6b35" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
