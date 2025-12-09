import { createContext, useContext, useReducer } from "react";

const UserContext = createContext();

const userReducer = (_state, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return null;
    default:
      return _state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const { user } = useContext(UserContext);
  return user;
};

export const useUserDispatch = () => {
  const { dispatch } = useContext(UserContext);
  return dispatch;
};

export default UserContext;
