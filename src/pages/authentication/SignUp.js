import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { addSignupReducer } from "../../redux/Reducer/UserReducer";
import { useAppDispatch, useAppNavigate } from "../../redux/reduxHooks";

export const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch();
  const navigate = useAppNavigate();

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const userData = {
      customId:1,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,

    };

    // const storedData = localStorage.getItem('storeLoginDetails');
    // const existingData = storedData ? JSON.parse(storedData) : {};

    // const updatedData = { ...existingData, ...userData };
    // localStorage.setItem('storeLoginDetails', JSON.stringify(updatedData));
    dispatch(addSignupReducer(userData));
    navigate('/')
  };
  
  return (
    <div>
        {/* <ToastContainer /> */}
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              data-testId="handleSubmit"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    data-testId="firstNameTest"
                    // error={errors.firstName}
                  />
                  {/* {errors.firstName && (
                <Typography variant="caption" color="error">
                  Please enter your first name.
                </Typography>
              )} */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData?.lastName}
                    onChange={handleInputChange}
                    data-testId="LastName"

                  />
                  {/* {errors.lastName && (
                <Typography variant="caption" color="error">
                  Please enter your last name.
                </Typography>
              )} */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleInputChange}
                    value={formData.email}
                    data-testId="email"
                  />
                  {/* {errors.email && (
                <Typography variant="caption" color="error">
                  Please enter your Email.
                </Typography>
              )} */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleInputChange}
                    data-testId="password"
                  />
                  {/* {errors.password && (
                <Typography variant="caption" color="error">
                  Please enter your Password.
                </Typography>
              )} */}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
    </div>
  );
};
