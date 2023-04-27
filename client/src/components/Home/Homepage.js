import React, { useRef, useState } from "react";
import { Button, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";

import Papa from "papaparse";
import { useStyles } from "./styles";
import axiosInstance from "../../utils/axiosInstance";

const Home = ({ setSnackbarData }) => {
  const classes = useStyles();

  const inputRef = useRef(null);
  const [csvData, setCsvData] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateData = (data) => {
    const newData = data.slice(1);
    const cleanData = [];
    for (let i = 0; i < newData.length; i++) {
      const dataRow = newData[i];
      const id = dataRow[0];
      if (!id.startsWith("#")) {
        cleanData.push(dataRow);
      }
    }
    return cleanData;
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: (results) => {
        // validate file
        const filteredData = validateData(results.data);

        let finalData = {};
        finalData.file = file;
        finalData.data = filteredData;

        setCsvData(finalData);
      },
      error: (e) => {
        console.log("failed to parse", file.name);
      },
    });
  };

  const resetInput = () => {
    setCsvData(null);
  };

  const handleSubmit = () => {
    setLoading(true);

    const file = csvData.file;
    let formData = new FormData();
    formData.append("file", file);

    axiosInstance
      .post("users/upload/", formData)
      .then((response) => {
        if (response.status === 200) {
          setSnackbarData({
            open: true,
            message: "File uploaded successfully!",
            severity: "success",
          });
          resetInput();
        } else {
          setSnackbarData({
            open: true,
            message: "Failed to upload file!",
            severity: "error",
          });
        }
      })
      .catch((error) => {
        console.error(error);
        setSnackbarData({
          open: true,
          message: "An error occurred while uploading the file!",
          severity: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Typography variant="h5" gutterBottom>
          Upload CSV File
        </Typography>
        <input
          accept=".csv"
          className={classes.input}
          id="contained-button-file"
          multiple={false}
          type="file"
          ref={inputRef}
          onChange={handleUpload}
        />
        <label
          htmlFor="contained-button-file"
          onClick={() => {
            inputRef.current.value = "";
          }}
        >
          <Button
            variant="contained"
            color="primary"
            component="span"
            className={classes.button}
            startIcon={<CloudUpload />}
          >
            Choose File
          </Button>
        </label>
        {csvData && (
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Basic Details of Uploaded CSV
              </Typography>
              <Typography variant="body1" gutterBottom>
                File Name: {csvData.file.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                File Size: {csvData.file.size} bytes
              </Typography>
              <Typography variant="body1" gutterBottom>
                Number of rows: {csvData.data.length}
              </Typography>

              <Button
                variant="outlined"
                color="error"
                onClick={resetInput}
                className={classes.iconButton}
                startIcon={<Delete />}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        )}
        {csvData && (
          <div className={classes.buttonWrapper}>
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              disabled={loading}
              className={classes.button}
              startIcon={loading ? <CircularProgress color="inherit" size={20} /> : <CloudUpload />}
            >
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
