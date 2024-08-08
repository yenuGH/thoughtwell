import "./App.css";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider, Stack } from "@mantine/core";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { HomePage } from "../pages/homePage/homePage";
import { Header } from "../widgets/header/header";
import { Footer } from "../widgets/footer/footer";

import { firebaseController } from "../controllers/firebaseController";

export default function App() {
  // initialize firebase controller on app start
  firebaseController.initialize();

  const myTheme = createTheme({
    colors: {
      'space-cadet-purple': [
        "#f3f2f8",
        "#e3e1e9",
        "#c6bfd5",
        "#a79cc1",
        "#8c7eb0",
        "#7c6ba6",
        "#7461a2",
        "#63508e",
        "#58487f",
        "#4c3d71"
      ],
      'deep-blue': [
        "#f2f3f7",
        "#e3e4e8",
        "#c4c5d1",
        "#a3a6bb",
        "#868aa8",
        "#73799e",
        "#6a7199",
        "#5a6085",
        "#4f5578",
        "#42496b"
      ],
      'pale-blue': [
        "#eef3ff",
        "#dce4f5",
        "#b9c7e2",
        "#94a8d0",
        "#748dc1",
        "#5f7cb8",
        "#5474b4",
        "#44639f",
        "#39588f",
        "#2d4b81"
      ],
      'tea-green': [
        "#f0fde8",
        "#e3f7d6",
        "#c6edad",
        "#a7e381",
        "#8ddb5c",
        "#7cd644",
        "#73d337",
        "#61bb28",
        "#54a620",
        "#448f14"
      ],

    },
    primaryColor: 'space-cadet-purple',
    defaultRadius: 0,
  });

  const location = useLocation();

  return (
    <MantineProvider theme={myTheme}>
      <Stack gap={0} style={{ backgroundColor: '#5a6085' }}>
        {/* <Header /> */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transform: 'translateY(50%)' }}
            transition={{ duration: 0.5 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
        <Footer />
      </Stack>
    </MantineProvider>
  );
}