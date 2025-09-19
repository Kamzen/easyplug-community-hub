import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
  Avatar,
  Stack
} from "@mui/material";
import { LineChart, BarChart, PieChart } from "@mui/x-charts";
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

  // Transforms for MUI X-Charts
  const months = salesData.map((d) => d.name);
  const salesSeries = salesData.map((d) => d.sales);
  const ordersSeries = salesData.map((d) => d.orders);
  const productNames = productData.map((p) => p.name);
  const productSold = productData.map((p) => p.sold);
  const pieSeriesData = categoryData.map((c, idx) => ({
    id: idx,
    value: c.value,
    label: c.name,
    color: c.color
  }));

  const recentOrders = [
    {
      id: "#1042",
      customer: "Sarah M.",
      total: "R1,899",
      status: "Paid",
      avatar: "https://i.pravatar.cc/80?img=1"
    },
    {
      id: "#1041",
      customer: "John D.",
      total: "R729",
      status: "Pending",
      avatar: "https://i.pravatar.cc/80?img=2"
    },
    {
      id: "#1040",
      customer: "Mike R.",
      total: "R12,499",
      status: "Shipped",
      avatar: "https://i.pravatar.cc/80?img=3"
    },
    {
      id: "#1039",
      customer: "Lisa K.",
      total: "R349",
      status: "Paid",
      avatar: "https://i.pravatar.cc/80?img=4"
    }
  ];

  const tasks = [
    { id: 1, title: "Respond to 3 new messages", state: "Due Today" },
    { id: 2, title: "Re-stock ‘iPhone 14’", state: "Low Stock" },
    { id: 3, title: "Verify business documents", state: "Action Required" }
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="primary">
              Seller Dashboard
            </Typography>
            <Stack direction="row" spacing={1}>
              <Button variant="outlined" size="small">
                Export
              </Button>
              <Button variant="contained" size="small">
                Add Product
              </Button>
            </Stack>
          </Box>

          {/* KPI Cards */}
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Revenue (30d)
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    R 15,420
                  </Typography>
                  <Chip
                    label="↑ 12%"
                    size="small"
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Orders (30d)
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    126
                  </Typography>
                  <Chip
                    label="↑ 8%"
                    size="small"
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Store Views
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    8,942
                  </Typography>
                  <Chip
                    label="↑ 3%"
                    size="small"
                    color="success"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card sx={{ borderRadius: 3 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Conversion
                  </Typography>
                  <Typography variant="h5" fontWeight={800}>
                    2.4%
                  </Typography>
                  <Chip
                    label="↓ 0.3%"
                    size="small"
                    color="warning"
                    sx={{ mt: 1 }}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            {/* Sales Overview */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Sales Overview
                </Typography>
                <LineChart
                  height={300}
                  sx={{ width: "100%" }}
                  xAxis={[{ data: months }]}
                  series={[
                    { data: salesSeries, label: "Sales", color: "#ff6b35" },
                    { data: ordersSeries, label: "Orders", color: "#f7931e" }
                  ]}
                />
              </Paper>
            </Grid>

            {/* Quick Stats */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Recent Orders
                </Typography>
                <List dense>
                  {recentOrders.map((o, i) => (
                    <React.Fragment key={o.id}>
                      <ListItem sx={{ px: 0 }}>
                        <Avatar
                          src={o.avatar}
                          sx={{ width: 32, height: 32, mr: 1 }}
                        />
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between"
                              }}
                            >
                              <Typography variant="body2" fontWeight={600}>
                                {o.customer}
                              </Typography>
                              <Typography variant="body2" fontWeight={700}>
                                {o.total}
                              </Typography>
                            </Box>
                          }
                          secondary={
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space_between"
                              }}
                            >
                              <Typography
                                variant="caption"
                                color="text.secondary"
                              >
                                {o.id}
                              </Typography>
                              <Chip
                                label={o.status}
                                size="small"
                                sx={{ ml: 1 }}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      {i !== recentOrders.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
                <Box sx={{ textAlign: "right", mt: 1 }}>
                  <Button size="small">View all</Button>
                </Box>
              </Paper>
            </Grid>

            {/* Category Distribution */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Sales by Category
                </Typography>
                <PieChart
                  height={250}
                  series={[
                    { data: pieSeriesData, innerRadius: 30, outerRadius: 100 }
                  ]}
                  sx={{ width: "100%" }}
                />
              </Paper>
            </Grid>

            {/* Top Products */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Top Selling Products
                </Typography>
                <BarChart
                  height={250}
                  sx={{ width: "100%" }}
                  xAxis={[{ scaleType: "band", data: productNames }]}
                  series={[
                    { data: productSold, label: "Sold", color: "#ff6b35" }
                  ]}
                />
              </Paper>
            </Grid>

            {/* Tasks */}
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight="bold">
                  Tasks
                </Typography>
                <List dense>
                  {tasks.map((t, i) => (
                    <React.Fragment key={t.id}>
                      <ListItem sx={{ px: 0 }}>
                        <ListItemText
                          primary={
                            <Typography variant="body2" fontWeight={600}>
                              {t.title}
                            </Typography>
                          }
                          secondary={<Chip label={t.state} size="small" />}
                        />
                      </ListItem>
                      {i !== tasks.length - 1 && <Divider />}
                    </React.Fragment>
                  ))}
                </List>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default SellerDashboard;
