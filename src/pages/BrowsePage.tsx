import React, { useMemo } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Chip,
  Stack,
  Paper,
  Button,
  Card,
  CardContent,
  CardMedia
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { NavBar } from "@/components/NavBar";
import FeaturedListings, {
  listings as baseListings
} from "@/components/FeaturedListings";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";

type Ad = {
  id: string;
  type: "spotlight" | "card";
  title: string;
  description: string;
  imageUrl: string;
};

// Using same FeaturedListings component as Home for consistent grid

const dummyAds: Ad[] = [
  {
    id: "ad-1",
    type: "card",
    title: "Promo: 20% off cleaning",
    description: "Limited time: book this week and save.",
    imageUrl:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&auto=format&fit=crop"
  },
  {
    id: "ad-2",
    type: "card",
    title: "Featured: Mobile mechanics",
    description: "We come to you. Same-day service.",
    imageUrl:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop"
  }
];

const adToListing = (ad: Ad, idx: number) => ({
  id: `sponsored-${ad.id}-${idx}`,
  title: ad.title,
  price: "Sponsored",
  location: "Featured",
  rating: 5,
  reviews: 0,
  image: ad.imageUrl,
  timeAgo: "Just now",
  verified: false,
  category: "Sponsored"
});

// Using shared ListingTile

const InFeedAdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        height: "100%",
        border: 1,
        borderColor: "divider"
      }}
    >
      <CardMedia
        component="img"
        image={ad.imageUrl}
        alt={ad.title}
        sx={{ height: 160 }}
      />
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <Avatar sx={{ bgcolor: "primary.main", width: 28, height: 28 }}>
            AD
          </Avatar>
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }} noWrap>
            {ad.title}
          </Typography>
          <Chip label="Sponsored" size="small" sx={{ ml: "auto" }} />
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 1.5 }}
          noWrap
        >
          {ad.description}
        </Typography>
        <Button variant="contained" size="small" endIcon={<PlayArrowIcon />}>
          Learn more
        </Button>
      </CardContent>
    </Card>
  );
};

const BrowsePage: React.FC = () => {
  const adsPerRow = 4;
  const insertAdsEvery = 8; // insert a full ads row after every 8 listings

  return (
    <Box mt={10}>
      <NavBar isLoggedIn={false} onAuthClick={() => {}} onLogout={() => {}} />
      <Box sx={{ pt: 10, pb: { xs: 3, md: 6 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Browse
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
            Discover listings and sponsored promotions tailored to you.
          </Typography>

          {/* Listings - same component as home with a mid-stream sponsored row */}
          <FeaturedListings
            items={baseListings}
            sponsoredRow={{
              after: 8,
              items: [
                {
                  id: "browse-mid-1",
                  title: "Local Pro Cleaning",
                  image:
                    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&auto=format&fit=crop"
                },
                {
                  id: "browse-mid-2",
                  title: "Mobile Mechanics",
                  image:
                    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&auto=format&fit=crop"
                },
                {
                  id: "browse-mid-3",
                  title: "Chef at Home",
                  image:
                    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop"
                },
                {
                  id: "browse-mid-4",
                  title: "Handyman Special",
                  image:
                    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop"
                }
              ]
            }}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default BrowsePage;
