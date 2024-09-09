import { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Link from "next/link.js";
import { useForm } from "react-hook-form";
import FormError from "../../Forms/Error.js";
import { SignIn, GetSignInErrorMessage } from "../../../services/firebase.js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "common.white",
  boxShadow: 24,
  p: 4,
};

const LoginModal = ({ open, CloseModal }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [snackBar, setSnackBar] = useState({ open: false, message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { email, password } = values;

    try {
      await SignIn(email, password);
    } catch (error) {
      const message = GetSignInErrorMessage(error.code);
      console.log("message : " + message);
      setSnackBar({ open: true, message: message });
    } finally {
      setIsLoading(false);
    }
  };

  const onSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBar({ open: false, message: "" });
  };

  return (
    <>
      <Modal open={open} onClose={CloseModal}>
        <Box sx={style}>
          <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
            Sign in
          </Typography>
          <Grid sx={{ mb: 2 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl sx={{ mb: 2 }} fullWidth>
                <TextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email atau nomor telepon"
                  variant="filled"
                  {...register("email", { required: true })}
                />
                <FormError error={errors.email} />
              </FormControl>
              <FormControl sx={{ mb: 4 }} fullWidth>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="filled"
                  {...register("password", { required: true, minLength: 5 })}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormError error={errors.password} />
              </FormControl>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                {isLoading && <CircularProgress size={24} sx={{ mr: 1 }} />}
                Sign in
              </Button>
            </form>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 1 }}
          >
            <Box>
              <Checkbox />
              <Typography variant="caption">Remember me</Typography>
            </Box>
            <Typography variant="caption" component="a" href="#">
              Need help ?
            </Typography>
          </Grid>
          <Grid container alignItems="center" sx={{ mb: 2 }}>
            <Image
              src="/__images/facebook.png"
              height={20}
              width={20}
              layout="fixed"
              alt="Facbook Login"
            />
            <Typography variant="caption" component="a" href="#" sx={{ ml: 1 }}>
              Login with Facebook
            </Typography>
          </Grid>
          <Grid>
            <Typography variant="body1" component="span">
              New to Netflix?
            </Typography>
            <Link href="signup" passHref>
              <Typography
                variant="body1"
                color="primary"
                component="a"
                href="#"
              >
                &nbsp;Sign up now.
              </Typography>
            </Link>
          </Grid>
          <Grid>
            <Typography variant="caption">
              This page is protected by Google reCAPTCHA to ensure you are not a
              bot.
            </Typography>
            <Typography
              variant="caption"
              color="primary"
              component="a"
              href="#"
            >
              Learn more.
            </Typography>
          </Grid>
        </Box>
      </Modal>
      <Snackbar
        open={snackBar.open}
        autoHideDuration={5000}
        onClose={onSnackBarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={onSnackBarClose}
          severity="error"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackBar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoginModal;
