import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TopNavigation } from "../components/TopNavigation";
import { SideDrawer } from "../components/SideDrawer";

const SellerDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [userType, setUserType] = useState<"user" | "seller">("seller");

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleUserTypeChange = (type: "user" | "seller") => {
    setUserType(type);
  };

  // Dummy data for charts
  const salesData = [
    { name: "Jan", sales: 4000, orders: 240 },
    { name: "Feb", sales: 3000, orders: 198 },
    { name: "Mar", sales: 2000, orders: 150 },
    { name: "Apr", sales: 2780, orders: 208 },
    { name: "May", sales: 1890, orders: 140 },
    { name: "Jun", sales: 2390, orders: 180 }
  ];

  const categoryData = [
    { name: "Electronics", value: 400, color: "#ff6b35" },
    { name: "Clothing", value: 300, color: "#f7931e" },
    { name: "Home", value: 200, color: "#ffa500" },
    { name: "Sports", value: 100, color: "#ffb84d" }
  ];

  const productData = [
    { name: "iPhone 14", sold: 45 },
    { name: "Samsung TV", sold: 32 },
    { name: "Nike Shoes", sold: 28 },
    { name: "Laptop Dell", sold: 25 }
  ];

  if (userType === "user") {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        <TopNavigation
          onMenuToggle={handleDrawerToggle}
          userType="user"
          onUserTypeChange={handleUserTypeChange}
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
              Welcome to LocalMarket
            </Typography>
            <Typography variant="body1">
              You are now in user mode. Browse categories and find great deals!
            </Typography>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <TopNavigation
        onMenuToggle={handleDrawerToggle}
        userType="seller"
        onUserTypeChange={handleUserTypeChange}
      />

      <SideDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        userType="seller"
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
            Seller Dashboard
          </Typography>

          <Grid container spacing={3}>
            {/* Sales Overview */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Sales Overview
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#ff6b35"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#f7931e"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Quick Stats */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{ borderRadius: 3, bgcolor: "#ff6b35", color: "white" }}
                  >
                    <CardContent>
                      <Typography variant="h4" fontWeight="bold">
                        R 15,420
                      </Typography>
                      <Typography variant="body2">Total Revenue</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{ borderRadius: 3, bgcolor: "#f7931e", color: "white" }}
                  >
                    <CardContent>
                      <Typography variant="h4" fontWeight="bold">
                        126
                      </Typography>
                      <Typography variant="body2">Total Orders</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Card
                    sx={{ borderRadius: 3, bgcolor: "#ffa500", color: "white" }}
                  >
                    <CardContent>
                      <Typography variant="h4" fontWeight="bold">
                        45
                      </Typography>
                      <Typography variant="body2">Active Products</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Grid>

            {/* Category Distribution */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Sales by Category
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Top Products */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Top Selling Products
                </Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={productData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sold" fill="#ff6b35" />
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

export default SellerDashboard;
