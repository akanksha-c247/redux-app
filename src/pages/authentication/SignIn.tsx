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
  const [error,setError]=useState<string | null>(null);
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: '',
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state?.USERS?.userList);

  const handleInputChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    setError(null);
    e.preventDefault();
    if (users) {
      const loggedIn = users.find(
        (user) => user.email === formData.email && user.password === formData.password);      
      if (loggedIn) {
        dispatch(
          addSignReducer({
            email: formData.email,
            customId: loggedIn.customId,
            firstName: loggedIn.firstName,
            lastName: loggedIn.lastName,
            id: 0,
            password: '',
            userId: 0,
            title: '',
            completed: false,
          })
        );
        navigate(HOME_PAGE);
      } else {
        setError(ERROR_LOGIN);
      }
    }
  };
  
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
            {error?<Label>{ERROR_LOGIN}</Label>:null}  
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
