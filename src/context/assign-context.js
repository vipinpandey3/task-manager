import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const AssigneContext = createContext();

export const AssigneContextProvider = (props) => {
  const [assignedTask, setAssigedTask] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

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

  const fetchTasks = async () => {
    const response = await fetch(
      "https://react-http-efc5a-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const loadedTasks = [];
    for (const key in data) {
      loadedTasks.push({
        id: key,
        title: data[key].title,
      });
    }
    // setMeals(loadedMeals);
    setTasks(loadedTasks);
  };

  const assignedTaskDB = async () => {
    const response = await fetch(
      "https://react-http-efc5a-default-rtdb.asia-southeast1.firebasedatabase.app/assigned-tasks.json"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    const data = await response.json();
    const loadedAssignedTask = [];
    console.log('data', data);
    for (const key in data) {
      loadedAssignedTask.push({
        id: key,
        title: data[key].title,
        name: data[key].name,
      });
    }
    setAssigedTask(loadedAssignedTask);
  };

  useEffect(() => {
    fetchUsers().catch((error) => console.log(error.message));
    fetchTasks().catch((error) => console.log(error.message));
    assignedTaskDB().catch((error) => console.log(error.message))
  }, []);

  const assigTaskToUser = (taskId, userId) => {
    const taskName = tasks.filter(task => task.id === taskId);
    const userName = users.filter(user => user.id === userId);
    const assignedtask = {
        id: uuidv4(),
        title: taskName[0].title,
        name: userName[0].name
    }
    fetch('https://react-http-efc5a-default-rtdb.asia-southeast1.firebasedatabase.app/assigned-tasks.json', {
        method: 'POST',
        body: JSON.stringify(assignedtask)
    })
    setAssigedTask([...assignedTask, assignedtask]);
  }

  return (
    <AssigneContext.Provider
      value={{
        assignedTask,
        users,
        assigTaskToUser,
      }}
    >
      {props.children}
    </AssigneContext.Provider>
  );
};
