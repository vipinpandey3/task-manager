import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const UsersContext = createContext();

export const UserContextProvider = (props) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(
      "https://react-http-efc5a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const loadedUsers = [];
    for (const key in data) {
      loadedUsers.push({
        id: key,
        name: data[key].name,
      });
    }
    setUsers(loadedUsers);
  };

  useEffect(() => {
    fetchUsers().catch((error) => {
      console.log(error.message);
    });
  }, []);

  const saveUserToDB = async (usersInput) => {
    const userObj = {
      id: uuidv4(),
      name: usersInput,
    };
    await fetch(
      "https://react-http-efc5a-default-rtdb.asia-southeast1.firebasedatabase.app/users.json",
      {
        method: "POST",
        body: JSON.stringify(userObj),
      }
    );
    setUsers([...users, userObj])
  };  
  return (
    <UsersContext.Provider
      value={{
        users,
        saveUserToDB,
      }}
    >
      {props.children}
    </UsersContext.Provider>
  );
};
