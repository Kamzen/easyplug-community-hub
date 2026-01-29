import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
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
  Divider,
  IconButton,
  Grid,
  Paper,
  Container
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Eye,
  MessageCircle,
  Heart,
  DollarSign,
  Edit,
  Camera,
  Settings,
  Shield,
  Bell
} from "lucide-react";
import { NavBar } from "../components/NavBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useQuery } from "@tanstack/react-query";
import { authService, type AuthUser } from "@/services/authService";

const ProfilePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch user from /auth/me via React Query (shared cache with NavBar)
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data } = useQuery<{ user: AuthUser }>({
    queryKey: ["me"],
    queryFn: async () => ({ user: await authService.getUserInfo() }),
    enabled: Boolean(token),
    retry: false
  });
  const me = data?.user;
  const [userLocation, setUserLocation] = useState<{
    streetNumber?: string;
    streetName?: string;
    suburb?: string;
    city?: string;
    province?: string;
    country?: string;
    postalCode?: string;
    accuracy?: number;
  } | null>(null);

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      try {
        const locationData = JSON.parse(storedLocation);
        setUserLocation(locationData);
      } catch (error) {
        console.error("Error parsing stored location:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // State for user avatar
  const [avatarUrl, setAvatarUrl] = useState(
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  );

  // Handle file upload for avatar
  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);

      // Here you would typically upload the file to your server
      // Example: uploadToServer(file);
      console.log("Selected file:", file);
      console.log("File uploaded locally, ready to send to server");
    }
  };

  // Handle camera icon click
  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  // User data from API with safe fallbacks
  const fullName = me
    ? [
        me as unknown as {
          firstName?: string;
          lastName?: string;
          name?: string;
        }
      ].map((u) => {
        const fn = u.firstName || u.name?.split(" ")[0] || "";
        const ln = u.lastName || u.name?.split(" ")[1] || "";
        const n = `${fn} ${ln}`.trim();
        return n || (me.email?.split("@")[0] ?? "User");
      })[0]
    : "John Doe";
  const serverPic =
    (me as unknown as { profilePicture?: string })?.profilePicture || "";
  const resolvedAvatar = serverPic.startsWith("http") ? serverPic : avatarUrl;
  const userData = {
    id: (me as unknown as { userId?: string | number })?.userId || 1,
    name: fullName,
    email: me?.email || "john.doe@example.com",
    phone: (me as unknown as { phone?: string })?.phone || "+27 82 123 4567",
    avatar: resolvedAvatar,
    joinDate: "January 2024",
    verified: true,
    rating: 4.8,
    totalListings: 12,
    totalViews: 2847,
    totalMessages: 156,
    totalLikes: 89
  };

  // Mock address data - integrate with location data
  const addressData = {
    streetNumber: userLocation?.streetNumber || "123",
    streetName: userLocation?.streetName || "Main Street",
    suburb: userLocation?.suburb || "Bendor",
    city: userLocation?.city || "Polokwane",
    province: userLocation?.province || "Limpopo",
    country: userLocation?.country || "South Africa",
    postalCode: userLocation?.postalCode || "0700"
  };

  // Mock transaction data
  const transactionData = [
    {
      id: "TXN001",
      type: "Sale",
      amount: "R 1,250",
      date: "2024-01-15",
      status: "Completed",
      description: "iPhone 13 Pro"
    },
    {
      id: "TXN002",
      type: "Purchase",
      amount: "R 890",
      date: "2024-01-12",
      status: "Completed",
      description: "Samsung Galaxy Watch"
    },
    {
      id: "TXN003",
      type: "Sale",
      amount: "R 2,100",
      date: "2024-01-08",
      status: "Pending",
      description: "MacBook Pro"
    }
  ];

  // Mock listing interactions
  const listingInteractions = [
    {
      id: 1,
      title: "iPhone 14 Pro Max",
      views: 245,
      messages: 12,
      likes: 8,
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Gaming Setup Complete",
      views: 189,
      messages: 7,
      likes: 15,
      status: "Active",
      image:
        "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Vintage Guitar Collection",
      views: 156,
      messages: 4,
      likes: 22,
      status: "Sold",
      image:
        "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=100&h=100&fit=crop"
    }
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "grey.50"
      }}
    >
      <NavBar
        onLogout={handleLogout}
        searchQuery=""
        onSearchChange={() => {}}
        selectedLocation={addressData.suburb}
      />

      <Box sx={{ pt: 24, pb: 4 }}>
        <Container maxWidth="xl" sx={{ px: 2 }}>
          {/* Header */}
          <Box sx={{ mb: 3, display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              onClick={() => navigate("/")}
              sx={{ color: "primary.main" }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant={isMobile ? "h5" : "h4"} fontWeight="bold">
              My Profile
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* User Profile Card */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ mb: 3 }}>
                <CardContent sx={{ textAlign: "center", p: 3 }}>
                  <Box
                    sx={{
                      position: "relative",
                      display: "inline-block",
                      mb: 2
                    }}
                  >
                    <Avatar
                      src={userData.avatar}
                      sx={{ width: 120, height: 120, mx: "auto" }}
                    />
                    <IconButton
                      onClick={handleCameraClick}
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": { bgcolor: "primary.dark" }
                      }}
                      size="small"
                    >
                      <Camera size={16} />
                    </IconButton>
                    {/* Hidden file input */}
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleAvatarUpload}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                      mb: 1
                    }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      {userData.name}
                    </Typography>
                    {userData.verified && <Shield size={20} color="#4CAF50" />}
                  </Box>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Member since {userData.joinDate}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      mb: 3
                    }}
                  >
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                      >
                        {userData.rating}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Rating
                      </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ textAlign: "center" }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="primary"
                      >
                        {userData.totalListings}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Listings
                      </Typography>
                    </Box>
                  </Box>

                  <MuiButton
                    variant="outlined"
                    startIcon={<Edit size={16} />}
                    onClick={() => setIsEditing(!isEditing)}
                    fullWidth
                    sx={{ mb: 1 }}
                  >
                    Edit Profile
                  </MuiButton>

                  <MuiButton
                    variant="text"
                    startIcon={<Settings size={16} />}
                    fullWidth
                  >
                    Account Settings
                  </MuiButton>

                  <MuiButton
                    variant="outlined"
                    color="error"
                    startIcon={<Bell size={16} />}
                    onClick={handleLogout}
                    fullWidth
                    sx={{ mt: 1 }}
                  >
                    Sign out
                  </MuiButton>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card>
                <CardHeader title="Quick Stats" />
                <CardContent>
                  <Grid container spacing={2}>
                    {/* Total Views Stat */}
                    <Grid size={{ xs: 12 }}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #e9ecef"
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5
                          }}
                        >
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              backgroundColor: "#e3f2fd"
                            }}
                          >
                            <Eye size={20} color="#1976d2" />
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            Total Views
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="primary"
                        >
                          {userData.totalViews.toLocaleString()}
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Messages Stat */}
                    <Grid size={{ xs: 12 }}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #e9ecef"
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5
                          }}
                        >
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              backgroundColor: "#e8f5e9"
                            }}
                          >
                            <MessageCircle size={20} color="#388e3c" />
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            Messages
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="success.main"
                        >
                          {userData.totalMessages}
                        </Typography>
                      </Paper>
                    </Grid>

                    {/* Likes Received Stat */}
                    <Grid size={{ xs: 12 }}>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #e9ecef"
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5
                          }}
                        >
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: 2,
                              backgroundColor: "#fce4ec"
                            }}
                          >
                            <Heart size={20} color="#c2185b" />
                          </Box>
                          <Typography variant="body2" fontWeight="medium">
                            Likes Received
                          </Typography>
                        </Box>
                        <Typography
                          variant="h6"
                          fontWeight="bold"
                          color="error.main"
                        >
                          {userData.totalLikes}
                        </Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Main Content */}
            <Grid size={{ xs: 12, md: 8 }}>
              {/* User Information */}
              <Card sx={{ mb: 3 }}>
                <CardHeader
                  title="Personal Information"
                  action={
                    <IconButton onClick={() => setIsEditing(!isEditing)}>
                      <Edit size={20} />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 2
                        }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: "#e3f2fd"
                          }}
                        >
                          <Mail size={18} color="#1976d2" />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight="medium"
                        >
                          Email
                        </Typography>
                      </Box>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          defaultValue={userData.email}
                        />
                      ) : (
                        <Typography variant="body1">
                          {userData.email}
                        </Typography>
                      )}
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.5,
                          mb: 2
                        }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            backgroundColor: "#e8f5e9"
                          }}
                        >
                          <Phone size={18} color="#388e3c" />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          fontWeight="medium"
                        >
                          Phone
                        </Typography>
                      </Box>
                      {isEditing ? (
                        <TextField
                          fullWidth
                          variant="outlined"
                          size="small"
                          defaultValue={userData.phone}
                        />
                      ) : (
                        <Typography variant="body1">
                          {userData.phone}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Address Information */}
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Address Information" />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 1.5,
                      mb: 2
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: "#fff3e0",
                        mt: 0.25
                      }}
                    >
                      <MapPin size={18} color="#f57c00" />
                    </Box>
                    <Box>
                      <Typography variant="body1">
                        {addressData.streetNumber} {addressData.streetName}
                      </Typography>
                      <Typography variant="body1">
                        {addressData.suburb}, {addressData.city}
                      </Typography>
                      <Typography variant="body1">
                        {addressData.province}, {addressData.country}
                      </Typography>
                      <Typography variant="body1">
                        {addressData.postalCode}
                      </Typography>
                    </Box>
                  </Box>

                  {userLocation && (
                    <Typography variant="caption" color="text.secondary">
                      Location detected automatically • Accuracy:{" "}
                      {userLocation.accuracy}m
                    </Typography>
                  )}
                </CardContent>
              </Card>

              {/* Recent Transactions */}
              <Card sx={{ mb: 3 }}>
                <CardHeader title="Recent Transactions" />
                <CardContent>
                  {transactionData.map((transaction) => (
                    <Box
                      key={transaction.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 2,
                        borderBottom: "1px solid #eee"
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 2 }}
                      >
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor:
                              transaction.type === "Sale"
                                ? "#e8f5e8"
                                : "#f3e5f5"
                          }}
                        >
                          <DollarSign
                            size={18}
                            color={
                              transaction.type === "Sale"
                                ? "#4CAF50"
                                : "#9C27B0"
                            }
                          />
                        </Box>
                        <Box>
                          <Typography variant="body2" fontWeight="medium">
                            {transaction.description}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {transaction.date} • {transaction.type}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ textAlign: "right" }}>
                        <Typography variant="body2" fontWeight="bold">
                          {transaction.amount}
                        </Typography>
                        <Chip
                          label={transaction.status}
                          size="small"
                          color={
                            transaction.status === "Completed"
                              ? "success"
                              : "warning"
                          }
                          variant="outlined"
                        />
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>

              {/* Listing Interactions */}
              <Card>
                <CardHeader title="My Listings Performance" />
                <CardContent>
                  {listingInteractions.map((listing) => (
                    <Box
                      key={listing.id}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        py: 2,
                        borderBottom: "1px solid #eee"
                      }}
                    >
                      <Avatar
                        src={listing.image}
                        variant="rounded"
                        sx={{ width: 60, height: 60 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          fontWeight="medium"
                          sx={{ mb: 1 }}
                        >
                          {listing.title}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 3 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                            }}
                          >
                            <Eye size={14} color="#666" />
                            <Typography variant="caption">
                              {listing.views}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                            }}
                          >
                            <MessageCircle size={14} color="#666" />
                            <Typography variant="caption">
                              {listing.messages}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5
                            }}
                          >
                            <Heart size={14} color="#666" />
                            <Typography variant="caption">
                              {listing.likes}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Chip
                        label={listing.status}
                        size="small"
                        color={
                          listing.status === "Active" ? "primary" : "default"
                        }
                        variant="outlined"
                      />
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default ProfilePage;
