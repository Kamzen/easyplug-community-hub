
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Chip, Button } from '@mui/material';
import { ArrowLeft, MapPin, Star, Clock, MessageCircle } from 'lucide-react';

// Mock data for different categories
const categoryItems = {
  'services': [
    {
      id: 1,
      title: "Professional House Cleaning",
      price: "R350/session",
      location: "Polokwane Central",
      rating: 4.9,
      reviews: 47,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
      timeAgo: "2 hours ago",
      verified: true,
      seller: "CleanPro Services"
    },
    {
      id: 2,
      title: "Garden Maintenance & Landscaping",
      price: "R500/day",
      location: "Bendor Park",
      rating: 4.7,
      reviews: 23,
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop",
      timeAgo: "4 hours ago",
      verified: true,
      seller: "Green Gardens"
    }
  ],
  'electronics': [
    {
      id: 3,
      title: "iPhone 14 Pro Max 256GB",
      price: "R18,999",
      location: "Polokwane Central",
      rating: 4.8,
      reviews: 12,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
      timeAgo: "1 hour ago",
      verified: true,
      seller: "TechHub Store"
    }
  ],
  'fashion': [
    {
      id: 4,
      title: "Designer Winter Jacket",
      price: "R899",
      location: "Mankweng",
      rating: 4.6,
      reviews: 8,
      image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=300&fit=crop",
      timeAgo: "3 hours ago",
      verified: false,
      seller: "Fashion Forward"
    }
  ]
};

const CategoryPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = React.useState<number | null>(null);
  
  const items = categoryItems[category as keyof typeof categoryItems] || [];
  const categoryName = category?.charAt(0).toUpperCase() + category?.slice(1);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'white' }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Button 
          startIcon={<ArrowLeft />}
          onClick={() => navigate('/')}
          sx={{ mb: 4, color: '#ff6b35' }}
        >
          Back to Home
        </Button>
        
        <Typography variant="h3" fontWeight="bold" color="#ff6b35" gutterBottom>
          {categoryName}
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          {items.length} items available in your area
        </Typography>

        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card 
                sx={{ 
                  borderRadius: 4,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
                  }
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => navigate(`/item/${item.id}`)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={item.image}
                    alt={item.title}
                  />
                  
                  {item.verified && (
                    <Chip
                      label="Verified Local"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        bgcolor: '#4CAF50',
                        color: 'white',
                        fontWeight: 'bold'
                      }}
                    />
                  )}
                  
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: 12,
                      bgcolor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Clock size={12} style={{ marginRight: 4 }} />
                    {item.timeAgo}
                  </Box>

                  {/* Chat button that appears on hover */}
                  {hoveredItem === item.id && (
                    <Button
                      variant="contained"
                      startIcon={<MessageCircle size={16} />}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'linear-gradient(135deg, #ff6b35, #f7931e)',
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        animation: 'fadeIn 0.3s ease',
                        '@keyframes fadeIn': {
                          from: { opacity: 0, scale: 0.8 },
                          to: { opacity: 1, scale: 1 }
                        }
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        alert(`Starting chat with ${item.seller}`);
                      }}
                    >
                      Chat
                    </Button>
                  )}
                </Box>

                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {item.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Box sx={{
                      display: 'flex',
                      alignItems: 'center',
                      bgcolor: '#FFF3E0',
                      px: 1,
                      py: 0.5,
                      borderRadius: 2,
                      mr: 2
                    }}>
                      <Star size={16} color="#ff6b35" fill="#ff6b35" />
                      <Typography variant="body2" sx={{ ml: 0.5, fontWeight: 'bold' }}>
                        {item.rating}
                      </Typography>
                      <Typography variant="body2" sx={{ ml: 0.5, color: 'text.secondary' }}>
                        ({item.reviews})
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <MapPin size={16} color="#666" />
                    <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                      {item.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h5" fontWeight="bold" color="#ff6b35">
                      {item.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      by {item.seller}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default CategoryPage;
