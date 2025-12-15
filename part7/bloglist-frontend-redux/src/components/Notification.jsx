import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification.message) {
    return null;
  }

  const variant = notification.type === "error" ? "danger" : "info";

  return (
    <Alert variant={variant} className="shadow-sm">
      {notification.message}
    </Alert>
  );
};

export default Notification;
