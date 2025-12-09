import { createContext, useContext, useReducer, useRef } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "HIDE":
      return null;
    default:
      return state;
  }
};

export const NotificationContextProvider = ({ children }) => {
  const [notification, dispatch] = useReducer(notificationReducer, null);
  const timeoutIdRef = useRef(null);

  const notify = (payload) => {
    dispatch({ type: "SHOW", payload });

    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }

    timeoutIdRef.current = setTimeout(() => {
      dispatch({ type: "HIDE" });
      timeoutIdRef.current = null;
    }, 5000);
  };

  return (
    <NotificationContext.Provider
      value={{ notification, dispatch, notify }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const { notification } = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const { dispatch } = useContext(NotificationContext);
  return dispatch;
};

export const useNotify = () => {
  const { notify } = useContext(NotificationContext);
  return notify;
};

export default NotificationContext;
