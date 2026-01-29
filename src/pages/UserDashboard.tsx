import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent
} from "@mui/material";
import { TopNavigation } from "../components/TopNavigation";
import { SideDrawer } from "../components/SideDrawer";
import { CategoryGrid } from "../components/CategoryGrid";
import { FeaturedListings } from "../components/FeaturedListings";
import { useQuery } from "@tanstack/react-query";
import { listingsService } from "@/services/listingsService";
import { toListingItem } from "@/lib/listingMapper";

function UserDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("Polokwane");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["listings", "dashboard"],
    queryFn: () => listingsService.getAll()
  });

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <TopNavigation onMenuToggle={handleDrawerToggle} userType="user" />

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
          ml: drawerOpen ? "240px" : 0,
          transition: "margin-left 0.3s ease"
        }}
      >
        <Container maxWidth="xl">
          <Typography
            variant="h4"
            gutterBottom
            fontWeight="bold"
            color="primary"
          >
            Explore Categories
          </Typography>

          <CategoryGrid />

          <Box sx={{ mt: 4, mb: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Featured Items
            </Typography>
          </Box>
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 bg-gray-100 animate-pulse rounded"
                />
              ))}
            </div>
          ) : (
            (() => {
              const raw =
                (data?.listings) ??
                (data && data.data) ??
                [];
              const arr = Array.isArray(raw) ? raw : [];
              const items = arr.map((r) => toListingItem(r));
              if (isError || !data || items.length === 0) {
                return (
                  <div className="text-center text-gray-500 py-8">
                    No listings found.
                  </div>
                );
              }
              return <FeaturedListings items={items} />;
            })()
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default UserDashboard;
