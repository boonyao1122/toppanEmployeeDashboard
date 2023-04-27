import React, { useState } from "react";
import Home from "../../Home/Homepage.js";
import Dashboard from "../../Dashboard/Dashboard.js";
import Notification from "../../Notification/Notification.js";

const Content = (props) => {
  const { classes } = props;
  const selectedItem = props.selectedItem;

  const [snackbarData, setSnackbarData] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  return (
    <div>
      <Notification
        open={snackbarData?.open}
        message={snackbarData?.message}
        severity={snackbarData?.severity}
        onClose={() => {
          setSnackbarData(null);
        }}
      />
      <main className={classes.content}>
        {selectedItem === "home" && <Home setSnackbarData={setSnackbarData} />}
        {selectedItem === "dashboard" && <Dashboard setSnackbarData={setSnackbarData} />}
      </main>
    </div>
  );
};

export default Content;
