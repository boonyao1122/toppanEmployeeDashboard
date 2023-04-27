import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      marginLeft: "5%",
      marginTop: "2%",
    },
    closeButton: {
      margin: "0 5%",
    },
    dialogContainer: {
      width: "70%",
    },
    dialogTitle: {
      textAlign: "center",
    },
  };
});
