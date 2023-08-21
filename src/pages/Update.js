// import { Button, FormControl, TextFiel, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import { updateUser } from "../redux/Reducer/UserReducer";

// export const Update = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const users = useSelector((state) => state.users);
//   const existingData = users.filter((fId) => fId.id == id);
//   const { name, email } = existingData[0];
//   const [formData, seFormData] = useState({
//     name:name,
//     email: email,
//   });
//   const navigate = useNavigate()

//   const handleUpdate = (e) => {
//     e.preventDefault();
//     dispatch(updateUser({
//         id:id,
//         name:formData.name,
//         email:formData.email,
//     }));
//     navigate('/')
//   };
  
//   return (
//     <div>
//       <Typography variant="h3">Update User</Typography>
//       <form onSubmit={handleUpdate}>
//         <FormControl>
//           <TextField
//             name="name"
//             label="Name"
//             variant="outlined"
//             value={formData.name}
//             onChange={(e) => seFormData({ ...formData, name: e.target.value })}
//           />
//         </FormControl>
//         <FormControl>
//           <TextField
//             name="email"
//             label="Email"
//             variant="outlined"
//             value={formData.email}
//             onChange={(e) => seFormData({ ...formData, email: e.target.value })}
//           />
//         </FormControl>
//         <FormControl>
//           <Button type="submit">Update</Button>
//         </FormControl>
//       </form>
//     </div>
//   );
// };
