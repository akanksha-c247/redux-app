import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { addUser, updateUser } from '../redux/Reducer/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState, Todo, User } from '../utils/types';
import { ADD_NEW_USER, HOME_PAGE, SUBMIT } from '../utils/constant';

export const Create: React.FC = () => {
  const [formData, setFormData] = useState<User>({
    id: 0,
    userId: 0,
    title: '',
    completed: false,
    customId: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  
  const { id } = useParams<{ id: string | undefined }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state:RootState) => state?.USERS?.todos);
  const loggedInUser = useSelector((state:RootState) => state?.USERS?.loggedInUser);

  useEffect(() => {
    if (id != null) {
      const existingData = users?.filter((todo) => todo.id === +id);
      if (existingData && existingData.length > 0) {
        const { title, userId, completed } = existingData[0];
        setFormData((prevData) => ({
          ...prevData,
          id: +id,
          userId,
          title,
          completed,
        }));
      }
    }
  }, [id, users]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUserId = users[users.length - 1].id + 1;
    const user: Todo = {id: id ? +id : newUserId,
      title: formData.title,
      completed: formData.completed,
      userId: loggedInUser && loggedInUser[0] && loggedInUser[0].customId
        ? loggedInUser[0].customId
        : newUserId,
      data: [],
      password: '',
      email: '',
      lastName: '',
      firstName: '',
      customId: 0,
      error: '',
    };
    if (id === null || id === undefined) {
      dispatch(addUser(user));
    } else {
      dispatch(updateUser(user));
    }
    navigate(HOME_PAGE);
  };

  

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Typography variant="h3">{ADD_NEW_USER}</Typography>
      <form onSubmit={onSubmit}>
        <FormControl>
          <RadioGroup
            aria-label="completed"
            name="completed"
            value={formData.completed}
            onChange={handleInputChange}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            onChange={handleInputChange}
            value={formData.title}
          />
        </FormControl>
        <FormControl>
          <Button type="submit">{SUBMIT}</Button>
        </FormControl>
      </form>
    </div>
  );
};
