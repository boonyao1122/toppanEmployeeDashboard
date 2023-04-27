import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 50,
      width: "100%",
    },
    container: {
      position: "absolute",
      top: "25%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center",
    },
    input: {
      display: "none",
    },
    button: {
      marginTop: `${theme.spacing(4)}!important`,
    },
    card: {
      width: "80%",
      marginTop: theme.spacing(3),
    },
    iconButton: {
      marginLeft: 10,
    },
  };
});
