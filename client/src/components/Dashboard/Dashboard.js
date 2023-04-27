import React, { useState, useEffect } from "react";
import {
  TextField,
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Typography,
} from "@mui/material";
import { Delete, Edit, ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
import { useIsMobile } from "../../context/mobileContext";
import EditModal from "../EditModal/EditModal.js";
import DeleteModal from "../DeleteModal/DeleteModal";
import { useStyles } from "./styles";

const Dashboard = (props) => {
  const { setSnackbarData } = props;
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [sortColumn, setSortColumn] = useState("id");
  const [sortOrder, setSortOrder] = useState("+");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [editOpen, setEditOpen] = useState(false);
  const [editInfo, setEditInfo] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(false);

  const isMobile = useIsMobile();
  const limit = 30;

  const classes = useStyles();

  const fetchEmployees = async () => {
    const response = await axiosInstance.get("/users", {
      params: {
        minSalary: minSalary || 0,
        maxSalary: maxSalary || 0,
        offset: Math.abs((currentPage - 1) * limit),
        limit,
        sort: `${sortOrder}${sortColumn}`,
      },
    });
    setEmployees(response.data.results);

    let totalPage = Math.ceil(response.data.total / limit);
    if (totalPage === 0) {
      totalPage = 1;
    }

    setTotalPages(totalPage);

    if (currentPage > totalPage) {
      setCurrentPage(totalPage);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [minSalary, maxSalary, sortColumn, sortOrder, currentPage]);

  const handleMinSalaryChange = (event) => {
    setMinSalary(event.target.value);
  };

  const handleMaxSalaryChange = (event) => {
    setMaxSalary(event.target.value);
  };

  const handleDelete = (employeeId) => {
    setDeleteId(employeeId);
    setDeleteOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditInfo(null);
    setEditOpen(false);
  };

  const handleCloseDeleteModal = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleEdit = async (employeeId) => {
    axiosInstance
      .get(`users/${employeeId}`)
      .then((response) => {
        const { name, salary, login } = response.data;
        setEditInfo({ id: employeeId, name, salary, login });
        setEditOpen(true);
      })
      .catch((error) => console.log(error));
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "+" ? "-" : "+");
    } else {
      setSortColumn(column);
      setSortOrder("+");
    }
    setCurrentPage(1);
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box className={classes.container} sx={{ mt: isMobile ? 10 : 4 }}>
      <Box className={classes.filterContainer} sx={{ flexWrap: isMobile ? "wrap" : "nowrap" }}>
        <TextField
          label="Minimum Salary"
          variant="outlined"
          value={minSalary}
          onChange={handleMinSalaryChange}
          className={classes.mx2}
          type="number"
          inputProps={{ min: 0 }}
        />
        <Box sx={{ mx: 2, display: isMobile ? "block" : "inline-block" }} />
        <TextField
          label="Maximum Salary"
          variant="outlined"
          value={maxSalary}
          onChange={handleMaxSalaryChange}
          className={classes.mx2}
          type="number"
          inputProps={{ min: 0 }}
        />
        <Box className={classes.mx2} sx={{ display: isMobile ? "block" : "inline-block" }} />
        {!isMobile && (
          <Button className={classes.mx2} variant="contained" onClick={fetchEmployees}>
            Filter
          </Button>
        )}
      </Box>
      <Box className={classes.dataTableContainer}>
        <Typography variant="h5" gutterBottom>
          Employees
        </Typography>
        {employees.length === 0 ? (
          <Box className={classes.dataTableNoContentContainer}>
            <Typography>No data found</Typography>
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: isMobile ? 0 : 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => handleSort("id")} sx={{ cursor: "pointer" }}>
                    ID
                    {sortColumn === "id" && (
                      <Box component="span" sx={{ ml: 0 }}>
                        {sortOrder === "+" ? <ArrowDropDown /> : <ArrowDropUp />}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell onClick={() => handleSort("name")} sx={{ cursor: "pointer" }}>
                    Name
                    {sortColumn === "name" && (
                      <Box component="span" sx={{ ml: 1, alignItems: "flex-start" }}>
                        {sortOrder === "+" ? <ArrowDropDown /> : <ArrowDropUp />}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell onClick={() => handleSort("login")} sx={{ cursor: "pointer" }}>
                    Login
                    {sortColumn === "login" && (
                      <Box component="span" sx={{ ml: 1 }}>
                        {sortOrder === "+" ? <ArrowDropDown /> : <ArrowDropUp />}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell onClick={() => handleSort("salary")} sx={{ cursor: "pointer" }}>
                    Salary
                    {sortColumn === "salary" && (
                      <Box component="span" sx={{ ml: 1 }}>
                        {sortOrder === "+" ? <ArrowDropDown /> : <ArrowDropUp />}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell component="th" scope="row">
                      {employee.id}
                    </TableCell>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.login}</TableCell>
                    <TableCell>{employee.salary}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={() => handleEdit(employee.id)}>
                        <Edit />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => handleDelete(employee.id)}>
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box className={classes.paginationContainer}>
        <Pagination count={totalPages || 1} page={currentPage} onChange={handlePageChange} variant="outlined" />
      </Box>
      <EditModal
        open={editOpen}
        closeModal={handleCloseEditModal}
        employeeInfo={editInfo}
        setSnackbarData={setSnackbarData}
        fetchEmployees={fetchEmployees}
      />
      <DeleteModal
        open={deleteOpen}
        employeeId={deleteId}
        closeModal={handleCloseDeleteModal}
        setSnackbarData={setSnackbarData}
        fetchEmployees={fetchEmployees}
      />
    </Box>
  );
};

export default Dashboard;
