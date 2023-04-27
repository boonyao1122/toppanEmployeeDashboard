import React from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { CloudUpload, Dashboard, Menu } from "@mui/icons-material";
import { useIsMobile } from "../../context/mobileContext";

const Sidebar = (props) => {
  const { classes, mobileOpen, selectedItem, handleListItemClick, toggleDrawer } = props;
  const isMobile = useIsMobile();

  const drawerItems = (
    <List>
      <ListItem key={"home"} onClick={(event) => handleListItemClick(event, "home")}>
        <ListItemButton selected={selectedItem === "home"}>
          <ListItemIcon>
            <CloudUpload />
          </ListItemIcon>
          <ListItemText primary="Upload" />
        </ListItemButton>
      </ListItem>

      <ListItem key={"dashboard"} onClick={(event) => handleListItemClick(event, "dashboard")}>
        <ListItemButton selected={selectedItem === "dashboard"}>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </ListItem>
    </List>
  );

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {drawerItems}
      <Divider />
    </div>
  );

  return (
    <nav>
      {isMobile ? (
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="fixed">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer(true)}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <Menu />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Toppan Ecquaria
              </Typography>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              open={mobileOpen}
              onClose={toggleDrawer(false)}
              ModalProps={{
                keepMounted: true,
              }}
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      ) : (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <img className={classes.logo} src="/images/logo.jpeg" alt="Toppan Ecquaria Logo" />
          {drawerItems}
        </Drawer>
      )}
    </nav>
  );
};

export default Sidebar;
