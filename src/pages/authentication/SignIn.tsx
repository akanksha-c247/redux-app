import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SignInFormData } from '../../utils/types';
import { addSignReducer } from '../../redux/Reducer/UserReducer';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { ERROR_LOGIN, FORGET_PASSWORD, HAVE_AN_ACCOUNT, HOME_PAGE, SIGN_IN, SIGN_UP, SIGN_UP_NAVIGATE } from '../../utils/constant';
import { Label } from '@mui/icons-material';

export const SignIn: React.FC = () => {
  const [formErrors, setFormErrors] = useState<Partial<SignInFormData>>({}); // State to store validation errors
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state?.USERS?.userList);
  console.log('users',useAppSelector((state) => state?.USERS));
  const handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const errors: Partial<SignInFormData> = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Invalid email format.';
    }
  
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters and contain a letter and a number.';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (users) {
        const loggedIn = users.find(
          (user) => user.email === formData.email && user.password === formData.password);      
        if (loggedIn) {
          dispatch(
            addSignReducer({
              email: formData.email,
              password: formData.password,
            })
          );
          navigate(HOME_PAGE);
        }    }
    }};
  
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
                'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        ></Box>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {SIGN_UP}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
            data-testid="handleSubmit"
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleInputChange}
              value={formData.email}
              helperText={formErrors.email} // Display validation error message
              error={!!formErrors.email} // Apply error style

            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleInputChange}
              helperText={formErrors.password} // Display validation error message
              error={!!formErrors.password} // Apply error style

            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {SIGN_IN}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="/forget-Password"
                  variant="body2"
                >
                  {FORGET_PASSWORD}?
                </Link>
              </Grid>
              <Grid item>
                <Link href={SIGN_UP_NAVIGATE} variant="body2">
                  {HAVE_AN_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
