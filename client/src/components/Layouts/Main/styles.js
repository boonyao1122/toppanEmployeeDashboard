import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  const drawerWidth = 240;
  return {
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: `0 ${theme.spacing(3)}px`,
    },
    logo: {
      padding: theme.spacing(2),
    },

    headerDiv: {
      display: "flex",
      justifyContent: "flex-end",
      // paddingRight: theme.spacing(3),
    },

    warning: {
      fontSize: theme.spacing(4),
      margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },

    notificationIcon: {
      color: "#a1e2c5",
      fontSize: theme.spacing(4),
      margin: `${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },

    profileIcon: {
      border: "solid 1px #a1e2c5",
      borderRadius: "100%",
      fontSize: theme.spacing(4),
      fontWeight: "light",
      margin: `${theme.spacing(1)}px ${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },

    navigationAppBar: {
      backgroundColor: "transparent!important",
      boxShadow: "none",
      color: "black",
    },
    navigationToolbar: {
      padding: 0,
    },

    navigationToolbarFirstBtn: {
      margin: `0 ${theme.spacing(6)}px 0 0`,
      padding: 0,
      textTransform: "unset !important",
    },
    navigationToolbarBtn: {
      margin: `0 ${theme.spacing(6)}px`,
      textTransform: "unset !important",
    },

    navigationButton: {
      marginRight: theme.spacing(2),
      color: "black",
      textTransform: "none",
      position: "relative",
      "&:after": {
        content: '""',
        position: "absolute",
        width: "100%",
        height: "2px",
        bottom: "-4px",
        left: 0,
        backgroundColor: "transparent",
        visibility: "hidden",
        transform: "scaleX(0)",
        transition: "all 0.2s ease-in-out 0s",
      },
      "&:hover": {
        color: "black",
        "&:after": {
          visibility: "visible",
          transform: "scaleX(1)",
          backgroundColor: "green",
        },
      },
      "&.active": {
        color: "black",
        "&:after": {
          visibility: "visible",
          transform: "scaleX(1)",
          backgroundColor: "green",
        },
      },
    },

    infoBoxContainer: {
      display: "flex",
    },

    infoBox: {
      display: "flex",
      flexDirection: "column",
      border: "1px solid black",
      padding: theme.spacing(2),
      marginRight: theme.spacing(2),
      "& :nth-child(1)": {
        margin: "0!important",
      },
    },

    infoBoxTitle: {
      fontSize: theme.spacing(2),
      fontWeight: "bold",
      minWidth: theme.spacing(20),
      paddingRight: theme.spacing(3),
    },
    infoBoxContent: {
      fontWeight: "bolder",
      fontSize: theme.spacing(3),
      color: "#60983E",
    },
    dayRangeContainer: {
      textAlign: "right!important",
    },
    graphContainer: {
      display: "flex",
      flexDirection: "column",
      border: "1px solid black",
      padding: theme.spacing(2),
      marginLeft: theme.spacing(1),
    },
    periodContainer: {
      textAlign: "right!important",
    },
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4),
      outline: "none",
    },

    menuButton: {
      marginRight: theme.spacing(2),
    },
  };
});
