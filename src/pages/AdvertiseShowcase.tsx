import React from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Stack,
  Paper
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StorefrontIcon from "@mui/icons-material/Storefront";

type AdCardProps = {
  title: string;
  description: string;
  imageUrl: string;
  ctaLabel: string;
};

const AdCard: React.FC<AdCardProps> = ({
  title,
  description,
  imageUrl,
  ctaLabel
}) => {
  return (
    <Card sx={{ borderRadius: 3, overflow: "hidden", height: "100%" }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={title}
        sx={{ height: 180 }}
      />
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
          <StorefrontIcon color="primary" />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Stack>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        <Button variant="contained" size="small">
          {ctaLabel}
        </Button>
      </CardContent>
    </Card>
  );
};

type AdSpotlightProps = {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  imageUrl: string;
};

const AdSpotlight: React.FC<AdSpotlightProps> = ({
  headline,
  subheadline,
  ctaLabel,
  imageUrl
}) => {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        color: "white"
      }}
    >
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}>
        <Box sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
          <Typography variant="overline" sx={{ opacity: 0.9 }}>
            Spotlight
          </Typography>
          <Typography
            variant="h4"
            sx={{ fontWeight: 800, lineHeight: 1.2, mt: 1 }}
          >
            {headline}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9, mt: 1.5, mb: 2 }}>
            {subheadline}
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="inherit"
              endIcon={<PlayArrowIcon />}
              sx={{ color: "#5b6ee1" }}
            >
              {ctaLabel}
            </Button>
            <Chip
              label="Sponsored"
              sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
            />
          </Stack>
        </Box>
        <Box sx={{ flex: 1, minHeight: 260, position: "relative" }}>
          <Box
            component="img"
            src={imageUrl}
            alt={headline}
            sx={{
              position: "absolute",
              right: 0,
              bottom: 0,
              width: { xs: "100%", md: "85%" },
              height: "100%",
              objectFit: "cover"
            }}
          />
        </Box>
      </Box>
    </Paper>
  );
};

const AdvertiseShowcase: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        minHeight: "100vh",
        py: { xs: 4, md: 8 }
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 1 }}>
          Advertise your SMME
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Not listings — compelling ads that get you discovered and contacted.
        </Typography>

        <AdSpotlight
          headline="Put your business in the spotlight"
          subheadline="Feature your brand on the homepage hero. Perfect for launches, promos, and seasonal offers."
          ctaLabel="See example"
          imageUrl="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1400&auto=format&fit=crop"
        />

        <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 2 }}>
          Ad formats
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <AdCard
              title="Spotlight Banner"
              description="Large hero banner across pages to maximize reach."
              imageUrl="https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1400&auto=format&fit=crop"
              ctaLabel="Preview"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AdCard
              title="Featured Card"
              description="High-impact cards shown in category and home feeds."
              imageUrl="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop"
              ctaLabel="Preview"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AdCard
              title="Promo Strip"
              description="Slim promotional bar with CTA shown at key moments."
              imageUrl="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop"
              ctaLabel="Preview"
            />
          </Grid>
        </Grid>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, md: 4 },
            mt: 6,
            borderRadius: 3,
            border: 1,
            borderColor: "divider"
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            How SMME ads work
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Create your campaign, choose an audience, set a budget, and go live.
            We’ll place your ad in the best spots across EasyPlug.
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Chip label="Geo-targeted" color="primary" variant="outlined" />
            <Chip label="Category-based" color="primary" variant="outlined" />
            <Chip
              label="Homepage placements"
              color="primary"
              variant="outlined"
            />
            <Chip label="In-feed features" color="primary" variant="outlined" />
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdvertiseShowcase;
