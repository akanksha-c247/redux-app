import { Button, FormControl, FormControlLabel, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { addUser, updateUser } from "../redux/Reducer/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export const Create = () => {
  const [formData, seFormData] = useState({
    id:0,
    userId:0,
    title: '',
    completed:false

  });
  const { id } = useParams();
  const despatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state?.USERS?.todos);
  const loggedInUser = useSelector((state) => state?.USERS?.loggedInUser);

  useEffect(() => {
    if(id != null || id !== undefined)
    {
      const existingData = users?.filter((fId) => fId.id == id);
      const { title, userId, completed } = existingData[0];
      seFormData({id,userId,title,completed})
    }
  
  }, [id]);


  const onSubmit = (e) => {
    e.preventDefault();
   const newUSerID =users[users.length - 1].id + 1
   const user = {
  id:id ?? newUSerID,
  title: formData.title,
  completed:formData.completed,
  userId: loggedInUser && loggedInUser[0] && loggedInUser[0].customId ? loggedInUser[0].customId : newUSerID,
}
if(id===null || id===undefined){
  despatch(
    addUser(user)
  );
}else{
  despatch(updateUser(user))
}

    navigate("/home");
  };

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;
    seFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Typography variant="h3">Add New User</Typography>
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
          <Button type="submit">Submit</Button>
        </FormControl>
      </form>
    </div>
  );
};
