import "./App.css";
import "@mantine/core/styles.css";
import { MantineProvider, Stack } from "@mantine/core";

import { HomePage } from "./pages/homePage/homePage";
import { Header } from "./widgets/header/header";

import { firebaseController } from "./controllers/firebaseController";

export default function App() {
  // initialize firebase controller on app start
  firebaseController.initialize();

  return (
    <MantineProvider defaultColorScheme="dark">
      <>
        <Stack gap={0} p="md">
          <Header />
          <HomePage />
        </Stack>
      </>
    </MantineProvider>
  );
}
