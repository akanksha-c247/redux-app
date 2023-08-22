export const validateInput = (type, value) => {
    switch (type) {
      case 'email':
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        return emailRegex.test(value) ? '' : 'Invalid email address';
      case 'password':
       return value.length >= 8 ? '' : 'Password is too short';
      default:
        return '';
    }
  };
  