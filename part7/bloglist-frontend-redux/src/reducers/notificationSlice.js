import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, type: null };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(_, action) {
      return action.payload;
    },
    clearNotification() {
      return initialState;
    },
  },
});

let timeoutId;

export const showNotification = (notification) => (dispatch) => {
  dispatch(setNotification(notification));

  if (timeoutId) {
    clearTimeout(timeoutId);
  }

  timeoutId = setTimeout(() => {
    dispatch(clearNotification());
    timeoutId = null;
  }, 5000);
};

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
