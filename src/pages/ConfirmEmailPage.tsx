import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useConfirmEmail } from "../hooks/useConfirmEmail";
import { Box, Typography, CircularProgress } from "@mui/material";

export default function ConfirmEmailPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const confirmEmail = useConfirmEmail();

  useEffect(() => {
    if (token) {
      confirmEmail.mutate(token);
    }
    // eslint-disable-next-line
  }, [token]);

  return (
    <Box sx={{ mt: 8, textAlign: "center" }}>
      {confirmEmail.isPending && <CircularProgress />}
      {confirmEmail.isSuccess && (
        <Typography variant="h5" color="success.main">
          {confirmEmail.data && typeof confirmEmail.data === 'object' && 'message' in confirmEmail.data
            ? confirmEmail.data.message
            : "Email confirmed successfully!"}
        </Typography>
      )}
      {confirmEmail.isError && (
        <Typography variant="h5" color="error.main">
          {confirmEmail.error && typeof confirmEmail.error === 'object' && 'message' in confirmEmail.error
            ? (confirmEmail.error.message || "Email confirmation failed.")
            : "Email confirmation failed."}
        </Typography>
      )}
    </Box>
  );
}
