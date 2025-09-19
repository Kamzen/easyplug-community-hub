import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Stack,
  Chip
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocationAutoComplete from "../components/form-inputs/LocationAutoComplete";
import TextFieldWrapper from "../components/form-inputs/TextFieldWrapper";
import SelectFieldWrapper from "../components/form-inputs/SelectFieldWrapper";

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

const sellerTypes = [
  { value: "sole", label: "Sole Provider" },
  { value: "registered", label: "Registered Business" }
];

const StartSellingPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        py: { xs: 3, md: 6 }
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
            gap: { xs: 4, md: 6, lg: 8 }
          }}
        >
          <Box sx={{ flex: 1, color: "white", mb: { xs: 2, lg: 0 } }}>
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
              sx={{ lineHeight: 1.15 }}
            >
              Start Selling Today
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 3 }}>
              Join thousands of local sellers and grow your business with
              EasyPlug
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 4
              }}
            >
              {features.map((feature, index) => (
                <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
                  <CheckCircleIcon
                    sx={{ mr: 1, color: "#fff" }}
                    fontSize="small"
                  />
                  <Typography variant="body1">{feature}</Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.25)", mb: 3 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                How it works
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ mt: 1 }}
              >
                {[
                  "Create your profile",
                  "List your services",
                  "Start earning"
                ].map((step, idx) => (
                  <Paper
                    key={idx}
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "rgba(255,255,255,0.08)",
                      borderRadius: 2,
                      flex: 1,
                      color: "white"
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ mb: 0.5, opacity: 0.9 }}
                    >
                      Step {idx + 1}
                    </Typography>
                    <Typography variant="body2">{step}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Box>

            <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: "wrap" }}>
              <Chip
                icon={<SecurityOutlinedIcon sx={{ color: "inherit" }} />}
                label="Secure payments"
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
              />
              <Chip
                icon={<BoltOutlinedIcon sx={{ color: "inherit" }} />}
                label="Fast onboarding"
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
              />
              <Chip
                icon={<SupportAgentOutlinedIcon sx={{ color: "inherit" }} />}
                label="Support when you need"
                variant="outlined"
                sx={{ color: "white", borderColor: "rgba(255,255,255,0.4)" }}
              />
            </Stack>
          </Box>

          <Box sx={{ flex: 1 }}>
            <Card
              sx={{
                borderRadius: 4,
                boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                position: { lg: "sticky" },
                top: { lg: 24 }
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
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
                    sellerType: "sole",
                    name: "",
                    companyName: "",
                    registrationNumber: "",
                    email: "",
                    phone: "",
                    location: "",
                    profilePicture: null,
                    companyLogo: null,
                    otp: "",
                    otpRequested: false
                  }}
                  validationSchema={Yup.object().shape({
                    sellerType: Yup.string().required(
                      "Seller type is required"
                    ),
                    name: Yup.string().required("Name is required"),
                    companyName: Yup.string().when("sellerType", {
                      is: "registered",
                      then: (schema) =>
                        schema.required("Company name is required"),
                      otherwise: (schema) => schema.notRequired()
                    }),
                    registrationNumber: Yup.string().when("sellerType", {
                      is: "registered",
                      then: (schema) =>
                        schema.required("Registration number is required"),
                      otherwise: (schema) => schema.notRequired()
                    }),
                    email: Yup.string()
                      .email("Invalid email format")
                      .required("Email is required"),
                    phone: Yup.string().required("Phone number is required"),
                    location: Yup.string().required("Location is required"),
                    profilePicture: Yup.mixed().required(
                      "Profile picture is required"
                    ),
                    companyLogo: Yup.mixed().when("sellerType", {
                      is: "registered",
                      then: (schema) =>
                        schema.required("Company logo is required"),
                      otherwise: (schema) => schema.notRequired()
                    }),
                    otp: Yup.string().required("OTP is required"),
                    otpRequested: Yup.boolean().oneOf(
                      [true],
                      "You must request an OTP"
                    )
                  })}
                  onSubmit={(values) => {
                    console.log("Seller application:", values);
                    alert(
                      "Application submitted! We will review and get back to you within 24 hours."
                    );
                    navigate("/");
                  }}
                >
                  {({
                    errors,
                    touched,
                    values,
                    handleChange,
                    setFieldValue,
                    isSubmitting
                  }) => (
                    <Form>
                      <Box sx={{ mb: 3 }}>
                        <FormLabel
                          component="legend"
                          sx={{
                            mb: 2,
                            display: "block",
                            fontWeight: 500,
                            color: "text.primary",
                            fontSize: "0.875rem"
                          }}
                        >
                          What type of seller are you?
                        </FormLabel>
                        <RadioGroup
                          row
                          name="sellerType"
                          value={values.sellerType}
                          onChange={handleChange}
                          sx={{
                            display: "flex",
                            gap: 2,
                            "& .MuiFormControlLabel-root": {
                              margin: 0,
                              flex: 1,
                              minWidth: 150,
                              maxWidth: "50%"
                            },
                            "& .MuiRadio-root": {
                              display: "none"
                            },
                            "& .MuiFormControlLabel-label": {
                              width: "100%",
                              height: "100%",
                              margin: 0
                            }
                          }}
                        >
                          {sellerTypes.map((type) => (
                            <FormControlLabel
                              key={type.value}
                              value={type.value}
                              control={<Radio />}
                              label={
                                <Paper
                                  elevation={
                                    values.sellerType === type.value ? 3 : 1
                                  }
                                  sx={{
                                    p: 2,
                                    width: "100%",
                                    height: "100%",
                                    border: `2px solid ${
                                      values.sellerType === type.value
                                        ? "#667eea"
                                        : "#e0e0e0"
                                    }`,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease-in-out",
                                    "&:hover": {
                                      transform: "translateY(-2px)",
                                      boxShadow: 3,
                                      borderColor:
                                        values.sellerType === type.value
                                          ? "#667eea"
                                          : "#bdbdbd"
                                    },
                                    "&.Mui-focusVisible": {
                                      outline: "2px solid #667eea",
                                      outlineOffset: "2px"
                                    }
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      gap: 1
                                    }}
                                  >
                                    {type.value === "sole" ? (
                                      <PersonOutlineIcon
                                        fontSize="small"
                                        color={
                                          values.sellerType === type.value
                                            ? "primary"
                                            : undefined
                                        }
                                      />
                                    ) : (
                                      <BusinessCenterOutlinedIcon
                                        fontSize="small"
                                        color={
                                          values.sellerType === type.value
                                            ? "primary"
                                            : undefined
                                        }
                                      />
                                    )}
                                    <Typography
                                      variant="body1"
                                      sx={{
                                        fontWeight: 600,
                                        color:
                                          values.sellerType === type.value
                                            ? "#667eea"
                                            : "inherit",
                                        textAlign: "center"
                                      }}
                                    >
                                      {type.label}
                                    </Typography>
                                  </Box>
                                </Paper>
                              }
                              sx={{ m: 0, width: "100%" }}
                            />
                          ))}
                        </RadioGroup>
                      </Box>

                      <Divider sx={{ my: 3 }}>
                        <Typography variant="overline" color="text.secondary">
                          Personal details
                        </Typography>
                      </Divider>
                      <TextFieldWrapper
                        name="name"
                        label="Full Name"
                        sx={{ mb: 3 }}
                      />
                      {values.sellerType === "registered" && (
                        <>
                          <Divider sx={{ my: 1 }}>
                            <Typography
                              variant="overline"
                              color="text.secondary"
                            >
                              Business details
                            </Typography>
                          </Divider>
                          <TextFieldWrapper
                            name="companyName"
                            label="Company Name"
                            sx={{ mb: 3 }}
                          />
                          <TextFieldWrapper
                            name="registrationNumber"
                            label="Company Registration Number"
                            sx={{ mb: 3 }}
                          />
                        </>
                      )}
                      <Divider sx={{ my: 3 }}>
                        <Typography variant="overline" color="text.secondary">
                          Contact & location
                        </Typography>
                      </Divider>
                      <TextFieldWrapper
                        name="email"
                        label="Email"
                        type="email"
                        sx={{ mb: 3 }}
                      />
                      <TextFieldWrapper
                        name="phone"
                        label="Phone Number"
                        sx={{ mb: 3 }}
                      />
                      <Box sx={{ mb: 3 }}>
                        <LocationAutoComplete
                          setAddressInfor={(address) =>
                            setFieldValue(
                              "location",
                              address?.description || ""
                            )
                          }
                        />
                        {touched.location &&
                          typeof errors.location === "string" && (
                            <Typography color="error" variant="caption">
                              {errors.location}
                            </Typography>
                          )}
                      </Box>
                      <Divider sx={{ my: 3 }}>
                        <Typography variant="overline" color="text.secondary">
                          Verification
                        </Typography>
                      </Divider>
                      <Box sx={{ mb: 3 }}>
                        <FormLabel>Profile Picture (Camera Only)</FormLabel>
                        <TextFieldWrapper
                          name="profilePicture"
                          type="file"
                          inputProps={{
                            accept: "image/*",
                            capture: "environment"
                          }}
                          onChange={(e) =>
                            setFieldValue(
                              "profilePicture",
                              e.currentTarget.files
                                ? e.currentTarget.files[0]
                                : null
                            )
                          }
                        />
                        {touched.profilePicture &&
                          typeof errors.profilePicture === "string" && (
                            <Typography color="error" variant="caption">
                              {errors.profilePicture}
                            </Typography>
                          )}
                      </Box>
                      {values.sellerType === "registered" && (
                        <Box sx={{ mb: 3 }}>
                          <FormLabel>Company Logo</FormLabel>
                          <TextFieldWrapper
                            name="companyLogo"
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            onChange={(e) =>
                              setFieldValue(
                                "companyLogo",
                                e.currentTarget.files
                                  ? e.currentTarget.files[0]
                                  : null
                              )
                            }
                          />
                          {touched.companyLogo &&
                            typeof errors.companyLogo === "string" && (
                              <Typography color="error" variant="caption">
                                {errors.companyLogo}
                              </Typography>
                            )}
                        </Box>
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 3,
                          gap: 2
                        }}
                      >
                        <TextFieldWrapper
                          name="otp"
                          label="OTP"
                          sx={{ flex: 1 }}
                        />
                        <Button
                          variant="outlined"
                          onClick={() => setFieldValue("otpRequested", true)}
                          disabled={values.otpRequested}
                        >
                          {values.otpRequested ? "OTP Sent" : "Request OTP"}
                        </Button>
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
                              "linear-gradient(90deg, #764ba2 0%, #667eea 100%)"
                          }
                        }}
                        disabled={!values.otpRequested || isSubmitting}
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
