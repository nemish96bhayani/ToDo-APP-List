import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  TextField,
  Select,
  MenuItem,
  Chip,
  InputLabel,
  Box,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import PropTypes from "prop-types";

const EditTaskForm = ({ open, onClose, task, onUpdateTask }) => {
  const [updatedTask, setUpdatedTask] = useState({
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

  useEffect(() => {
    if (task) {
      setUpdatedTask(task);
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleCategoriesChange = (event) => {
    const selectedCategories = event.target.value;
    if (selectedCategories.length > 3) {
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        categories: selectedCategories.slice(0, 3),
      }));
    } else {
      setUpdatedTask((prevTask) => ({
        ...prevTask,
        categories: selectedCategories,
      }));
    }
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setUpdatedTask((prevTask) => ({
      ...prevTask,
      categories: prevTask.categories.filter(
        (category) => category !== categoryToRemove
      ),
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errorsCopy = {};

    if (!updatedTask.name.trim()) {
      errorsCopy.name = "Name is required";
      valid = false;
    } else {
      errorsCopy.name = "";
    }

    if (!updatedTask.description.trim()) {
      errorsCopy.description = "Description is required";
      valid = false;
    } else {
      errorsCopy.description = "";
    }

    if (!updatedTask.deadline.trim()) {
      errorsCopy.deadline = "Deadline is required";
      valid = false;
    } else {
      errorsCopy.deadline = "";
    }

    if (updatedTask.categories.length === 0) {
      errorsCopy.categories = "At least one category is required";
      valid = false;
    } else {
      errorsCopy.categories = "";
    }

    setErrors(errorsCopy);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      onUpdateTask(updatedTask);
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
              Edit Task
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box mb={3}>
                <TextField
                  label="Task Name"
                  variant="outlined"
                  fullWidth
                  name="name"
                  value={updatedTask.name}
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
                  value={updatedTask.description}
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
                  value={updatedTask.deadline}
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
                  value={updatedTask.categories}
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
                          onDelete={() => handleRemoveCategory(category)}
                          color="primary"
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
                {updatedTask.categories.length >= 3 && (
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
                Update Task
              </Button>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

EditTaskForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
  onUpdateTask: PropTypes.func.isRequired,
};

EditTaskForm.defaultProps = {
  task: {
    name: "",
    description: "",
    deadline: "",
    categories: [],
  },
};

export default EditTaskForm;
