import { isToday, isThisWeek } from "date-fns";
import { parseDDMMYYYY } from "../utils/dateUtils";

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
    case "ADD_TASK": {
      return { ...state, tasks: [...state.tasks, action.payload] };
    }
    case "ADD_TODAY_TASK": {
      return { ...state, todayTasks: [...state.todayTasks, action.payload] };
    }
    case "ADD_WEEK_TASK": {
      return {
        ...state,
        thisWeekTasks: [...state.thisWeekTasks, action.payload],
      };
    }
    case "ADD_IMPORTANT_TASK": {
      return {
        ...state,
        importantTasks: [...state.importantTasks, action.payload],
      };
    }
    case "ADD_PROJECT": {
      return { ...state, projects: [...state.projects, action.payload] };
    }
    case "SET_FILTER": {
      return {
        ...state,
        filterTasks: action.payload.tasks,
        currentFilter: action.payload.filterName,
      };
    }
    case "RESET_FILTER": {
      return { ...state, filterTasks: state.tasks, currentFilter: "All Tasks" };
    }
    case "EDIT_TASK": {
      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      const updatedTodayTasks = updatedTasks.filter((task) => {
        const parsedDate = parseDDMMYYYY(task.dueDate);
        return isToday(parsedDate);
      });
      const updatedWeekTasks = updatedTasks.filter((task) => {
        const parsedDate = parseDDMMYYYY(task.dueDate);
        return isThisWeek(parsedDate, { weekStartsOn: 1 });
      });
      const updatedImportantTasks = updatedTasks.filter(
        (task) => task.importance === "high"
      );
      const projectExists = state.projects.some(
        (p) => p.projectName === action.payload.project
      );
      let updatedProjects = state.projects;
      if (!projectExists && action.payload.project.trim()) {
        const newProject = {
          id: Date.now() + Math.random(),
          projectName: action.payload.project,
        };
        updatedProjects = [...state.projects, newProject];
      }
      return {
        ...state,
        tasks: updatedTasks,
        todayTasks: updatedTodayTasks,
        thisWeekTasks: updatedWeekTasks,
        importantTasks: updatedImportantTasks,
        projects: updatedProjects,
        filterTasks:
          state.currentFilter === "All Tasks"
            ? updatedTasks
            : state.filterTasks,
      };
    }
    case "DELETE_TASK": {
      const filteredTasks = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      const filteredTodayTasks = state.todayTasks.filter(
        (task) => task.id !== action.payload
      );
      const filteredWeekTasks = state.thisWeekTasks.filter(
        (task) => task.id !== action.payload
      );
      const filteredImportantTasks = state.importantTasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: filteredTasks,
        todayTasks: filteredTodayTasks,
        thisWeekTasks: filteredWeekTasks,
        importantTasks: filteredImportantTasks,
        filterTasks:
          state.currentFilter === "All Tasks"
            ? filteredTasks
            : state.filterTasks,
      };
    }
    case "EDIT_PROJECT": {
      const updatedProjects = state.projects.map((project) =>
        project.id === action.payload.id ? action.payload : project
      );
      const updatedTaskProjects = state.tasks.map((task) =>
        task.project === action.payload.oldName
          ? { ...task, project: action.payload.projectName }
          : task
      );
      return {
        ...state,
        projects: updatedProjects,
        tasks: updatedTaskProjects,
        filterTasks:
          state.currentFilter === action.payload.oldName
            ? updatedTaskProjects.filter(
                (task) => task.project === action.payload.projectName
              )
            : state.filterTasks,
      };
    }
    case "DELETE_PROJECT": {
      const remainingProjects = state.projects.filter(
        (project) => project.id !== action.payload.id
      );
      const remainingTasks = state.tasks.filter(
        (task) => task.project !== action.payload.projectName
      );
      // Fixed syntax errors: corrected spread operator and closed parentheses
      return {
        ...state, // Properly spread state
        projects: remainingProjects,
        tasks: remainingTasks,
        todayTasks: state.todayTasks.filter(
          (task) => task.project !== action.payload.projectName
        ), // Added closing parenthesis
        thisWeekTasks: state.thisWeekTasks.filter(
          (task) => task.project !== action.payload.projectName
        ),
        importantTasks: state.importantTasks.filter(
          (task) => task.project !== action.payload.projectName
        ),
        filterTasks:
          state.currentFilter === action.payload.projectName
            ? remainingTasks
            : state.filterTasks,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, taskReducer };
