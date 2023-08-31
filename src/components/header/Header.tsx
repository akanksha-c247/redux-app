import React, { useRef } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { filterUsers, logOutReducer } from '../../redux/Reducer/UserReducer';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { StyledInputBase } from '../searchBarTheme';
import './header.scss';
const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state?.USERS?.loggedInUser);
  const { t } = useTranslation();
  const navigate = useNavigate();
 
  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: string) => {
    i18next.changeLanguage(language);
    handleLanguageMenuClose();
  };

  const filterUser = () => {
    const inputValue = inputRef?.current?.value;
    if (inputValue) {
      dispatch(filterUsers(inputValue));
    }
  };

  const onLogout = () => {
    dispatch(logOutReducer());
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit">
          <StyledInputBase
            placeholder={t('searchPlaceholder')}
            inputProps={{ 'aria-label': 'search' }}
            onChange={filterUser}
            inputRef={inputRef}
            data-testid="inputBox"
          />
        </IconButton>
        <div className='language'>
          <Button color="inherit" onClick={handleLanguageMenuOpen}>
            {t('language')}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
          >
            <MenuItem
              onClick={() => handleLanguageSelect('en')}
              selected={i18next.language === 'en'}
              className='english'
            >
              {t('english')}
            </MenuItem>
            <MenuItem
              onClick={() => handleLanguageSelect('fr')}
              selected={i18next.language === 'fr'}
            >
              {t('french')}
            </MenuItem>
            {/* Add other languages */}
          </Menu>
          <Button color="inherit" onClick={onLogout}>
            {t('logout')}
          </Button>
          <Link
            to="/create"
            className='create'
          >
            <Button variant="contained" style={{ backgroundColor: '#4caf50' }} >
              {t('create')}+
            </Button>
          </Link>
          <Typography variant="subtitle1" gutterBottom>
            {t('welcome')}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
