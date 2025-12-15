import {
  useNotificationDispatch,
  useNotificationValue,
} from "../context/NotificationContext";
import { Snackbar, Alert } from "@mui/material";

const Notification = () => {
  const notification = useNotificationValue();
  const dispatch = useNotificationDispatch();

  const open = notification !== null;

  const severity =
    notification?.type === "error"
      ? "error"
      : notification?.type === "info"
        ? "info"
        : "success";

  const handleClose = (_event, reason) => {
    if (reason === "clickaway") return;
    dispatch({ type: "HIDE" });
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      sx={{ mt: 7 }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {notification?.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
