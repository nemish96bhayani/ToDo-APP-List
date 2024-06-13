import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardHeader,
  Button,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircleOutline,
  FileCopy as CopyIcon,
  PushPin as PinIcon,
  PushPinOutlined as UnpinIcon,
} from "@mui/icons-material";
import EditTaskForm from "./EditTaskForm";
import ViewTaskDetails from "./ViewTaskDetails";
import { useNavigate } from "react-router-dom";

const TaskList = ({
  tasks,
  setTasks,
  handleLogout, // Added handleLogout prop
}) => {
  const [editTask, setEditTask] = useState(null);
  const [viewTask, setViewTask] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [pinnedTasks, setPinnedTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const navigate = useNavigate();

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  const handleViewTask = (task) => {
    setViewTask(task);
  };

  const handleDeleteTask = (taskToDelete) => {
    const updatedTasks = tasks.filter((task) => task !== taskToDelete);
    setTasks(updatedTasks);
    setCompletedTasks(completedTasks.filter((task) => task !== taskToDelete));
    setPinnedTasks(pinnedTasks.filter((task) => task !== taskToDelete));
    // showConfirmationMessage("Task deleted successfully!");
  };

  const handleMarkAsDone = (task) => {
    const updatedCompletedTasks = completedTasks.includes(task)
      ? completedTasks.filter((t) => t !== task)
      : [...completedTasks, task];
    setCompletedTasks(updatedCompletedTasks);
    // showConfirmationMessage("Task marked as done!");
  };

  const handleUpdateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) =>
      task.name === updatedTask.name ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditTask(null);
    // showConfirmationMessage("Task updated successfully!");
  };

  const handleDuplicateTask = (taskToDuplicate) => {
    const duplicatedTask = {
      ...taskToDuplicate,
      name: `${taskToDuplicate.name} (Copy)`,
    };
    setTasks([...tasks, duplicatedTask]);
    // showConfirmationMessage("Task duplicated successfully!");
  };

  const handlePinTask = (task) => {
    if (pinnedTasks.includes(task)) {
      setPinnedTasks(pinnedTasks.filter((t) => t !== task));
      // showConfirmationMessage("Task unpinned!");
    } else {
      if (pinnedTasks.length < 3) {
        setPinnedTasks([task, ...pinnedTasks]);
        // showConfirmationMessage("Task pinned!");
      } else {
        alert("You can pin a maximum of 3 tasks.");
      }
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filterCategory && task.categories.indexOf(filterCategory) === -1) {
      return false;
    }
    if (
      searchTerm &&
      task.name.toLowerCase().indexOf(searchTerm.toLowerCase()) === -1
    ) {
      return false;
    }
    return true;
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Card
        style={{
          width: "1000px",
          maxWidth: "100%",
          padding: "20px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <CardHeader
          title="ToDo-List-App"
          style={{
            textAlign: "center",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#3f51b5",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          action={
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout} // Call handleLogout on button click
            >
              Logout
            </Button>
          }
        />
        <CardContent>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <TextField
              label="Search"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 3, marginRight: "10px" }}
            />
            <FormControl variant="outlined" size="small" style={{ flex: 1 }}>
              <InputLabel>Filter Category</InputLabel>
              <Select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                label="Filter Category"
                style={{ width: "100%" }}
              >
                <MenuItem value="">All</MenuItem>
                {[
                  "Home",
                  "Work",
                  "Personal",
                  "Health/Fitness",
                  "Education",
                ].map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <List style={{ width: "100%" }}>
            {/* Render Pinned Tasks */}
            {pinnedTasks.map((task, index) => (
              <ListItem
                key={index}
                onClick={() => handleViewTask(task)}
                style={{
                  backgroundColor: "#f0f0f0",
                  margin: "8px 0",
                  minHeight: "80px",
                }}
              >
                <ListItemText
                  primary={
                    <span>
                      <PinIcon style={{ color: "orange", marginRight: 5 }} />
                      {task.name}
                    </span>
                  }
                  secondary={`Deadline: ${task.deadline}`}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" onClick={() => handleEditTask(task)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="end" onClick={() => handleDeleteTask(task)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMarkAsDone(task);
                    }}
                  >
                    <CheckCircleOutline
                      color={
                        completedTasks.includes(task) ? "primary" : "inherit"
                      }
                    />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => handleDuplicateTask(task)}
                  >
                    <CopyIcon />
                  </IconButton>
                  <Tooltip title="Unpin Task">
                    <IconButton
                      edge="end"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePinTask(task);
                      }}
                    >
                      <UnpinIcon />
                    </IconButton>
                  </Tooltip>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {/* Render Unpinned Tasks */}
            {filteredTasks.map((task, index) => {
              if (!pinnedTasks.includes(task)) {
                return (
                  <ListItem
                    key={index}
                    onClick={() => handleViewTask(task)}
                    style={{
                      backgroundColor: completedTasks.includes(task)
                        ? "#8bc34a"
                        : "white",
                      margin: "8px 0",
                      minHeight: "80px",
                    }}
                  >
                    <ListItemText
                      primary={task.name}
                      secondary={`Deadline: ${task.deadline}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        onClick={() => handleEditTask(task)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDeleteTask(task)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleMarkAsDone(task);
                        }}
                      >
                        <CheckCircleOutline
                          color={
                            completedTasks.includes(task)
                              ? "primary"
                              : "inherit"
                          }
                        />
                      </IconButton>
                      <IconButton
                        edge="end"
                        onClick={() => handleDuplicateTask(task)}
                      >
                        <CopyIcon />
                      </IconButton>
                      <Tooltip title="Pin Task">
                        <IconButton
                          edge="end"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePinTask(task);
                          }}
                        >
                          <PinIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              }
              return null;
            })}
          </List>
        </CardContent>
      </Card>
      {editTask && (
        <EditTaskForm
          task={editTask}
          onUpdateTask={handleUpdateTask}
          onCancel={() => setEditTask(null)}
        />
      )}
      {viewTask && (
        <ViewTaskDetails
          task={viewTask}
          onClose={() => setViewTask(null)}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      )}
    </div>
  );
};

export default TaskList;
