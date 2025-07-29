import { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button as MuiButton,
  TextField,
  useMediaQuery,
  Chip,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ReplayIcon from "@mui/icons-material/Replay";
import RateReviewIcon from "@mui/icons-material/RateReview";
import PersonIcon from "@mui/icons-material/Person";
import {
  User,
  ShoppingCart,
  Heart,
  Package,
  FileText,
  RotateCcw,
  Star
} from "lucide-react";
import { NavBar } from "../components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FeaturedListings } from "../components/FeaturedListings";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("personal-details");

  // Mock data
  const orderData = [
    {
      id: "ORD001",
      date: "2024-01-15",
      total: "R 1,250",
      status: "Delivered",
      items: 3
    },
    {
      id: "ORD002",
      date: "2024-01-10",
      total: "R 890",
      status: "Shipped",
      items: 2
    },
    {
      id: "ORD003",
      date: "2024-01-05",
      total: "R 2,100",
      status: "Processing",
      items: 5
    }
  ];

  const cartData = [
    {
      id: 1,
      name: "iPhone 14 Pro",
      price: "R 18,999",
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Samsung Galaxy Watch",
      price: "R 3,499",
      quantity: 2,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "AirPods Pro",
      price: "R 4,299",
      quantity: 1,
      image: "/placeholder.svg"
    }
  ];

  const wishlistData = [
    {
      id: 1,
      name: "MacBook Pro M3",
      price: "R 32,999",
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      price: "R 6,999",
      image: "/placeholder.svg"
    },
    { id: 3, name: "iPad Air", price: "R 12,999", image: "/placeholder.svg" }
  ];

  const invoiceData = [
    {
      id: "INV001",
      orderId: "ORD001",
      date: "2024-01-15",
      amount: "R 1,250",
      status: "Paid"
    },
    {
      id: "INV002",
      orderId: "ORD002",
      date: "2024-01-10",
      amount: "R 890",
      status: "Paid"
    },
    {
      id: "INV003",
      orderId: "ORD003",
      date: "2024-01-05",
      amount: "R 2,100",
      status: "Pending"
    }
  ];

  const returnData = [
    {
      id: "RET001",
      orderId: "ORD001",
      product: "iPhone Case",
      reason: "Defective",
      status: "Approved",
      date: "2024-01-20"
    },
    {
      id: "RET002",
      orderId: "ORD002",
      product: "Bluetooth Speaker",
      reason: "Wrong Size",
      status: "Processing",
      date: "2024-01-18"
    }
  ];

  const reviewData = [
    {
      id: 1,
      product: "iPhone 14 Pro",
      rating: 5,
      review: "Excellent product, very satisfied!",
      date: "2024-01-16"
    },
    {
      id: 2,
      product: "Samsung Watch",
      rating: 4,
      review: "Good quality, fast delivery.",
      date: "2024-01-12"
    },
    {
      id: 3,
      product: "AirPods Pro",
      rating: 5,
      review: "Amazing sound quality!",
      date: "2024-01-08"
    }
  ];

  // State for NavBar
  const [selectedLocation, setSelectedLocation] = useState("Polokwane");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!user;

  const handleProfileAction = (action: string) => {
    // Optionally, you can use navigate here if needed
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const tabLabels = [
    {
      label: "Personal Details",
      icon: <PersonIcon />,
      value: "personal-details"
    },
    { label: "Cart", icon: <ShoppingCartIcon />, value: "cart" },
    { label: "Wishlist", icon: <FavoriteIcon />, value: "wishlist" },
    { label: "Orders", icon: <LocalShippingIcon />, value: "orders" },
    { label: "Invoices", icon: <ReceiptIcon />, value: "invoices" },
    { label: "Returns", icon: <ReplayIcon />, value: "returns" },
    { label: "Reviews", icon: <RateReviewIcon />, value: "reviews" }
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", py: 8 }}>
      <NavBar
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoggedIn={isLoggedIn}
        user={user}
        onProfileAction={handleProfileAction}
        onLogout={handleLogout}
      />
      <Box sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4 }, pt: 12 }}>
        <Box sx={{ mt: 6, mb: 6 }}>
          <MuiButton
            startIcon={<ArrowBackIcon />}
            onClick={() => (window.location.href = "/")}
            sx={{
              color: "#fff",
              fontWeight: 700,
              background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              px: 2,
              boxShadow: 2,
              "&:hover": {
                background: "linear-gradient(90deg, #764ba2 0%, #667eea 100%)"
              }
            }}
          >
            Back to Home
          </MuiButton>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, mt: 2 }}>
            My Profile
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 4
          }}
        >
          {/* MUI Tabs Sidebar */}
          <Tabs
            orientation={isMobile ? "horizontal" : "vertical"}
            value={activeTab}
            onChange={(_, v) => setActiveTab(v)}
            variant={isMobile ? "scrollable" : "standard"}
            scrollButtons={isMobile ? "auto" : false}
            sx={{
              minWidth: isMobile ? "100%" : 180,
              borderRadius: 2,
              bgcolor: "background.paper",
              mb: { xs: 2, sm: 0 },
              boxShadow: { sm: 1 }
            }}
          >
            {tabLabels.map((tab) => (
              <Tab
                key={tab.value}
                icon={tab.icon}
                iconPosition="start"
                label={tab.label}
                value={tab.value}
                sx={{
                  alignItems: "flex-start",
                  minHeight: 48,
                  fontSize: { xs: 12, sm: 16 },
                  textTransform: "none",
                  fontWeight: 500
                }}
              />
            ))}
          </Tabs>
          {/* Tab Content */}
          <Box sx={{ flex: 1, width: "100%" }}>
            {activeTab === "personal-details" && (
              <Card sx={{ mb: 4 }}>
                <CardHeader
                  title={<Typography variant="h6">Personal Details</Typography>}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                      gap: 2
                    }}
                  >
                    <TextField
                      label="First Name"
                      defaultValue="John"
                      fullWidth
                      size="small"
                    />
                    <TextField
                      label="Last Name"
                      defaultValue="Doe"
                      fullWidth
                      size="small"
                    />
                  </Box>
                  <TextField
                    label="Email"
                    defaultValue="john.doe@example.com"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Phone"
                    defaultValue="+27 123 456 789"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                  />
                  <TextField
                    label="Address"
                    defaultValue="123 Market Street, Polokwane, 0700"
                    fullWidth
                    size="small"
                    sx={{ mt: 2 }}
                    multiline
                    rows={2}
                  />
                  <MuiButton
                    variant="contained"
                    sx={{
                      mt: 2,
                      background:
                        "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                      color: "#fff",
                      fontWeight: 700,
                      boxShadow: 2,
                      "&:hover": {
                        background:
                          "linear-gradient(90deg, #764ba2 0%, #667eea 100%)"
                      }
                    }}
                  >
                    Save Changes
                  </MuiButton>
                </CardContent>
              </Card>
            )}
            {activeTab === "cart" && (
              <Card sx={{ mb: 4 }}>
                <CardHeader
                  title={<Typography variant="h6">Shopping Cart</Typography>}
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Quantity</TableCell>
                          <TableCell>Total</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {cartData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              <MuiButton color="error" size="small">
                                Remove
                              </MuiButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
            {activeTab === "wishlist" && (
              <Card sx={{ mb: 4 }}>
                <CardHeader
                  title={<Typography variant="h6">Wishlist</Typography>}
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Product</TableCell>
                          <TableCell>Price</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {wishlistData.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.price}</TableCell>
                            <TableCell>
                              <MuiButton size="small">Add to Cart</MuiButton>
                              <MuiButton size="small" color="error">
                                Remove
                              </MuiButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
            {activeTab === "orders" && (
              <Card sx={{ mb: 4 }}>
                <CardHeader
                  title={<Typography variant="h6">Order History</Typography>}
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Total</TableCell>
                          <TableCell>Items</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {orderData.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.total}</TableCell>
                            <TableCell>{order.items}</TableCell>
                            <TableCell>
                              <Chip
                                label={order.status}
                                color={
                                  order.status === "Delivered"
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
            {activeTab === "invoices" && (
              <Card sx={{ mb: 4 }}>
                <CardHeader
                  title={<Typography variant="h6">Invoices</Typography>}
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Invoice ID</TableCell>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Date</TableCell>
                          <TableCell>Amount</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {invoiceData.map((invoice) => (
                          <TableRow key={invoice.id}>
                            <TableCell>{invoice.id}</TableCell>
                            <TableCell>{invoice.orderId}</TableCell>
                            <TableCell>{invoice.date}</TableCell>
                            <TableCell>{invoice.amount}</TableCell>
                            <TableCell>
                              <Chip
                                label={invoice.status}
                                color={
                                  invoice.status === "Paid"
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell>
                              <MuiButton size="small">Download</MuiButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
            {activeTab === "returns" && (
              <Card sx={{ mb: 4 }}>
                <CardHeader
                  title={
                    <Typography variant="h6">Returns & Refunds</Typography>
                  }
                />
                <CardContent>
                  <TableContainer component={Paper}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Return ID</TableCell>
                          <TableCell>Order ID</TableCell>
                          <TableCell>Product</TableCell>
                          <TableCell>Reason</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Date</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {returnData.map((returnItem) => (
                          <TableRow key={returnItem.id}>
                            <TableCell>{returnItem.id}</TableCell>
                            <TableCell>{returnItem.orderId}</TableCell>
                            <TableCell>{returnItem.product}</TableCell>
                            <TableCell>{returnItem.reason}</TableCell>
                            <TableCell>
                              <Chip
                                label={returnItem.status}
                                color={
                                  returnItem.status === "Approved"
                                    ? "success"
                                    : "default"
                                }
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{returnItem.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            )}
            {activeTab === "reviews" && (
              <Card sx={{ mb: 4 }}>
                <CardHeader
                  title={<Typography variant="h6">Product Reviews</Typography>}
                />
                <CardContent>
                  {reviewData.map((review) => (
                    <Paper key={review.id} sx={{ p: 2, mb: 2 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 1
                        }}
                      >
                        <Typography fontWeight={600}>
                          {review.product}
                        </Typography>
                        <Box>
                          {[...Array(5)].map((_, i) => (
                            <StarIcon
                              key={i}
                              sx={{
                                color:
                                  i < review.rating ? "#FFD700" : "#E0E0E0",
                                fontSize: 18
                              }}
                            />
                          ))}
                        </Box>
                      </Box>
                      <Typography color="text.secondary" sx={{ mb: 1 }}>
                        {review.review}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Paper>
                  ))}
                </CardContent>
              </Card>
            )}
          </Box>
        </Box>
      </Box>
      {/* Picks that you may like */}
      <Box
        sx={{ maxWidth: 1200, mx: "auto", px: { xs: 2, sm: 4 }, mt: 10, mb: 8 }}
      >
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ mb: 4, color: "primary.main", letterSpacing: 0.5 }}
        >
          Picks that you may like
        </Typography>
        <FeaturedListings />
      </Box>
    </Box>
  );
};

export default ProfilePage;
