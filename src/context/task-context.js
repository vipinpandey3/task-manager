import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext();

export const TaskContextProvider = (props) => {
  const [tasks, setTasks] = useState([]);
  // const { tasks } = taskState;

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
    setTasks(loadedTasks);
  };

  useEffect(() => {
    fetchTasks().catch((error) => {
      console.log(error.message);
    });
  }, []);

  const saveTaskToLS = async (taskInput) => {
    const taskObj = {
      id: uuidv4(),
      title: taskInput,
    };
    // setTasks([...tasks, taskObj]);
    await fetch(
      "https://react-http-efc5a-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(taskObj),
      }
    );
    setTasks([...tasks, taskObj]);
  };
  return (
    <TaskContext.Provider
      value={{
        tasks,
        saveTaskToLS,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
};
