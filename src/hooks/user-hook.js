import { useCallback, useEffect, useReducer } from "react";

const userReducer = (state, action) => {
  if (action.type === "LOAD_USER") {
    let savedUsers = JSON.parse(localStorage.getItem("users"));
    // console.log(savedUsers);
    return {
      users: savedUsers,
    };
  }

  if (action.type === "SAVE_DATA") {
    let newUserObj = action.userObj;
    let savedUserArray = JSON.parse(localStorage.getItem("users"));
    if (savedUserArray && savedUserArray.length > 0) {
      savedUserArray = [newUserObj, ...savedUserArray];
      console.log("inside if");
    } else {
      savedUserArray = [newUserObj];
    }
    localStorage.setItem("users", JSON.stringify(savedUserArray));
    return {
      users: savedUserArray,
    };
  }
  return state;
};

const useUser = () => {
  const [usersState, dispatch] = useReducer(userReducer, { users: [] });

  const { users } = usersState;

  useEffect(() => {
    dispatch({
      type: "LOAD_USER",
    });
  }, []);

  const saveUserToLS = (userObj) => {
    dispatch({
      type: "SAVE_DATA",
      userObj: userObj,
    });
  };

  return {
    users: usersState.users,
    saveUserToLS,
  };
};

export default useUser;
