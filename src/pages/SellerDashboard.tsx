
import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Avatar, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Store, Plus, BarChart, Package, MessageCircle, Settings, LogOut } from 'lucide-react';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: '#ff6b35', mr: 2 }}>
              <Store size={30} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Seller Dashboard
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {user.name}
              </Typography>
              <Chip label="Verified Seller" color="success" size="small" />
            </Box>
          </Box>
          <Button 
            variant="outlined" 
            startIcon={<LogOut />}
            onClick={handleLogout}
            sx={{ color: '#ff6b35', borderColor: '#ff6b35' }}
          >
            Logout
          </Button>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Plus size={48} color="#ff6b35" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Add Product
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  List a new item for sale
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ff6b35' }}>
                  Add Item
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Package size={48} color="#ff6b35" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  My Products
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Manage your listings
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ff6b35' }}>
                  View Products
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <BarChart size={48} color="#ff6b35" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Analytics
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Track your sales performance
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ff6b35' }}>
                  View Stats
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <MessageCircle size={48} color="#ff6b35" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Customer Chat
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Respond to customer inquiries
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ff6b35' }}>
                  View Messages
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/')}
            sx={{ mr: 2, color: '#ff6b35', borderColor: '#ff6b35' }}
          >
            Back to Marketplace
          </Button>
          <Button 
            variant="contained" 
            sx={{ bgcolor: '#ff6b35' }}
          >
            Store Settings
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SellerDashboard;
