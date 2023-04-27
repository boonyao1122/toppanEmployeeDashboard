import React, { useEffect, useState } from "react";
import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axiosInstance from "../../utils/axiosInstance";
import { useStyles } from "./styles";

const EditModal = ({ open, closeModal, employeeInfo, setSnackbarData, fetchEmployees }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [login, setLogin] = useState("");

  const classes = useStyles();

  useEffect(() => {
    if (employeeInfo) {
      setId(employeeInfo.id);
      setName(employeeInfo.name);
      setLogin(employeeInfo.login);
      setSalary(employeeInfo.salary);
    }
  }, [employeeInfo]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  };

  const resetFormAndClose = () => {
    setId("");
    setName("");
    setSalary("");
    setLogin("");
    closeModal();
  };

  const handleSave = () => {
    axiosInstance
      .patch(`users/${id}`, { id, name, salary, login })
      .then((response) => {
        if (response.status === 200) {
          setSnackbarData({
            open: true,
            message: "Saved Successfully.",
            severity: "success",
          });
        } else {
          setSnackbarData({
            open: true,
            message: "Failed to save.",
            severity: "error",
          });
        }
        fetchEmployees();
        resetFormAndClose();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Dialog open={open} onClose={closeModal} aria-labelledby="form-dialog-title">
      <Box className={classes.container}>
        <Button onClick={closeModal}>
          <Close className={classes.closeButton} />
        </Button>
        <Box className={classes.dialogContainer}>
          <DialogTitle className={classes.dialogTitle}>Edit</DialogTitle>
        </Box>
      </Box>
      <Divider />

      <Typography className={classes.title} variant="h5" gutterBottom>
        Employee Id {id}
      </Typography>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          margin="dense"
          id="salary"
          label="Salary"
          type="text"
          fullWidth
          value={salary}
          onChange={handleSalaryChange}
        />
        <TextField
          margin="dense"
          id="login"
          label="Login"
          type="text"
          fullWidth
          value={login}
          onChange={handleLoginChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave} color="primary" variant="contained" fullWidth sx={{ ml: 2, mr: 2, mb: 3 }}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
