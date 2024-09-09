import { useUser } from "../context/user.js";
import { useRouter } from "next/router";

import React from "react";

const withProtected = (Pages) => {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const user = useUser();
    const { uid } = user;
    const router = useRouter();

    if (!uid) {
      router.replace("/");
      return <></>;
    }

    return <Pages {...props} />;
  };
};

export default withProtected;
