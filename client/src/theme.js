import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  spacing: 8,
  palette: {
    primary: {
      main: "#1e88e5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  typography: {
    fontFamily: "Roboto",
    fontSize: 14,
  },
});
