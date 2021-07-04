import React, { Fragment, useState, useContext } from "react";
import Card from "../Components/common/Card";
import styles from "./Users.module.css";
import Input from "../Components/common/Input";
import Button from "../Components/common/Button";
// import useUser from "../hooks/user-hook";
import {UsersContext} from '../context/users-context'

const Tasks = (props) => {
  const {users, saveUserToDB} = useContext(UsersContext)
  const [userInputValue, setUserInput] = useState("");
  const taskInputHandler = (e) => {
    setUserInput(e.target.value);
  };

  const createUserHandler = () => {
    saveUserToDB(userInputValue);
    setUserInput("")
  };

  let buttonIsvalid = false;
  if (userInputValue !== "") buttonIsvalid = true;

  return (
    <Fragment>
      <Card>
        <div className={styles["users-input"]}>
          <Input onChange={taskInputHandler} value={userInputValue} />
          <Button
            type="button"
            className={styles.button}
            isValid={buttonIsvalid}
            text="Create User"
            onClick={createUserHandler}
          />
        </div>
      </Card>
      <Card>
        <div className={styles.users}>
          {users.length > 0 ? (
            <ul>
            {users.map((user) => (
              <li key={user.id} onClick={() => props.getUserName(user.id)}>{user.name}</li>
            ))}
          </ul>
          ) : (
            <p className={styles.center}>User Not Found</p>
          )}
        </div>
      </Card>
    </Fragment>
  );
};

export default Tasks;
