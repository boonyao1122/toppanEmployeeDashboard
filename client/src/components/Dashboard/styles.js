import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => {
  return {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    filterContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    mx2: {
      margin: `0 ${theme.spacing(2)}!important`,
    },
    dataTableContainer: {
      marginTop: theme.spacing(4),
      minWidth: "60%",
      maxWidth: "100%",
      minHeight: "400px",
    },
    dataTableNoContentContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "30vh",
    },
    paginationContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: theme.spacing(2),
    },
  };
});
