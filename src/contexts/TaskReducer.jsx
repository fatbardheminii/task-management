const initialState = {
  tasks: [],
  todayTasks: [],
  thisWeekTasks: [],
  importantTasks: [],
  projects: [],
  filterTasks: [],
  currentFilter: "All Tasks",
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "ADD_TODAY_TASK":
      return { ...state, todayTasks: [...state.todayTasks, action.payload] };
    case "ADD_WEEK_TASK":
      return {
        ...state,
        thisWeekTasks: [...state.thisWeekTasks, action.payload],
      };
    case "ADD_IMPORTANT_TASK":
      return {
        ...state,
        importantTasks: [...state.importantTasks, action.payload],
      };
    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };
    case "SET_FILTER":
      return {
        ...state,
        filterTasks: action.payload.tasks,
        currentFilter: action.payload.filterName,
      };
    case "RESET_FILTER":
      return { ...state, filterTasks: state.tasks, currentFilter: "All Tasks" };
    default:
      return state;
  }
};

export { initialState, taskReducer };
