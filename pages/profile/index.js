import React from "react";
import AuthLayout from "../../components/Layout/Authenticated.js";
import withProtected from "../../hoc/withProtected.js";

const Profile = () => {
  return <AuthLayout title="profile">Profile</AuthLayout>;
};

export default withProtected(Profile);
