import React, {
  Fragment,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import Card from "../Components/common/Card";
import styles from "./Task.module.css";
import Input from "../Components/common/Input";
import Button from "../Components/common/Button";
import useTask from "../hooks/task-hook";
import { TaskContext } from "../context/task-context";
import { AssigneContext } from "../context/assign-context";
import Users from './Users'

const Tasks = () => {
  const { tasks, saveTaskToLS, users } = useContext(TaskContext);
  const { assigTaskToUser } = useContext(AssigneContext);
  const [taskInputValue, setTaskInput] = useState("");
  const [assign, setAssign] = useState(false);
  const [taskId, setTaskId] = useState();
  // const { tasks, saveTaskToLS } = useTask()
  const taskInputHandler = (e) => {
    setTaskInput(e.target.value);
  };

  // let setAssign = false;

  let buttonIsvalid = false;
  if (taskInputValue !== "") {
    buttonIsvalid = true;
  }

  const createTaskHandler = () => {
    saveTaskToLS(taskInputValue);
    setTaskInput("");
  };

  const assignTask = (id) => {
    setAssign(true)
    setTaskId(id);
  }
  
  const getUserName = (userId) => {
    setAssign(false)
    assigTaskToUser(taskId, userId)
  }

  return (
    <Fragment>
      <Card>
        <div className={styles["task-input"]}>
          <Input onChange={taskInputHandler} value={taskInputValue} />
          <Button
            type="button"
            className={styles.button}
            isValid={buttonIsvalid}
            text="Create Task"
            onClick={createTaskHandler}
          />
        </div>
      </Card>
      <Card>
        <div className={styles.task}>
          {tasks.length > 0 ? (
            <ul>
              {tasks.map((task) => (
                <li key={task.id}>
                  <div>{task.title}</div>
                  <div>
                    <button onClick={() => assignTask(task.id)}>
                      Assign
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.center}>No task Found</p>
          )}
        </div>
      </Card>
      {assign && <Users getUserName={getUserName} /> }
        {/* // <Card>
        //   <div className={styles.task}>
        //     {users.length > 0 ? (
        //       <ul>
        //         {users.map((user) => (
        //           <li key={user.id}>{user.name}</li>
        //         ))}
        //       </ul>
        //     ) : (
        //       <p className={styles.center}>No user Found</p>
        //     )}
        //   </div>
        // </Card> */}
    </Fragment>
  );
};

export default Tasks;
