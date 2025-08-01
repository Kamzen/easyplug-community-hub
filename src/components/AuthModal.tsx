import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  TextField,
  Typography,
  Box,
  Divider
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import { useToast } from "../hooks/use-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AuthModal = ({ open, onOpenChange }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();
  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const AuthSchema = Yup.object().shape({
    name: Yup.string().when("isLogin", {
      is: false,
      then: (schema) => schema.required("Full Name is required"),
      otherwise: (schema) => schema.notRequired()
    }),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string().when("isLogin", {
      is: false,
      then: (schema) =>
        schema
          .required("Confirm Password is required")
          .oneOf([Yup.ref("password")], "Passwords must match"),
      otherwise: (schema) => schema.notRequired()
    })
  });

  return (
    <Dialog
      open={open}
      onClose={() => onOpenChange(false)}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: 700 }}>
        {isLogin ? "Login" : "Register"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon sx={{ fontSize: 24 }} />}
            sx={{
              mb: 2,
              borderRadius: 2,
              fontWeight: 700,
              textTransform: "none",
              bgcolor: "white",
              color: "#4285F4",
              borderColor: "#4285F4",
              boxShadow: 1,
              py: 1.2,
              fontSize: 16,
              "&:hover": { bgcolor: "#f5faff", borderColor: "#4285F4" }
            }}
            onClick={() => alert("Google authentication coming soon!")}
          >
            Continue with Google
          </Button>
          <Divider sx={{ my: 2 }}>or</Divider>
        </Box>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={AuthSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (isLogin) {
              try {
                const res = await loginMutation.mutateAsync({
                  email: values.email,
                  password: values.password,
                });
                localStorage.setItem("token", res.token);
                localStorage.setItem("user", JSON.stringify(res.user));
                toast({ title: "Login successful", description: `Welcome, ${res.user.name}!` });
                onOpenChange(false);
                window.location.reload();
              } catch (err: any) {
                toast({ title: "Login failed", description: err?.response?.data?.message || err.message, variant: "destructive" });
              } finally {
                setSubmitting(false);
              }
            } else {
              try {
                const res = await registerMutation.mutateAsync({
                  email: values.email,
                  password: values.password,
                  name: values.name,
                });
                toast({ title: "Registration successful", description: res.message });
                setIsLogin(true);
              } catch (err: any) {
                toast({ title: "Registration failed", description: err?.response?.data?.message || err.message, variant: "destructive" });
              } finally {
                setSubmitting(false);
              }
            }
          }}
          enableReinitialize
        >
          {({ errors, touched, handleChange, values, isSubmitting }) => (
            <Form style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {!isLogin && (
                <TextField
                  label="Full Name"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  fullWidth
                  required={!isLogin}
                  autoComplete="name"
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
              )}
              <TextField
                label="Email"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                fullWidth
                required
                autoComplete="email"
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                fullWidth
                required
                autoComplete={isLogin ? "current-password" : "new-password"}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
              />
              {!isLogin && (
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  fullWidth
                  required={!isLogin}
                  autoComplete="new-password"
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword
                  )}
                  helperText={touched.confirmPassword && errors.confirmPassword}
                />
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ fontWeight: 700, borderRadius: 2, py: 1.2, fontSize: 16 }}
                disabled={isSubmitting || loginMutation.isPending}
              >
                {isLogin
                  ? (loginMutation.isPending ? "Logging in..." : "Login")
                  : (registerMutation.isPending ? "Registering..." : "Register")}
              </Button>
              <Box sx={{ textAlign: "center", mt: 1 }}>
                <Button
                  type="button"
                  variant="text"
                  onClick={() => setIsLogin(!isLogin)}
                  sx={{ fontSize: 14, fontWeight: 500 }}
                >
                  {isLogin
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
