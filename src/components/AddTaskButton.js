import React from "react";
import { Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const AddTaskButton = ({ onClick }) => {
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        sx={{
          borderRadius: "50%",
          width: 60,
          height: 60,
          minWidth: 0,
          minHeight: 0,
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        onMouseEnter={() => setShowMessage(true)}
        onMouseLeave={() => setShowMessage(false)}
      >
        <AddIcon sx={{ fontSize: 36 }} />
      </Button>
      {showMessage && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            backgroundColor: "#f0f0f0",
            padding: "5px 10px",
            borderRadius: 5,
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            zIndex: 9999,
          }}
        >
          Add New Task
        </div>
      )}
    </>
  );
};

export default AddTaskButton;
