import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../redux/Action';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <Typography variant="h4">Counter: {counter}</Typography>
      <Button variant="contained" color="primary" onClick={() => dispatch(increment())}>
        Increment
      </Button>
      <Button variant="contained" color="secondary" onClick={() => dispatch(decrement())}>
        Decrement
      </Button>
    </div>
  );
};

export default Counter;
