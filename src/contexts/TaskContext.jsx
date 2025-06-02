import { createContext, useReducer, useEffect } from "react";
import { initialState, taskReducer } from "./TaskReducer";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    dispatch({ type: "RESET_FILTER" });
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };
