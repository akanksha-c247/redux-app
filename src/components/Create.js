import { Button, FormControl, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { addUser } from "../redux/Reducer/UserReducer";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export const Create = () => {
    const [formData,seFormData]=useState({
        name:'',
        email:''
    })
    const despatch=useDispatch()
    const users = useSelector((state)=>state.users)
    const navigate = useNavigate()
    const onSubmit = (e) => {
    e.preventDefault(); 
    despatch(addUser({id:users[users.length-1].id+1,name:formData.name,email:formData.email}))
    navigate('/')
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    seFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <div>
        <Typography variant="h3">Add New User</Typography>
      <form onSubmit={onSubmit}>
        <FormControl>
          <TextField name="name" label="Name" variant="outlined" onChange={handleInputChange} value={formData.name}/>
        </FormControl>
        <FormControl>
          <TextField name="email" label="Email" variant="outlined" onChange={handleInputChange} value={formData.email}/>
        </FormControl>
        <FormControl>
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </div>
  );
};
