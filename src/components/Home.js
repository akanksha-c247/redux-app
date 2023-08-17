import React, { useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { deleteUser } from "../redux/Reducer/UserReducer";
import axios from "axios";
import { setUsers } from '../redux/Action';

const Home = () => {
  const users = useSelector((state) => state.users);
  console.log('users: ', users);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.data)
      .then(json => {
        console.log('API response:', json); 
        dispatch(setUsers(json));
      })
      .catch(error => {
        console.error('API error:', error);
      });
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteUser({ id: parseInt(id) }));
  }

  return (
    <TableContainer component={Paper}>
      <Link to='/create' variant="contained" color="success">
        Create+
      </Link>
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
          {users?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{row.completed ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Link to={`/edit/${row.id}`} variant="contained">Edit</Link>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Home;
