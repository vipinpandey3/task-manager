import { useCallback, useEffect, useReducer } from "react";

const taskReducer = (state, action) => {
    if(action.type === "LOAD_TASK") {
        let storedTask = JSON.parse(localStorage.getItem('tasks'));
        console.log(storedTask);
        return {
            tasks: storedTask
        }
    }

    if(action.type === "SAVE_DATA") {
        let newTaskObj = action.taskObj
        let savedtaskArray = JSON.parse(localStorage.getItem('tasks'));
        savedtaskArray = [...savedtaskArray, newTaskObj]
        localStorage.setItem('tasks', JSON.stringify(savedtaskArray))
        return {
            tasks: savedtaskArray
        }
    }
    return state;
}

const useTask = () => {
    const [taskState, dispatch] = useReducer(taskReducer, {tasks: []})

    const { tasks } = taskState;

    useEffect(() => {
        dispatch({
            type: "LOAD_TASK"
        })
    }, [])

    const saveTaskToLS = (taskObj) => {
        dispatch({
            type: "SAVE_DATA",
            taskObj: taskObj
        })
    }

    return {
        tasks: taskState.tasks,
        saveTaskToLS,
    }
}

export default useTask;