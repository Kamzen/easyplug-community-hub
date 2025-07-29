import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Paper
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";

interface LoginCredentials {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

// Dummy user data
const dummyUsers = {
  "user@example.com": { password: "user123", role: "user", name: "John Doe" },
  "seller@example.com": {
    password: "seller123",
    role: "seller",
    name: "Jane Smith"
  },
  "admin@example.com": {
    password: "admin123",
    role: "admin",
    name: "Admin User"
  }
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState("");

  const handleSubmit = (values: LoginCredentials) => {
    const user = dummyUsers[values.email as keyof typeof dummyUsers];

    if (user && user.password === values.password) {
      // Store user data in localStorage (in a real app, use proper auth)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: values.email,
          role: user.role,
          name: user.name
        })
      );

      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "seller":
          navigate("/seller-dashboard");
          break;
        default:
          navigate("/user-dashboard");
      }
    } else {
      setError("Invalid email or password");
    }
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
                Welcome Back
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to your EasyPlug account
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <Paper
              elevation={0}
              sx={{ p: 3, bgcolor: "#f5f5f5", borderRadius: 2, mb: 3 }}
            >
              <Typography variant="h6" gutterBottom>
                Demo Accounts:
              </Typography>
              <Typography variant="body2">
                👤 User: user@example.com / user123
              </Typography>
              <Typography variant="body2">
                🏪 Seller: seller@example.com / seller123
              </Typography>
              <Typography variant="body2">
                ⚙️ Admin: admin@example.com / admin123
              </Typography>
            </Paper>

            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, values, handleChange }) => (
                <Form>
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
                    Sign In
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

export default LoginPage;
