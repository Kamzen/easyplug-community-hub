
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardMedia, Button, Chip, Avatar, Paper, Divider } from '@mui/material';
import { ArrowLeft, MapPin, Star, Clock, MessageCircle, Phone, Shield, Heart } from 'lucide-react';

const ItemDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock item data - in a real app, you'd fetch this based on the ID
  const item = {
    id: 1,
    title: "iPhone 14 Pro Max 256GB",
    price: "R18,999",
    originalPrice: "R22,999",
    location: "Polokwane Central",
    rating: 4.8,
    reviews: 124,
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=400&fit=crop"
    ],
    timeAgo: "2 hours ago",
    verified: true,
    seller: {
      name: "TechHub Store",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 4.9,
      totalSales: 156,
      memberSince: "2022"
    },
    description: "Brand new iPhone 14 Pro Max in Deep Purple. Still sealed in original packaging. Comes with all accessories including Lightning cable, documentation, and Apple stickers. 256GB storage capacity perfect for all your photos, videos, and apps.",
    features: [
      "6.7-inch Super Retina XDR display",
      "A16 Bionic chip",
      "Pro camera system",
      "Up to 29 hours video playback",
      "Face ID",
      "5G capable"
    ],
    condition: "Brand New",
    category: "Electronics"
  };

  const [selectedImage, setSelectedImage] = React.useState(0);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowLeft />}
          onClick={() => navigate(-1)}
          sx={{ mb: 4, color: '#ff6b35' }}
        >
          Back
        </Button>
        
        <Grid container spacing={4}>
          {/* Image Gallery */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ borderRadius: 4, overflow: 'hidden', mb: 2 }}>
              <CardMedia
                component="img"
                height="400"
                image={item.images[selectedImage]}
                alt={item.title}
              />
            </Card>
            
            <Grid container spacing={1}>
              {item.images.map((image, index) => (
                <Grid size={{ xs: 4 }} key={index}>
                  <Card 
                    sx={{ 
                      cursor: 'pointer',
                      border: selectedImage === index ? '3px solid #ff6b35' : 'none',
                      borderRadius: 2
                    }}
                    onClick={() => setSelectedImage(index)}
                  >
                    <CardMedia
                      component="img"
                      height="80"
                      image={image}
                      alt={`${item.title} ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Item Details */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper sx={{ p: 4, borderRadius: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip
                  label={item.category}
                  size="small"
                  sx={{ mr: 2, bgcolor: '#FFF3E0', color: '#ff6b35' }}
                />
                {item.verified && (
                  <Chip
                    label="Verified Local"
                    size="small"
                    icon={<Shield size={14} />}
                    sx={{ bgcolor: '#4CAF50', color: 'white' }}
                  />
                )}
              </Box>

              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {item.title}
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Typography variant="h3" fontWeight="bold" color="#ff6b35" sx={{ mr: 2 }}>
                  {item.price}
                </Typography>
                <Typography variant="h6" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
                  {item.originalPrice}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Star size={20} color="#ff6b35" fill="#ff6b35" />
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 'bold' }}>
                  {item.rating} ({item.reviews} reviews)
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <MapPin size={20} color="#666" />
                <Typography variant="body1" sx={{ ml: 1, color: 'text.secondary' }}>
                  {item.location}
                </Typography>
                <Clock size={16} color="#666" style={{ marginLeft: 16 }} />
                <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                  {item.timeAgo}
                </Typography>
              </Box>

              <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<MessageCircle />}
                    sx={{
                      background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                      borderRadius: 3,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 'bold'
                    }}
                  >
                    Chat Now
                  </Button>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Button
                    fullWidth
                    variant="outlined"
                    size="large"
                    startIcon={<Phone />}
                    sx={{
                      borderColor: '#ff6b35',
                      color: '#ff6b35',
                      borderRadius: 3,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 'bold',
                      '&:hover': {
                        borderColor: '#e55a2e',
                        backgroundColor: '#fff3f0'
                      }
                    }}
                  >
                    Call
                  </Button>
                </Grid>
              </Grid>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<Heart />}
                sx={{
                  borderColor: '#ddd',
                  color: '#666',
                  borderRadius: 3,
                  textTransform: 'none'
                }}
              >
                Save to Wishlist
              </Button>
            </Paper>

            {/* Seller Info */}
            <Paper sx={{ p: 3, borderRadius: 4, mt: 3 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Seller Information
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar src={item.seller.avatar} sx={{ width: 50, height: 50, mr: 2 }} />
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.seller.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Star size={16} color="#ff6b35" fill="#ff6b35" />
                    <Typography variant="body2" sx={{ ml: 0.5 }}>
                      {item.seller.rating} • {item.seller.totalSales} sales • Member since {item.seller.memberSince}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Description & Features */}
        <Paper sx={{ p: 4, borderRadius: 4, mt: 4 }}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {item.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={1}>
            {item.features.map((feature, index) => (
              <Grid size={{ xs: 12, sm: 6 }} key={index}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  • {feature}
                </Typography>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
            <Typography variant="body2" fontWeight="bold">
              Condition: {item.condition}
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ItemDetailPage;
