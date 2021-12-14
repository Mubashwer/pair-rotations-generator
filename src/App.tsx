import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useMemo } from "react";
import RotationsGenerator from "./features/pairRotations/RotationsGenerator";

const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky">
        <Container maxWidth="lg" component="section">
          <Toolbar disableGutters component="section">
            <Typography variant="h5" component="h1" noWrap>
              Pair Rotations Generator
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <main>
        <Container maxWidth="lg" component="section" sx={{ paddingY: 3 }}>
          <RotationsGenerator />
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default App;
