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
import Container from '@mui/material/Container';
import { addSignupReducer } from '../../redux/Reducer/UserReducer';
import { useAppDispatch } from '../../redux/reduxHooks';
import { SignUpFormData, Todo } from '../../utils/types';
import { useNavigate } from 'react-router-dom';
import { DONT_HAVE_AN_ACCOUNT, SIGN_IN_NAVIGATE, SIGN_UP } from '../../utils/constant';

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agreeTerms:false,
  });
  const [formErrors, setFormErrors] = useState<Partial<SignUpFormData>>({}); // State to store validation errors
  const [agreeTermsError, setAgreeTermsError] = useState<string>(''); // Separate state for agreeTerms error
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleInputChange = ({ target: { name, value, checked } }: React.ChangeEvent<HTMLInputElement>) => {
    if (name === 'agreeTerms') {
      setAgreeTermsError(checked ? '' : 'You must agree to the terms.');
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked, // Update the value for the agreeTerms checkbox
      }));
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  const validateForm = () => {
    const errors: Partial<SignUpFormData> = {};
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!formData.firstName) {
      errors.firstName = 'First name is required.';
    }
    if (!formData.lastName) {
      errors.lastName = 'Last name is required.';
    }
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
  
    if (!formData.agreeTerms) {
      errors.agreeTerms = 'You must agree to the terms.';
      setAgreeTermsError('You must agree to the terms.'); // Update the agreeTermsError state
    } else {
      setAgreeTermsError(''); // Clear the agreeTermsError state
    }  

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const userDataSet:Todo = {
        customId: 1,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        id: 0,
        userId: 0,
        title: '',
        completed: false,
        data: [],
        error: '',
      };

      dispatch(addSignupReducer(userDataSet));
      navigate(SIGN_IN_NAVIGATE);
    }
  };
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
            data-testid="handleSubmit"
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
                  data-testid="firstNameTest"
                  helperText={formErrors.firstName} // Display validation error message
                  error={!!formErrors.firstName} // Apply error style      
                />
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
                  data-testid="LastName"
                  helperText={formErrors.lastName} // Display validation error message
                  error={!!formErrors.lastName} // Apply error style
      
                />
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
                  data-testid="email"
                  helperText={formErrors.email} // Display validation error message
                  error={!!formErrors.email} // Apply error style
      
                />
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
                  data-testid="password"
                  helperText={formErrors.password} // Display validation error message
                  error={!!formErrors.password} // Apply error style
      
                />
              </Grid>
              <Grid item xs={12}>
                <Typography color={agreeTermsError ? 'error' : 'initial'}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="allowExtraEmails"
                        color="primary"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        data-testid="agreeTerms"
                      />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Typography>
                {agreeTermsError && (
                  <Typography variant="caption" color="error">
                    {agreeTermsError}
                  </Typography>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {SIGN_UP}
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  {DONT_HAVE_AN_ACCOUNT}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
export default SignUp;

