import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Button, Grid, Link as MuiLink, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUser,
  onNaviGateOnNext,
  onNavigatePrev,
  onChangePrevPerPage,
  onClickCurrentPage,
  logOutReducer,
} from "../redux/Reducer/UserReducer";
import { fetchPaginationData } from "../redux/paginationThunk";
import SearchAppBar from "../components/SearchBar";
import { useUserContext } from "../contextAPI/ReduxContext";

const Home = () => {
  const todos = useSelector((state) => state?.USERS?.todos);
  const { currentUser, setCurrentUser } = useUserContext();
  const todosPerPage = useSelector((state) => state.USERS.todosPerPage);
  const currentPage = useSelector((state) => state.USERS.currentPage);
  const users = useSelector((state) => state?.USERS?.loggedInUser);
  console.log('users: ', users);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchPaginationData());
    setCurrentUser()
  }, [dispatch,setCurrentUser]);

  const total_page = Math.ceil(todos.length / todosPerPage);
  const pages = [...Array(total_page + 1).keys()].slice(1);
  const indexOfLastPage = currentPage * todosPerPage;
  const indexOfFirstPage = indexOfLastPage - todosPerPage;
  const visibleTodos = todos.slice(indexOfFirstPage, indexOfLastPage);

  const navigatePrev = () => {
    if (currentPage !== null) {
      dispatch(onNavigatePrev());
    }
  };

  const navigateNext = () => {
    if (currentPage !== total_page) {
      dispatch(onNaviGateOnNext());
    }
  };

  const handleCurrentPage = (_p) => {
    dispatch(onClickCurrentPage(_p));
  };

  const handleDelete = (id) => {
    dispatch(deleteUser({ id: parseInt(id) }));
  };

  const handleLogout = () => {
    dispatch(logOutReducer());
    navigate("/");
  };
  return (
    <div>
      <SearchAppBar />
      <Paper elevation={3} style={{ padding: "16px" }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: "20px"}}>
            <Button variant="outlined" color="primary" onClick={handleLogout} style={{marginRight:"950px",marginBottom:"-115px"}}>
              Logout
            </Button>
            <Typography variant="subtitle1" gutterBottom >
              Welcome, {users[0]?.firstName} 
            </Typography>
            <MuiLink
              component={Link}
              to="/create"
              style={{ marginBottom: "16px", display: "block", color: "#fff" }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: "#4caf50" }}
              >
                Create+
              </Button>
            </MuiLink>
          </Paper>
        </Grid>
        <div>
          <span onClick={navigatePrev} style={{ cursor: "pointer" }}>
            Prev
          </span>
          <p>
            {pages.map((_p) => (
              <span
                key={_p}
                onClick={() => handleCurrentPage.call(null, _p)}
                style={{
                  marginLeft: "4px",
                  marginRight: "4px",
                  cursor: "pointer",
                }}
              >
                {_p}
              </span>
            ))}
            <span onClick={navigateNext} style={{ cursor: "pointer" }}>
              Next
            </span>
          </p>
        </div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Completed</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleTodos.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.completed ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <MuiLink
                      component={Link}
                      to={`/create/${row.id}`}
                      variant="contained"
                    >
                      Edit
                    </MuiLink>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(row.id)}
                      style={{ marginLeft: "8px" }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <footer style={{ marginTop: "16px" }}>
          page {currentPage} of {total_page}
        </footer>
        <select
          onChange={(event) =>
            dispatch(onChangePrevPerPage(event.target.value))
          }
          style={{ marginTop: "16px" }}
        >
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </Paper>
    </div>
  );
};

export default Home;
