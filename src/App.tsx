import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import RotationsGenerator from "./features/pairRotations/RotationsGenerator";

const App = () => (
  <>
    <AppBar title="Pair Rotations Generator" position="sticky">
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
  </>
);

export default App;
