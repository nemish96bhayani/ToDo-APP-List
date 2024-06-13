import React from "react";
import {
  Modal,
  Button,
  Chip,
  Typography,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import PropTypes from "prop-types";

const ViewTaskDetails = ({ open, onClose, task }) => {
  if (!task) return null;

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
          sx={{
            width: 400,
            maxWidth: "100%",
            maxHeight: "100%",
            overflowY: "auto",
          }}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the card
        >
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              {task.name}
            </Typography>
            <Typography variant="body1">
              <strong>Description:</strong> {task.description}
            </Typography>
            <Typography variant="body1">
              <strong>Deadline:</strong> {task.deadline}
            </Typography>
            <Box mt={2}>
              <Typography variant="body1">
                <strong>Categories:</strong>
              </Typography>
              <Box display="flex" flexWrap="wrap" mt={1}>
                {task.categories.map((category) => (
                  <Chip
                    key={category}
                    label={category}
                    color="primary"
                    variant="outlined"
                    className="m-1"
                  />
                ))}
              </Box>
            </Box>
            <Box mt={3} display="flex" justifyContent="center">
              <Button variant="contained" onClick={onClose} color="primary">
                Close
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

ViewTaskDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  task: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ViewTaskDetails;
