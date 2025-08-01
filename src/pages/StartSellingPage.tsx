import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useCreateStore } from "../hooks/useCreateStore";
import { useToast } from "../hooks/use-toast";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const validationSchema = Yup.object({
  businessName: Yup.string().required("Business name is required"),
  description: Yup.string().required("Business description is required"),
});

const features = [
  "Set up your online store in minutes",
  "Reach thousands of local customers",
  "Secure payment processing",
  "Real-time chat with buyers",
  "Analytics and sales tracking",
  "Mobile-friendly seller dashboard",
];



const StartSellingPage = () => {
  const navigate = useNavigate();

  type SellerApplicationValues = {
    businessName: string;
    description: string;
  };


  const { toast } = useToast();
  const createStore = useCreateStore();

  const handleSubmit = async (values: SellerApplicationValues, { setSubmitting }: any) => {
    try {
      // For demo, using dummy lat/lng. Replace with real geocoding if needed.
      const payload = {
        name: values.businessName,
        latitude: -26.2041,
        longitude: 28.0473,
        description: values.description,
        image: null, // Add file upload logic if needed
      };
      await createStore.mutateAsync(payload);
      toast({ title: "Store created!", description: "Your store is now live." });
      navigate("/");
    } catch (err: any) {
      toast({ title: "Store creation failed", description: err?.response?.data?.message || err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 4, color: "white" }}
        >
          Back to Home
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: 8,
          }}
        >
          <Box sx={{ flex: 1, color: "white", mb: 4 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              Start Selling Today
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>
              Join thousands of local sellers and grow your business with
              EasyPlug
            </Typography>

            <Box sx={{ mb: 4 }}>
              {features.map((feature, index) => (
                <Box
                  key={index}
                  sx={{ display: "flex", alignItems: "center", mb: 2 }}
                >
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#fff" }}
                    fontSize="small"
                  />
                  <Typography variant="body1">{feature}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card
              sx={{ borderRadius: 4, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ textAlign: "center", mb: 4 }}>
                  <Box
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      background:
                        "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                      mb: 2,
                    }}
                  >
                    <StorefrontIcon sx={{ color: "white", fontSize: 30 }} />
                  </Box>
                  <Typography variant="h5" fontWeight="bold" color="#667eea">
                    Seller Application
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tell us about your business
                  </Typography>
                </Box>

                <Formik
                  initialValues={{
                    businessName: "",
                    description: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          Business Name
                        </Typography>
                        <input
                          name="businessName"
                          type="text"
                          style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                          required
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <Typography variant="subtitle1" sx={{ mb: 1 }}>
                          Business Description
                        </Typography>
                        <textarea
                          name="description"
                          style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
                          rows={4}
                          required
                        />
                      </Box>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        sx={{
                          background:
                            "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
                          borderRadius: 3,
                          py: 1.5,
                          fontSize: "1.1rem",
                          fontWeight: "bold",
                          textTransform: "none",
                          "&:hover": {
                            background:
                              "linear-gradient(90deg, #764ba2 0%, #667eea 100%)",
                          },
                        }}
                        disabled={isSubmitting}
                      >
                        Create Store
                      </Button>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default StartSellingPage;
