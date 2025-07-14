
import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Avatar, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, MessageCircle, Settings, LogOut, User } from 'lucide-react';

const UserDashboard = () => {
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
              <User size={30} />
            </Avatar>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Welcome back, {user.name}!
              </Typography>
              <Chip label="Regular User" color="primary" size="small" />
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
          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <ShoppingBag size={48} color="#ff6b35" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  My Orders
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Track your purchases and order history
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ff6b35' }}>
                  View Orders
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <Heart size={48} color="#ff6b35" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Wishlist
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Items you've saved for later
                </Typography>
                <Button variant="contained" sx={{ bgcolor: '#ff6b35' }}>
                  View Wishlist
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ borderRadius: 4, height: '100%' }}>
              <CardContent sx={{ textAlign: 'center', p: 4 }}>
                <MessageCircle size={48} color="#ff6b35" style={{ marginBottom: 16 }} />
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Messages
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Chat with sellers and support
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
            sx={{ color: '#ff6b35', borderColor: '#ff6b35' }}
          >
            Back to Marketplace
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default UserDashboard;
