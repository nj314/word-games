import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Container, CssBaseline, Paper } from "@mui/material";
import NerdleGame from "./NerdleGame";

const theme = createTheme({ palette: { mode: "dark" } });

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper elevation={0}>
          <NerdleGame />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
