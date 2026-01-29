import React from "react";
import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Paper
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowLeft } from "lucide-react";
import GoogleIcon from "@mui/icons-material/Google";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import ToastAlert from "@/components/ToastAlert";

interface LoginCredentials {
  email: string;
  password: string;
}

type LoginResult = {
  token?: string;
  accessToken?: string;
  message?: string;
};

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required")
});

const LoginPage = () => {
  const navigate = useNavigate();
  // Single toast state powered by ToastAlert component
  const [toast, setToast] = React.useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  }>({ open: false, message: "", severity: "info" });
  const loginMutation = useMutation<LoginResult, unknown, LoginCredentials>({
    mutationFn: async (payload: LoginCredentials) => authService.login(payload),
    onSuccess: (data) => {
      const token = data?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      const successMsg = data?.message || "Signed in successfully";
      setToast({ open: true, severity: "success", message: successMsg });
      // If you want to navigate shortly after so the user sees the toast, uncomment below:
      // setTimeout(() => navigate("/user-dashboard"), 700);
    },
    onError: (err: unknown) => {
      console.error("Login failed", err);
      const e = err as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      const msg = e?.response?.data?.message || e?.message || "Login failed";
      setToast({ open: true, severity: "error", message: msg });
    }
  });

  // no separate submit handler; we'll call mutate inline in Formik onSubmit

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
              <Button
                variant="outlined"
                fullWidth
                startIcon={<GoogleIcon />}
                sx={{
                  mb: 2,
                  borderRadius: 3,
                  fontWeight: "bold",
                  textTransform: "none",
                  bgcolor: "white",
                  color: "#4285F4",
                  borderColor: "#4285F4",
                  "&:hover": { bgcolor: "#f5f5f5", borderColor: "#4285F4" }
                }}
                onClick={() => alert("Google login coming soon!")}
              >
                Login with Google
              </Button>
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

            {/* Errors and success messages are surfaced via ToastAlert below */}

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
              onSubmit={(values) => loginMutation.mutate(values)}
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
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? "Signing in..." : "Sign In"}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
        <ToastAlert
          open={toast.open}
          message={toast.message}
          severity={toast.severity}
          onClose={() => setToast((t) => ({ ...t, open: false }))}
        />
      </Container>
    </Box>
  );
};

export default LoginPage;
