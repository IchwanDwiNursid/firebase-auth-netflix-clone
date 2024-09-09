import { useEffect, useState } from "react";
import { Authentication } from "../services/firebase.js";
import { CircularProgress } from "@mui/material";
import { useUser, initialUserState } from "./user.js";

const AuthStateChangeProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { SetUser } = useUser();
  const initiateAuthStateChange = () => {
    Authentication().onAuthStateChanged((user) => {
      if (user) {
        console.log("User is authenticated");
        SetUser(user);
      } else {
        console.log("User is not authenticated");
        SetUser(initialUserState);
      }

      setIsLoading(false);
    });
  };

  useEffect(() => {
    initiateAuthStateChange();
  }, []);

  if (isLoading) {
    return <CircularProgress />;
  }

  return children;
};

export default AuthStateChangeProvider;
