import React, { useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Button, Grid} from '@mui/material';
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
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { fetchTodosThunk } from '../redux/services/todosThunk';
import { ACTION, COMPLETED, DELETE, EDIT, GET_FETCH_URL, ID, NEXT, OF, PAGE, PREV, TITLE } from '../utils/constant';
import Header from '../components/header/Header';
import { useTranslation } from 'react-i18next';


const Home: React.FC = () => {
  const todos = useAppSelector((state) => state?.USERS?.todos);
  const todosPerPage = useAppSelector((state) => state?.USERS?.todosPerPage);
  const currentPage = useAppSelector((state) => state?.USERS?.currentPage);
  const users = useAppSelector((state) => state?.USERS?.loggedInUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation(['home']);

  useEffect(() => {
    dispatch(fetchTodosThunk(GET_FETCH_URL));
  }, [dispatch]);

  // Calculate total number of pages and create an array of page numbers
  const total_page = Math?.ceil((todos?.length || 0) / todosPerPage);
  const pages = Array.from({ length: total_page }, (_, index) => index + 1);

  // Calculate the range of visible todos based on current page
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

  return (
    <div>
      <Header onLogout={handleLogout}/>
      <h1>{t('home:Home')}</h1>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <Grid item xs={12} md={3}>
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
