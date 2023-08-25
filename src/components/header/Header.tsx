/* eslint-disable indent */
/* eslint-disable quotes */
import React, { useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Suspense } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { Search, StyledInputBase } from "../searchBarTheme";
import { useAppDispatch, useAppSelector } from "../../redux/reduxHooks";
import { filterUsers } from "../../redux/Reducer/UserReducer";
import { CREATE, WELCOME } from "../../utils/constant";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state?.USERS?.loggedInUser);
  const { t } = useTranslation(["common"]);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    if (storedLanguage && storedLanguage.length > 2) {
      i18next.changeLanguage('en');
    }
  }, []);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageSelect = (language: string) => {
    console.log(`Selected language: ${language}`);
    handleLanguageMenuClose();
  };

  const handleLangaugeChange = (e: any) => {
    i18next.changeLanguage(e.target.value);
  };

  const filterUser = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      dispatch(filterUsers(inputValue));
    }
  };

  const firstName = users?.length > 0 ? users[0]?.firstName : null;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit">
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            onChange={filterUser}
            inputRef={inputRef}
            data-testId="inputBox"
          />
        </IconButton>
        <div>
          <Button color="inherit" onClick={handleLanguageMenuOpen}>
            Language
          </Button>
          <Menu
            value={localStorage.getItem("i18nextLng")}
            anchorEl={anchorEl}c
            open={Boolean(anchorEl)}
            onClose={handleLanguageMenuClose}
            onChange={handleLangaugeChange}
          >
            <MenuItem
              onClick={() => handleLanguageSelect("en")}
              selected={localStorage.getItem("i18nextLng") === "en"}
            >
              English
            </MenuItem>
            <MenuItem
              onClick={() => handleLanguageSelect("fr")}
              selected={localStorage.getItem("i18nextLng") === "fr"}
            >
              French
            </MenuItem>
            <MenuItem
              onClick={() => handleLanguageSelect("es")}
              selected={localStorage.getItem("i18nextLng") === "es"}
            >
              Spanish
            </MenuItem>
          </Menu>
          <Button color="inherit" onClick={onLogout}>
            {t("logout")}
          </Button>
          <Link
            to="/create"
            style={{
              marginBottom: "16px",
              display: "block",
              color: "#fff",
            }}
          >
            <Button variant="contained" style={{ backgroundColor: "#4caf50" }}>
              {CREATE}+
            </Button>
          </Link>
          <Typography variant="subtitle1" gutterBottom>
            {WELCOME}, {firstName}
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
