import {
  AppBar,
  Box,
  ButtonBase,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React from "react";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { SignOut } from "../../services/firebase.js";

const AuthLayout = ({ children, title }) => {
  const defaultTitle = `Netflix`;
  const pageTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <AppBar>
        <Toolbar>
          <Typography sx={{ flex: 1 }}>Netflix</Typography>
          <ButtonBase sx={{ padding: 2 }} onClick={SignOut}>
            <ExitToAppIcon />
            <Typography sx={{ ml: 1 }}>Sign Out</Typography>
          </ButtonBase>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ pt: "64px" }}>
        <Container maxWidth="md">{children}</Container>
      </Box>
    </>
  );
};

export default AuthLayout;
