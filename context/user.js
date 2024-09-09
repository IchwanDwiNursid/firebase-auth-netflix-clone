import { useContext, createContext, useState } from "react";

export const initialUserState = {
  email: null,
  uid: null,
};

export const UserContext = createContext(initialUserState);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userState, setUserState] = useState(initialUserState);

  const SetUser = (userCredentials) => {
    setUserState({ ...userCredentials });
  };

  console.log({ userState });

  const ResetUser = () => {
    setUserState(initialUserState);
  };

  return (
    <UserContext.Provider value={{ ...userState, SetUser, ResetUser }}>
      {children}
    </UserContext.Provider>
  );
};
