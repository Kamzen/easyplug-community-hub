import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper,
  Icon,
  Divider
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const validationSchema = Yup.object({
  businessName: Yup.string().required("Business name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  description: Yup.string().required("Business description is required")
});

const features = [
  "Set up your online store in minutes",
  "Reach thousands of local customers",
  "Secure payment processing",
  "Real-time chat with buyers",
  "Analytics and sales tracking",
  "Mobile-friendly seller dashboard"
];

const StartSellingPage = () => {
  const navigate = useNavigate();

  type SellerApplicationValues = {
    businessName: string;
    email: string;
    phone: string;
    description: string;
  };

  const handleSubmit = (values: SellerApplicationValues) => {
    console.log("Seller application:", values);
    alert(
      "Application submitted! We will review and get back to you within 24 hours."
    );
    navigate("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        py: 4
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
            gap: 8
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
                      mb: 2
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
                    email: "",
                    phone: "",
                    description: ""
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, values, handleChange }) => (
                    <Form>
                      <Field
                        as={TextField}
                        fullWidth
                        name="businessName"
                        label="Business Name"
                        value={values.businessName}
                        onChange={handleChange}
                        error={Boolean(
                          touched.businessName && errors.businessName
                        )}
                        helperText={touched.businessName && errors.businessName}
                        sx={{ mb: 3 }}
                      />

                      <Field
                        as={TextField}
                        fullWidth
                        name="email"
                        label="Business Email"
                        type="email"
                        value={values.email}
                        onChange={handleChange}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                        sx={{ mb: 3 }}
                      />

                      <Field
                        as={TextField}
                        fullWidth
                        name="phone"
                        label="Phone Number"
                        value={values.phone}
                        onChange={handleChange}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                        sx={{ mb: 3 }}
                      />

                      <Field
                        as={TextField}
                        fullWidth
                        multiline
                        rows={4}
                        name="description"
                        label="Business Description"
                        value={values.description}
                        onChange={handleChange}
                        error={Boolean(
                          touched.description && errors.description
                        )}
                        helperText={touched.description && errors.description}
                        sx={{ mb: 4 }}
                      />

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
                              "linear-gradient(90deg, #764ba2 0%, #667eea 100%)"
                          }
                        }}
                      >
                        Submit Application
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
