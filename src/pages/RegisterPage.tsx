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
import GoogleIcon from "@mui/icons-material/Google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { getUserInfoQuery } from "@/services/authQueries";
import SelectFieldWrapper from "@/components/forms/SelectFieldWrapper";
import TextFieldWrapper from "@/components/forms/TextFieldWrapper";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  userType: string;
};

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
  const queryClient = useQueryClient();
  const registerMutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      email: string;
      password: string;
      userType?: string;
    }) => authService.register(payload),
    onSuccess: ({ user }) => {
      localStorage.setItem("user", JSON.stringify(user));
    }
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      await registerMutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
        userType: values.userType
      });
      // Try to populate user from /auth/me in case token is issued
      try {
        const me = await queryClient.fetchQuery(getUserInfoQuery());
        localStorage.setItem("user", JSON.stringify(me));
      } catch (err) {
        console.warn("/auth/me after register failed:", err);
      }
      navigate("/login");
    } catch (e) {
      // Optionally show error UI
      console.error(e);
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
                onClick={() => alert("Google registration coming soon!")}
              >
                Register with Google
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
                  <TextFieldWrapper
                    name="name"
                    label="Full Name"
                    sx={{ mb: 3 }}
                  />

                  <TextFieldWrapper
                    name="email"
                    label="Email"
                    type="email"
                    sx={{ mb: 3 }}
                  />

                  <SelectFieldWrapper
                    name="userType"
                    label="I want to"
                    options={[
                      { value: "buyer", label: "Buy items" },
                      { value: "seller", label: "Sell items" },
                      { value: "both", label: "Both buy and sell" }
                    ]}
                    sx={{ mb: 3 }}
                  />

                  <TextFieldWrapper
                    name="password"
                    label="Password"
                    type="password"
                    sx={{ mb: 3 }}
                  />

                  <TextFieldWrapper
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
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
                    disabled={registerMutation.isPending}
                  >
                    {registerMutation.isPending
                      ? "Creating..."
                      : "Create Account"}
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
