import React from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const DeleteModal = ({ open, employeeId, closeModal, setSnackbarData, fetchEmployees }) => {
  const handleConfirm = () => {
    axiosInstance.delete(`users/${employeeId}`).then(
      (res) => {
        if (res.status === 200) {
          setSnackbarData({
            open: true,
            message: res.data.message,
            severity: "success",
          });
          fetchEmployees();
        }
      },
      (error) => console.log(error)
    );
    closeModal();
  };

  return (
    <div>
      <Dialog open={open} onClose={closeModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete {employeeId} employee?</DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button onClick={handleConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
