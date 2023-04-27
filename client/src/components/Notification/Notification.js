import React, { useState, useEffect } from "react";
import { Snackbar, Stack, Alert } from "@mui/material";

const Notification = ({ message, severity, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={() => {
        setOpen(false);
        onClose();
      }}
    >
      <Stack sx={{ width: "100%" }} spacing={2}>
        <Alert severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Stack>
    </Snackbar>
  );
};

export default Notification;
