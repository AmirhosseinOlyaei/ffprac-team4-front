import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";

const SuccessAlert = ({ open, onClose, editMode }) => {
  const handleYes = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ color: "green" }}>Success!</DialogTitle>
      <DialogContent>
        {editMode ? (
          <Typography>
            Your toy listing has been updated successfully. Do you want to
            create one more listing?
          </Typography>
        ) : (
          <Typography>
            Your toy listing has been created successfully. Do you want to
            create one more listing?
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Link to="/create">
          <Button
            onClick={handleYes}
            variant="contained"
            sx={{
              backgroundColor: "rgba(33, 150, 243, 0.8)",
              "&:hover": {
                backgroundColor: "#0e8df2",
              },
            }}
          >
            Yes
          </Button>
        </Link>
        <Link to="/toys">
          <Button
            variant="contained"
            sx={{
              backgroundColor: "darkgray",
              "&:hover": {
                backgroundColor: "#808080",
              },
              color: "#FFFFFF",
            }}
          >
            No
          </Button>
        </Link>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessAlert;
