import React, { useState } from "react";
import {
  Button,
  Modal,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import PropTypes from "prop-types";

const TaskForm = ({ open, onClose, onAddTask }) => {
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    deadline: "",
    categories: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    deadline: "",
    categories: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCategoriesChange = (event) => {
    const selectedCategories = event.target.value;
    setNewTask((prevTask) => ({
      ...prevTask,
      categories:
        selectedCategories.length > 3
          ? selectedCategories.slice(0, 3)
          : selectedCategories,
    }));
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setNewTask((prevTask) => ({
      ...prevTask,
      categories: prevTask.categories.filter(
        (category) => category !== categoryToRemove
      ),
    }));
  };

  const validateForm = () => {
    const errorsCopy = {};
    let valid = true;

    if (!newTask.name.trim()) {
      errorsCopy.name = "Name is required";
      valid = false;
    }
    if (!newTask.description.trim()) {
      errorsCopy.description = "Description is required";
      valid = false;
    }
    if (!newTask.deadline.trim()) {
      errorsCopy.deadline = "Deadline is required";
      valid = false;
    }
    if (newTask.categories.length === 0) {
      errorsCopy.categories = "At least one category is required";
      valid = false;
    }

    setErrors(errorsCopy);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onAddTask(newTask);
      setNewTask({
        name: "",
        description: "",
        deadline: "",
        categories: [],
      });
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        onClick={onClose} // Close when clicking outside the card
      >
        <Card
          sx={{ width: 400, height: 600 }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
        >
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Add New Task
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextField
                  label="Task Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={newTask.name}
                  onChange={handleChange}
                  error={!!errors.name}
                  helperText={errors.name}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  label="Task Description"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Box>
              <Box mb={3}>
                <TextField
                  label="Task Deadline"
                  type="date"
                  variant="outlined"
                  fullWidth
                  name="deadline"
                  value={newTask.deadline}
                  onChange={handleChange}
                  error={!!errors.deadline}
                  helperText={errors.deadline}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box mb={3}>
                <InputLabel>Category</InputLabel>
                <Select
                  sx={{ width: "100%" }}
                  name="categories"
                  multiple
                  value={newTask.categories}
                  onChange={handleCategoriesChange}
                  error={!!errors.categories}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                      },
                    },
                  }}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((category) => (
                        <Chip
                          key={category}
                          label={category}
                          color="primary"
                          style={{ cursor: "default" }} // Disable hover effects
                        />
                      ))}
                    </Box>
                  )}
                >
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
                {errors.categories && (
                  <Typography color="error">{errors.categories}</Typography>
                )}
                {newTask.categories.length >= 3 && (
                  <Typography color="error">
                    Maximum 3 categories allowed
                  </Typography>
                )}
              </Box>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Add Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

TaskForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddTask: PropTypes.func.isRequired,
};

export default TaskForm;
