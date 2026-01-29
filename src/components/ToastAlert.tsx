import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Slide, { SlideProps } from "@mui/material/Slide";

function SlideTransition(props: Omit<SlideProps, "direction">) {
  return <Slide {...props} direction="down" />;
}

export default function ToastAlert({
  open,
  severity = "info",
  message = "",
  onClose,
  autoHideDuration = 4000
}: {
  open: boolean;
  severity?: "success" | "info" | "warning" | "error";
  message?: string;
  onClose: (
    event: Event | React.SyntheticEvent<unknown, Event> | undefined,
    reason?: string
  ) => void;
  autoHideDuration?: number;
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={SlideTransition}
    >
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
