import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { ThemeProvider } from "@mui/styles";
import { theme } from "./theme";
import Main from "./components/Layouts/Main/Main.js";

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Main />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
