import {
  Box,
  Typography,
  Container,
  FormControl,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  GetSignUpErrorMessage,
  SignUp as SignUpToFirebase,
} from "../../services/firebase.js";
import FormError from "../../components/Forms/Error.js";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [snackBar, setSnackBar] = useState({ open: false, message: "" });
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  password.current = watch("password");

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { email, password } = values;
    try {
      await SignUpToFirebase(email, password);
    } catch (error) {
      const message = GetSignUpErrorMessage(error.code);
      setSnackBar({ open: true, message: message });
    } finally {
      setIsLoading(false);
    }
  };

  const onSnackBarClose = (value, reason) => {
    if (reason == "clickaway") {
      return;
    }

    setSnackBar({ open: false, message: "" });
  };

  return (
    <>
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "&::after": {
            position: "absolute",
            content: '""',
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "rgba(0, 0, 0, 0.4)",
            backgroundImage: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0.6) 0,
          rgba(0, 0, 0, 0) 60%,
          rgba(0, 0, 0, 0.8) 100%
        )`,
          },
        }}
      >
        <Image
          priority
          src="/__images/backdrop.jpg"
          layout="fill"
          objectFit="cover"
          alt="Backdrop Netflix"
        />
        <Container maxWidth="xs" sx={{ position: "relative", zIndex: 3, p: 6 }}>
          <Box sx={{ bgcolor: "common.white", p: 4, borderRadius: 2 }}>
            <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
              Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="email"
                  variant="filled"
                  {...register("email", { required: true })}
                />
                <FormError error={errors.email} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  variant="filled"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? "Hide" : "Show"}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", { required: true, minLength: 8 })}
                />
                <FormError error={errors.password} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  label="Konfirmasi Password"
                  variant="filled"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Button
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? "Hide" : "Show"}
                        </Button>
                      </InputAdornment>
                    ),
                  }}
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 8,
                    validate: (value) => value == password.current,
                  })}
                />
                <FormError error={errors.confirmPassword} />
              </FormControl>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <FormControlLabel
                  label="Setuju dengan syarat dan ketentuan"
                  control={
                    <Checkbox {...register("agreement", { required: true })} />
                  }
                />
                <FormError error={errors.agreement} />
              </FormControl>
              <Button
                disabled={isLoading}
                type="submit"
                variant="contained"
                size="large"
                fullWidth
              >
                {isLoading && <CircularProgress size={24} sx={{ mr: 1 }} />}{" "}
                Sign Up
              </Button>
            </form>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Link href="/" passHref>
                <Button color="primary" variant="text">
                  Sign in
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
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

export default SignUp;
