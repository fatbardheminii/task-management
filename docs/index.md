# Task Management Application: Technical Documentation

## Overview

The **Task Management Application** is a *modern, single-page web application* built with **React**, designed to help users manage tasks and projects efficiently. It allows users to:

- Create, edit, and delete tasks and projects
- Organize tasks by categories (e.g., *All Tasks*, *Today*, *This Week*, *Important*, or by project)
- View task details in a responsive, user-friendly interface

The application leverages **React Context** with a reducer for state management, **CSS** for styling with dark/light theme support, and the `date-fns` library for date handling. This documentation provides a comprehensive guide to the application’s architecture, components, state management, styling, and usage, enabling developers to understand, maintain, and extend the codebase.

---

## Table of Contents

 1. Features
 2. Architecture
 3. File Structure
 4. Components
 5. State Management
 6. Styling
 7. Dependencies
 8. Setup and Installation
 9. Usage
10. Extending the Application
11. Testing Recommendations
12. Known Issues and Limitations

---

## Features

- **Task Management**:

  - Create, edit, and delete tasks with fields for *title*, *description*, *project*, *status*, *due date*, and *importance*
  - Filter tasks by categories: *All Tasks*, *Today*, *This Week*, *Important*, or specific projects
  - Display tasks in cards with a modal for full descriptions

- **Project Management**:

  - Create, edit, and delete projects
  - Automatically create projects when tasks are assigned to new project names
  - Remove projects with no associated tasks

- **Responsive Design**:

  - Two-column layout (sidebar and main content) on desktop, single-column on mobile
  - Collapsible sidebar sections for mobile usability

- **Accessibility**:

  - Focus states and hover effects for interactive elements
  - Semantic HTML and clear visual feedback

- **Theming**:

  - Supports dark and light themes via `prefers-color-scheme` media queries

---

## Architecture

The application follows a **modular, component-based architecture** using React’s functional components and hooks. Key architectural decisions include:

- **State Management**: Uses **React Context** (`TaskContext`) with `useReducer` for centralized management of tasks, projects, and filters, avoiding external libraries like Redux for simplicity.
- **Component Hierarchy**: Organized into a root `App` component, with a main section (`MainSection`) splitting the UI into a sidebar (`InboxSection`, `ProjectsSection`) and content area (`AddTaskSection`, `TasksDisplay`).
- **Styling**: Combines global styles (`index.css`) with component-specific styles (`App.css`) using **CSS Grid**, **Flexbox**, and media queries for responsiveness.
- **Date Handling**: Leverages `date-fns` for parsing and filtering tasks by date (e.g., *today*, *this week*).

**Data Flow**:

1. Components dispatch actions via `TaskContext` to update state in `TaskReducer`.
2. `TaskReducer` updates the state, which is shared via `TaskContext`.
3. Components re-render based on the updated state.

---

## File Structure

```plaintext
task-management-app/
├── src/
│   ├── components/
│   │   ├── AddProjectForm.jsx      # Form for adding/editing projects
│   │   ├── AddTaskForm.jsx         # Form for adding/editing tasks
│   │   ├── AddTaskSection.jsx      # Toggles AddTaskForm visibility
│   │   ├── Footer.jsx              # Displays footer with copyright and GitHub link
│   │   ├── Header.jsx              # Displays app title
│   │   ├── InboxSection.jsx        # Sidebar section for task filters (All, Today, etc.)
│   │   ├── MainSection.jsx         # Main layout with sidebar and content
│   │   ├── ProjectCard.jsx         # Displays individual project with edit/delete icons
│   │   ├── ProjectsSection.jsx     # Sidebar section for project management
│   │   ├── TaskCard.jsx            # Displays individual task with modal
│   │   └── TasksDisplaySection.jsx # Displays filtered tasks
│   ├── contexts/
│   │   └── TaskContext.jsx         # Context for sharing task state and dispatch
│   │   ├── TaskReducer.jsx         # Reducer for state management
│   ├── utils/
│   │   └── dateUtils.jsx           # Date parsing/formatting utilities
│   ├── App.jsx                     # Root component with TaskProvider
│   ├── App.css                     # Component-specific styles
│   ├── index.css                   # Global styles with theme support
│   └── main.jsx                    # Entry point for React rendering
├── docs/
│   └── index.md                    # Technical documentation
├── README.md                       # Project overview and setup instructions
├── package.json                    # Project dependencies and scripts
```

---

## Components

Below is a detailed description of each component, its purpose, and key features.

### App.jsx

- **Purpose**: Root component that wraps the app in `TaskProvider` and renders the main structure.
- **Features**:
  - Provides `TaskContext` to child components
  - Renders `Header`, `MainSection`, and `Footer`
- **Props**: None
- **Dependencies**: `TaskContext`, `App.css`

### Header.jsx

- **Purpose**: Displays the app title (*Task Management*).
- **Features**:
  - Simple header with a `<h1>` wrapped in a `<header>` element
- **Props**: None
- **Dependencies**: Styled by `App.css` (`header`)

### MainSection.jsx

- **Purpose**: Organizes the UI into a sidebar (`InboxSection`, `ProjectsSection`) and content area (`AddTaskSection`, `TasksDisplay`).
- **Features**:
  - Uses **CSS Grid** for a two-column layout (desktop) or single-column (mobile)
  - Dispatches filter actions via `TaskContext`
- **Props**: None
- **Dependencies**: `TaskContext`, `InboxSection`, `ProjectsSection`, `AddTaskSection`, `TasksDisplay`

### Footer.jsx

- **Purpose**: Displays a footer with a copyright notice and GitHub link.
- **Features**:
  - Uses `FaGithub` from `react-icons` for the GitHub icon
  - Dynamically displays the current year
- **Props**: None
- **Dependencies**: `react-icons/fa`, styled by `App.css` (`footer`)

### InboxSection.jsx

- **Purpose**: Sidebar section for filtering tasks by categories (*All Tasks*, *Today*, *This Week*, *Important*).
- **Features**:
  - Collapsible on mobile using `useState` and `useRef` with `useEffect` for outside click detection
  - Displays task counts for each category
  - Dispatches `SET_FILTER` actions via `TaskContext`
- **Props**: None
- **Dependencies**: `TaskContext`, `react-icons/fa`, styled by `App.css` (`.inbox-sec`)

### ProjectsSection.jsx

- **Purpose**: Sidebar section for managing and filtering by projects.
- **Features**:
  - Renders projects using `ProjectCard` components
  - Supports adding/editing projects via `AddProjectForm`
  - Collapsible on mobile with outside click detection
  - Dispatches `ADD_PROJECT`, `EDIT_PROJECT`, `DELETE_PROJECT`, and `SET_FILTER` actions
- **Props**:
  - `onSetFilter`: Callback to update filtered tasks in parent component
- **Dependencies**: `TaskContext`, `AddProjectForm`, `ProjectCard`, `react-icons/fa`, styled by `App.css` (`.project-sec`, `.project-card`)

### ProjectCard.jsx

- **Purpose**: Displays a single project with its name, task count, and edit/delete icons.
- **Features**:
  - Uses `FaEdit` and `FaTrash` icons for editing and deleting
  - Triggers filtering on click and handles edit/delete actions with `e.stopPropagation()`
- **Props**:
  - `project`: Object with `id` and `projectName`
  - `taskCount`: Number of tasks in the project
  - `onClick`: Callback for filtering tasks
  - `onEdit`: Callback for editing the project
  - `onDelete`: Callback for deleting the project
- **Dependencies**: `react-icons/fa`, styled by `App.css` (`.project-card`, `.edit-icon`, `.delete-icon`)

### AddProjectForm.jsx

- **Purpose**: Form for adding or editing projects.
- **Features**:
  - Validates project names (non-empty, no duplicates)
  - Dispatches `ADD_PROJECT` or `EDIT_PROJECT` actions
  - Clears form and hides on submission
- **Props**:
  - `projectToEdit`: Project object for editing (optional)
  - `setShowProjectForm`: Callback to toggle form visibility
- **Dependencies**: `TaskContext`, styled by `App.css` (`.add-project-form`)

### AddTaskSection.jsx

- **Purpose**: Toggles visibility of `AddTaskForm`.
- **Features**:
  - Uses `useState` to show/hide the form
  - Displays a plus/minus icon (`FaPlusCircle`/`FaMinusCircle`) for toggling
- **Props**: None
- **Dependencies**: `AddTaskForm`, `react-icons/fa`, styled by `App.css` (`.add-tasks-sec`)

### AddTaskForm.jsx

- **Purpose**: Form for adding or editing tasks.
- **Features**:
  - Manages fields for *title*, *description*, *project*, *status*, *due date*, and *importance*
  - Validates due dates using `dateUtils` and `date-fns`
  - Dispatches `ADD_TASK`, `EDIT_TASK`, `ADD_TODAY_TASK`, `ADD_WEEK_TASK`, `ADD_IMPORTANT_TASK`, and `ADD_PROJECT` actions
  - Supports editing via `taskToEdit` prop and `useEffect`
- **Props**:
  - `setShowForm`: Callback to toggle form visibility
  - `taskToEdit`: Task object for editing (optional)
- **Dependencies**: `TaskContext`, `dateUtils`, `date-fns`, `react-icons/fa`, styled by `App.css` (`.add-task-form`)

### TasksDisplaySection.jsx

- **Purpose**: Displays filtered tasks as `TaskCard` components.
- **Features**:
  - Shows the current filter name and a list of tasks
  - Supports editing tasks via `AddTaskForm`
  - Displays a message if no tasks are available
- **Props**: None
- **Dependencies**: `TaskContext`, `AddTaskForm`, `TaskCard`, styled by `App.css` (`.tasks-display`, `.tasks-list`)

### TaskCard.jsx

- **Purpose**: Displays a single task with its details and actions.
- **Features**:
  - Shows *title*, *description* (truncated with a modal for full text), *project*, *status*, *due date*, and *importance*
  - Uses dynamic styling based on importance (*low*, *medium*, *high*)
  - Includes edit (`FaEdit`) and delete (`FaTrash`) icons
  - Displays a modal for long descriptions using `useRef` and `useEffect` for outside click detection
- **Props**:
  - `task`: Task object with `id`, `title`, `description`, `project`, `status`, `dueDate`, `importance`
  - `onEdit`: Callback for editing the task
- **Dependencies**: `TaskContext`, `react-icons/fa`, styled by `App.css` (`.task-card`, `.description-modal`)

### TaskContext.jsx

- **Purpose**: Provides a **React Context** for sharing task state and dispatch function.
- **Features**:
  - Uses `useReducer` with `TaskReducer` for state management
  - Resets filter on task changes using `useEffect`
  - Exports `TaskContext` and `TaskProvider`
- **Props** (for `TaskProvider`):
  - `children`: Components to receive context
- **Dependencies**: `TaskReducer`, styled indirectly by `App.css`

### TaskReducer.jsx

- **Purpose**: Defines the reducer and initial state for task and project management.
- **Features**:
  - Manages arrays for `tasks`, `todayTasks`, `thisWeekTasks`, `importantTasks`, `projects`, `filterTasks`, and `currentFilter`
  - Handles actions: `ADD_TASK`, `EDIT_TASK`, `DELETE_TASK`, `ADD_TODAY_TASK`, `ADD_WEEK_TASK`, `ADD_IMPORTANT_TASK`, `ADD_PROJECT`, `EDIT_PROJECT`, `DELETE_PROJECT`, `SET_FILTER`, `RESET_FILTER`
  - Uses `date-fns` for date-based filtering
- **Dependencies**: `dateUtils`, `date-fns`

### dateUtils.jsx

- **Purpose**: Provides utility functions for date handling.
- **Features**:
  - `parseDDMMYYYY`: Converts `dd-MM-yyyy` strings to `Date` objects
  - `formatDDMMYYYY`: Formats `Date` objects to `dd-MM-yyyy`
- **Dependencies**: `date-fns`

### main.jsx

- **Purpose**: Entry point for rendering the React application.
- **Features**:
  - Uses `createRoot` to render `App` in the `#root` DOM element
- **Props**: None
- **Dependencies**: `react-dom`, `App`, `index.css`

---

## State Management

The application uses a **centralized state management system** via `TaskContext` and `TaskReducer`:

- **Context**: `TaskContext` provides `state` (tasks, projects, filters) and `dispatch` to components
- **Reducer**: `TaskReducer` manages state updates with actions:
  - **Task Actions**: `ADD_TASK`, `EDIT_TASK`, `DELETE_TASK`, `ADD_TODAY_TASK`, `ADD_WEEK_TASK`, `ADD_IMPORTANT_TASK`
  - **Project Actions**: `ADD_PROJECT`, `EDIT_PROJECT`, `DELETE_PROJECT`
  - **Filter Actions**: `SET_FILTER`, `RESET_FILTER`
- **State Structure**:

```javascript
{
  tasks: [],           // All tasks
  todayTasks: [],      // Tasks due today
  thisWeekTasks: [],   // Tasks due this week
  importantTasks: [],  // High-importance tasks
  projects: [],        // Projects
  filterTasks: [],     // Currently filtered tasks
  currentFilter: ""    // Current filter name
}
```

- **Key Logic**:
  - Automatically creates projects when tasks are assigned to new project names
  - Removes projects with no tasks on task deletion
  - Resets filter on task changes to ensure UI consistency

---

## Styling

The application uses **pure CSS** for styling, split between:

- **Global Styles** (`index.css`):
  - Defines root variables, typography, and theme support
  - Applies to all components
- **Component Styles** (`App.css`):
  - Uses **CSS Grid** for layout (`.main`, `.left-sidebar`, `.right-content`)
  - Implements responsive design with media queries (`max-width: 768px`, `min-width: 769px`)
  - Styles components with consistent colors, borders, and hover effects
  - Supports accessibility with focus states and clear visual feedback

**Key Styling Features**:

- **Responsive Layout**: Two-column grid on desktop, single-column on mobile with collapsible sidebar
- **Theming**: Dark/light mode via `prefers-color-scheme`
- **Accessibility**: Focus outlines, hover effects, and semantic structure

---

## Dependencies

The application relies on the following dependencies (see `package.json` for versions):

- **React**: Core library for building the UI
- **React DOM**: For rendering the app to the DOM
- **date-fns**: For date parsing and filtering
- **react-icons**: For icons (`FaPlusCircle`, `FaEdit`, etc.)
- **Vite**: Build tool for development and production
- **Node.js**: For running the development server

---

## Setup and Installation

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **Yarn**

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/fatbardheminii/task-management-app.git
   cd task-management-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`.

4. **Build for Production**:

   ```bash
   npm run build
   ```

   Outputs optimized files to the `dist` directory.

---

## Usage

1. **Access the App**:

   - Open the app in a browser (`http://localhost:5173` in development)
   - The UI displays a header, sidebar (*Inbox* and *Projects*), task list, and footer

2. **Managing Tasks**:

   - Click *Add Task* to open `AddTaskForm`
   - Enter task details (*title*, *description*, *project*, *status*, *due date*, *importance*)
   - Edit or delete tasks via icons on `TaskCard`

3. **Managing Projects**:

   - Click *Add Project* in `ProjectsSection` to create a new project
   - Edit or delete projects via icons on `ProjectCard`

4. **Filtering Tasks**:

   - Use `InboxSection` to filter by *All Tasks*, *Today*, *This Week*, or *Important*
   - Click a project in `ProjectsSection` to filter by project

5. **Responsive Behavior**:

   - On mobile, click the *Inbox* or *Projects* headers to expand/collapse sections

---

## Extending the Application

To extend the app, consider the following enhancements:

1. **Persist State**:

   - Use `localStorage` or a backend (e.g., **Firebase**, **Node.js/Express**) to save tasks and projects
   - Example: Add `useEffect` in `TaskContext` to sync state with `localStorage`

2. **Authentication**:

   - Add user login with **Firebase Auth** or **Auth0** to support multiple users
   - Store tasks/projects per user

3. **Drag-and-Drop**:

   - Implement drag-and-drop for reordering tasks using libraries like `react-beautiful-dnd`

4. **Notifications**:

   - Add reminders for tasks due today using browser notifications

5. **Testing**:

   - Add unit tests with **Jest** and **React Testing Library** for components and reducer
   - Example: Test `TaskReducer` actions and `TaskCard` rendering

6. **Accessibility Improvements**:

   - Add `aria-label` to interactive elements (e.g., `FaEdit` in `ProjectCard`)
   - Ensure keyboard navigation for modals and collapsible sections

---

## Testing Recommendations

- **Unit Tests**:

  - Test `TaskReducer` actions (e.g., `ADD_TASK`, `DELETE_PROJECT`) with **Jest**
  - Test component rendering (e.g., `TaskCard` displays correct props) with **React Testing Library**

- **Integration Tests**:

  - Test task creation flow from `AddTaskForm` to `TasksDisplay`
  - Verify filter updates in `InboxSection` and `ProjectsSection`

- **Manual Testing**:

  - Verify task/project CRUD operations
  - Test responsive behavior on mobile (collapse/expand, form layout)
  - Check edge cases (e.g., empty project names, invalid dates)

- **Tools**:

  - Use **React DevTools** to inspect component props and state
  - Use **Chrome DevTools** for CSS and responsiveness testing

---

## Known Issues and Limitations

- **State Persistence**: Tasks and projects are not persisted across sessions (stored in memory)
- **Accessibility**: Limited `aria-label` usage; keyboard navigation for modals needs improvement
- **Performance**: Large task lists may cause re-rendering issues; consider memoizing components (`React.memo`) or optimizing `TaskReducer`
- **Edge Cases**:
  - Tasks without projects are not explicitly handled in filters
  - Long project names may overflow in `ProjectCard`

---

*Last Updated: June 5, 2025*