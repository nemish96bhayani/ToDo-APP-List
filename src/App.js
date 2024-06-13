import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import SignupForm from "./components/SignupForm";
import SigninForm from "./components/SigninForm";
import TaskList from "./components/TaskList";
import AddTaskButton from "./components/AddTaskButton";
import TaskForm from "./components/TaskForm";
import EditTaskForm from "./components/EditTaskForm";
import ViewTaskDetails from "./components/ViewTaskDetails";
import ForgotPasswordForm from "./components/ForgotPasswordForm";

const App = () => {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [isEditTaskFormOpen, setIsEditTaskFormOpen] = useState(false);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleSignup = (newUsername) => {
    setUsername(newUsername);
    setIsSignedUp(true);
  };

  const handleSignin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setTasks([]);
    setIsTaskFormOpen(false);
    setIsEditTaskFormOpen(false);
    setIsTaskDetailsOpen(false);
    setSelectedTask(null);
  };

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsTaskFormOpen(false);
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.name === updatedTask.name ? updatedTask : task
      )
    );
    setIsEditTaskFormOpen(false);
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.name !== taskToDelete.name)
    );
  };

  const handleViewTaskDetails = (task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  const handleEditTaskClick = (task) => {
    setSelectedTask(task);
    setIsEditTaskFormOpen(true);
  };

  return (
    <Router>
      <div className="p-4">
        <Routes>
          <Route
            path="/signup"
            element={
              isSignedUp ? (
                <Navigate to="/signin" replace />
              ) : (
                <SignupForm onSignup={handleSignup} />
              )
            }
          />
          <Route
            path="/signin"
            element={
              loggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <SigninForm onSignin={handleSignin} />
              )
            }
          />
          <Route path="/forgot-password" element={<ForgotPasswordForm />} />
          <Route
            path="/"
            element={
              loggedIn ? (
                <>
                  <TaskList
                    tasks={tasks}
                    onDeleteTask={handleDeleteTask}
                    onEditTask={handleEditTaskClick}
                    onViewTaskDetails={handleViewTaskDetails}
                    onAddTask={handleAddTask}
                    handleLogout={handleLogout} // Pass handleLogout to TaskList
                  />
                  <AddTaskButton onClick={() => setIsTaskFormOpen(true)} />
                  <TaskForm
                    open={isTaskFormOpen}
                    onClose={() => setIsTaskFormOpen(false)}
                    onAddTask={handleAddTask}
                  />
                  <EditTaskForm
                    open={isEditTaskFormOpen}
                    onClose={() => setIsEditTaskFormOpen(false)}
                    task={selectedTask}
                    onUpdateTask={handleEditTask}
                  />
                  <ViewTaskDetails
                    open={isTaskDetailsOpen}
                    onClose={() => setIsTaskDetailsOpen(false)}
                    task={selectedTask}
                  />
                </>
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
