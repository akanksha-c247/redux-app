import React, { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState("");
//   const dispatch = useDispatch();
  const users = useSelector((state) => state?.USERS?.userList);

//   useEffect(() => {
//     if (users.data) {
//       setSignedUpUser(users.data);
//     }
//   }, [users.data]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
