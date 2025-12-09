import { useNotificationValue } from "../context/NotificationContext";

const Notification = () => {
  const notification = useNotificationValue();

  if (notification === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;
