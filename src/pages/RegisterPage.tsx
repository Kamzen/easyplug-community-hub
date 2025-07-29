import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  userType: Yup.string().required("User type is required")
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    console.log("Registration data:", values);
    // In a real app, you'd send this to your backend
    alert("Registration successful! Please login.");
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2
      }}
    >
      <Container maxWidth="sm">
        <Button
          startIcon={<ArrowLeft />}
          onClick={() => navigate("/")}
          sx={{ mb: 2, color: "white" }}
        >
          Back to Home
        </Button>

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
                <Sparkles color="white" size={30} />
              </Box>
              <Typography variant="h4" fontWeight="bold" color="#667eea">
                Join EasyPlug
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Create your account and start connecting locally
              </Typography>
            </Box>

            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                userType: ""
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="name"
                    label="Full Name"
                    value={values.name}
                    onChange={handleChange}
                    error={touched.name && errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ mb: 3 }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ mb: 3 }}
                  />

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel>I want to</InputLabel>
                    <Select
                      name="userType"
                      value={values.userType}
                      onChange={handleChange}
                      label="I want to"
                      error={touched.userType && !!errors.userType}
                    >
                      <MenuItem value="buyer">Buy items</MenuItem>
                      <MenuItem value="seller">Sell items</MenuItem>
                      <MenuItem value="both">Both buy and sell</MenuItem>
                    </Select>
                  </FormControl>

                  <Field
                    as={TextField}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && errors.password}
                    helperText={touched.password && errors.password}
                    sx={{ mb: 3 }}
                  />

                  <Field
                    as={TextField}
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    error={touched.confirmPassword && errors.confirmPassword}
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
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
                    Create Account
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default RegisterPage;
