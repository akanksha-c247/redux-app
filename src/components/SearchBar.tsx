import { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { SearchAppBarProps } from "../utils/types";
import React from "react";
import { useAppDispatch } from "../redux/reduxHooks";
import { filterUsers } from "../redux/Reducer/UserReducer";
import { Search, SearchIconWrapper, StyledInputBase } from "./searchBarTheme";

const SearchAppBar: React.FC<SearchAppBarProps> = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useAppDispatch();

  const filterUser = () => {
    const inputValue = inputRef.current?.value;
    if (inputValue) {
      dispatch(filterUsers(inputValue));
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} data-testid="todos">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          ></Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={filterUser}
              inputRef={inputRef}
              data-testId="inputBox"
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchAppBar;
