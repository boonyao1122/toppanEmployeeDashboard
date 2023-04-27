import React, { useState } from "react";
import Content from "../Contents/Content.js";
import { Grid } from "@mui/material";
import { useStyles } from "./styles";
import Sidebar from "../../Sidebar/Sidebar.js";
import { MobileProvider } from "../../../context/mobileContext.js";

const Main = () => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleDrawer = (mobileOpen) => (event) => {
    setMobileOpen(mobileOpen);
  };

  const handleListItemClick = (event, text) => {
    setSelectedItem(text);
  };
  return (
    <MobileProvider>
      <div className={classes.root}>
        <Sidebar
          classes={classes}
          selectedItem={selectedItem}
          handleListItemClick={handleListItemClick}
          mobileOpen={mobileOpen}
          toggleDrawer={toggleDrawer}
        />
        <Grid item xs={12} width={"100%"}>
          <Content classes={classes} selectedItem={selectedItem}></Content>
        </Grid>
      </div>
    </MobileProvider>
  );
};

export default Main;
