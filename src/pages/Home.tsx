import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Grid, Link as MuiLink, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom';
import {
  deleteUser,
  onNavigatePrev,
  onChangePrevPerPage,
  onClickCurrentPage,
  logOutReducer,
  onNaviGateOnNext,
} from '../redux/Reducer/UserReducer';
import SearchAppBar from '../components/SearchBar';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { fetchTodosThunk } from '../redux/services/todosThunk';
import { ACTION, COMPLETED, CREATE, DELETE, EDIT, GET_FETCH_URL, ID, LOGOUT, NEXT, OF, PAGE, PREV, TITLE, WELCOME } from '../utils/constant';

const Home: React.FC = () => {
  const todos = useAppSelector((state) => state?.USERS?.todos);
  const todosPerPage = useAppSelector((state) => state?.USERS?.todosPerPage);
  const currentPage = useAppSelector((state) => state?.USERS?.currentPage);
  const users = useAppSelector((state) => state?.USERS?.loggedInUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTodosThunk(GET_FETCH_URL));
  }, [dispatch]);

  const total_page = Math?.ceil(todos?.length / todosPerPage);
  const pages = [];
  for (let i = 1; i <= total_page; i++) {
    pages.push(i);
  }

  const indexOfLastPage = currentPage * todosPerPage;
  const indexOfFirstPage = indexOfLastPage - todosPerPage;
  const visibleTodos = todos?.slice(indexOfFirstPage, indexOfLastPage);

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

  const handleCurrentPage = (_p: number) => {
    dispatch(onClickCurrentPage(_p));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteUser({ id }));
  };

  const handleLogout = () => {
    dispatch(logOutReducer());
    navigate('/');
  };

  const firstName = users?.length > 0 ? users[0]?.firstName : null;

  return (
    <div>
      <SearchAppBar />
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{ padding: '20px' }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleLogout}
              style={{ marginRight: '950px', marginBottom: '-115px' }}
            >
              {LOGOUT}
            </Button>
            <Typography variant="subtitle1" gutterBottom>
              {WELCOME}, {firstName}
            </Typography>
            <MuiLink
              component={Link}
              to="/create"
              style={{
                marginBottom: '16px',
                display: 'block',
                color: '#fff',
              }}
            >
              <Button
                variant="contained"
                style={{ backgroundColor: '#4caf50' }}
              >
                {CREATE}+
              </Button>
            </MuiLink>
          </Paper>
        </Grid>
        <div>
          <span onClick={navigatePrev} style={{ cursor: 'pointer' }}>
            {PREV}
          </span>
          <p>
            {pages.map((_p) => (
              <span
                key={_p}
                onClick={() => handleCurrentPage(_p)}
                style={{
                  marginLeft: '4px',
                  marginRight: '4px',
                  cursor: 'pointer',
                }}
              >
                {_p}
              </span>
            ))}
            <span onClick={navigateNext} style={{ cursor: 'pointer' }}>
              {NEXT}
            </span>
          </p>
        </div>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>{ID}</TableCell>
                <TableCell>{TITLE}</TableCell>
                <TableCell>{COMPLETED}</TableCell>
                <TableCell>{ACTION}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleTodos?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.completed ? 'Yes' : 'No'}</TableCell>
                  <TableCell>
                    <Button
                      component={Link}
                      to={`/create/${row.id}`}
                      variant="contained"
                    >
                      {EDIT}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => handleDelete(row.id)}
                      style={{ marginLeft: '8px' }}
                    >
                      {DELETE}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <footer style={{ marginTop: '16px' }}>
          {PAGE} {currentPage} {OF} {total_page}
        </footer>
        <select
          onChange={(event) =>
            dispatch(onChangePrevPerPage(+event.target.value))
          }
          style={{ marginTop: '16px' }}
        >
          <option value="10">{10}</option>
          <option value="50">{50}</option>
          <option value="100">{100}</option>
        </select>
      </Paper>
    </div>
  );
};

export default Home;
