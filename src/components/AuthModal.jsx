import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme, alpha } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import TextFieldWrapper from "@/components/form-inputs/TextFieldWrapper";
import DOBPicker from "@/components/form-inputs/DOBPicker";
import GoogleIcon from "@mui/icons-material/Google";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import ToastAlert from "@/components/ToastAlert";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Box,
  Divider,
  Avatar
} from "@mui/material";
import { Lock } from "@mui/icons-material";

export const AuthModal = ({ open, onOpenChange }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info"
  });
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const loginMutation = useMutation({
    mutationFn: async (payload) => authService.login(payload),
    onSuccess: (data) => {
      if (data?.token) localStorage.setItem("token", data.token);
      setToast({
        open: true,
        severity: "success",
        message: data?.message || "Signed in successfully"
      });
      setTimeout(() => onOpenChange(false), 700);
    },
    onError: (err) => {
      const e = err || {};
      const msg = e?.response?.data?.message || e?.message || "Login failed";
      setToast({ open: true, severity: "error", message: msg });
    }
  });
  const registerMutation = useMutation({
    mutationFn: async (payload) => authService.register(payload),
    onSuccess: (data) => {
      if (data?.token) localStorage.setItem("token", data.token);
      setToast({
        open: true,
        severity: "success",
        message: data?.message || "Registered successfully"
      });
      setTimeout(() => onOpenChange(false), 700);
    },
    onError: (err) => {
      const e = err || {};
      const msg = e?.response?.data?.message || e?.message || "Registration failed";
      setToast({ open: true, severity: "error", message: msg });
    }
  });

  useEffect(() => {
    if (loginMutation.isPending || registerMutation.isPending) {
      setOpenBackDrop(true);
    } else {
      setOpenBackDrop(false);
    }
  }, [loginMutation.isPending, registerMutation.isPending]);

  // Calculate the max date for DOB (must be at least 16 years old)
  const today = new Date();
  const maxDOB = new Date(
    today.getFullYear() - 16,
    today.getMonth(),
    today.getDate()
  );

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
    }),
    dob: Yup.date()
      .nullable()
      .when("isLogin", {
        is: false,
        then: (schema) =>
          schema
            .required("Date of Birth is required")
            .max(maxDOB, "You must be at least 16 years old"),
        otherwise: (schema) => schema.notRequired()
      })
  });

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: `linear-gradient(135deg, ${alpha(
            "#fff",
            0.97
          )} 0%, ${alpha("#f8f9fa", 0.97)} 100%)`,
          backdropFilter: "blur(20px)"
        }
      }}
      sx={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
        paddingLeft: "env(safe-area-inset-left)",
        paddingRight: "env(safe-area-inset-right)"
      }}
    >
      <DialogTitle
        sx={{
          p: 4,
          pb: 2,
          background: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`,
          color: "white",
          position: "relative"
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 16,
            top: 16,
            color: "white",
            "&:hover": {
              background: alpha("#fff", 0.1)
            }
          }}
        >
          <CloseIcon />
        </IconButton>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: alpha("#fff", 0.2),
              color: "white"
            }}
          >
            <Lock sx={{ fontSize: 28 }} />
          </Avatar>
          <Box>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
              {isLogin ? "Sign In" : "Register"}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {isLogin
                ? "Sign in to your account to continue."
                : "Create a new account to get started."}
            </Typography>
          </Box>
        </Stack>
      </DialogTitle>
      <DialogContent sx={{ p: 4, pt: 6, mt: 3 }}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            dob: null
          }}
          validationSchema={AuthSchema}
          onSubmit={(values) => {
            if (isLogin) {
              loginMutation.mutate({
                email: values.email,
                password: values.password
              });
            } else {
              registerMutation.mutate({
                name: values.name,
                email: values.email,
                password: values.password,
                dob: values.dob
              });
            }
          }}
          enableReinitialize
        >
          {() => (
            <Form>
              <Stack spacing={3}>
                {!isLogin && (
                  <>
                    <TextFieldWrapper
                      label="Full Name"
                      name="name"
                      autoComplete="name"
                    />
                    <DOBPicker
                      name="dob"
                      label="Date of Birth"
                      maxDate={maxDOB}
                      disableFuture
                    />
                  </>
                )}
                <TextFieldWrapper
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
                <TextFieldWrapper
                  label="Password"
                  name="password"
                  type="password"
                  required
                  autoComplete={isLogin ? "current-password" : "new-password"}
                />
                {!isLogin && (
                  <TextFieldWrapper
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    required={!isLogin}
                    autoComplete="new-password"
                  />
                )}
              </Stack>
              <DialogActions sx={{ p: 0, mt: 4, justifyContent: "center" }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      minWidth: 120
                    }}
                    disabled={
                      loginMutation.isPending || registerMutation.isPending
                    }
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      borderRadius: 2,
                      px: 4,
                      py: 1.5,
                      minWidth: 160,
                      background: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`,
                      color: "#fff",
                      "&:hover": {
                        background: `linear-gradient(90deg, #667eea 0%, #764ba2 100%)`,
                        filter: "brightness(1.05)"
                      }
                    }}
                    disabled={
                      loginMutation.isPending || registerMutation.isPending
                    }
                  >
                    {loginMutation.isPending || registerMutation.isPending
                      ? isLogin
                        ? "Logging in..."
                        : "Registering..."
                      : isLogin
                      ? "Login"
                      : "Register"}
                  </Button>
                </Stack>
              </DialogActions>
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Button
                  type="button"
                  variant="text"
                  onClick={() => setIsLogin(!isLogin)}
                  sx={{ fontSize: 14, fontWeight: 500 }}
                  disabled={
                    loginMutation.isPending || registerMutation.isPending
                  }
                >
                  {isLogin
                    ? "Don't have an account? Register"
                    : "Already have an account? Login"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Backdrop
          sx={{
            color: "#fff",
            pointerEvents: "none",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            borderRadius: 4
          }}
          open={openBackDrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </DialogContent>
      <ToastAlert
        open={toast.open}
        message={toast.message}
        severity={toast.severity}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
      />
    </Dialog>
  );
};
