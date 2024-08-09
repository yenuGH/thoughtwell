import {
  Center,
  Container,
  Stack,
  Group,
  Button,
  Image,
  useMantineTheme,
  getGradient,
} from "@mantine/core";
import { useEffect, useState } from "react";

import AnimatedLayout from "../../routes/AnimatedLayout";
import { AnimatePresence, motion } from "framer-motion";

import "@fontsource/bungee";
import "@fontsource-variable/anybody";
import TitleGroup from "./widgets/titleGroup.tsx";
import RegisterGroup from "./widgets/registerGroup.tsx";
import LoginGroup from "./widgets/loginGroup.tsx";
import styles from "./landingPage.module.css";

import { Stars, Cloud } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

export function LandingPage() {
  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.9", to: "space-cadet-purple.7" },
    theme
  );

  const [showRegisterButtons, setShowRegisterButtons] = useState(true);
  const handleLoginClick = () => {
    setShowRegisterButtons((prev) => !prev);
  };
  // Could be useful in the future to fix scrolling on reload issue
  // useEffect(() => {
  //   window.scrollTo(0, 0);
  //   history.scrollRestoration = "manual";

  //   return () => {
  //     history.scrollRestoration = "auto";
  //   };
  // }, []);

  return (
    <>
      <AnimatedLayout>
        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          style={{
            background: gradient,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div className={styles.starsBackground}>
            <Canvas>
              <Stars radius={100} count={2500} factor={2} fade speed={2} />
              {/* <Cloud position={[30, 5, -5]} speed={0.2} opacity={0.2} color={"white"}/> */}
            </Canvas>
          </div>

          <Stack>
            <Container>
              {/* titleGroup.tsx */}
              <TitleGroup></TitleGroup>

              {/* registerGroup.tsx */}
              {showRegisterButtons && (
                <>
                  <RegisterGroup></RegisterGroup>

                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 1.0 } }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Center mt="lg">
                        <Button
                          size="lg"
                          color="deep-blue.9"
                          radius="xl"
                          onClick={handleLoginClick}
                        >
                          Already have an account?&nbsp;
                          <span style={{ textDecoration: "underline" }}>
                            Login
                          </span>
                        </Button>
                      </Center>
                    </motion.div>
                  </AnimatePresence>
                </>
              )}

              {/* loginGroup.tsx */}
              {!showRegisterButtons && (
                <>
                  <LoginGroup></LoginGroup>
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0, transition: { delay: 1.0 } }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Center style={{ paddingTop: "15px" }}>
                        <Button
                          size="lg"
                          color="deep-blue.9"
                          radius="xl"
                          onClick={handleLoginClick}
                        >
                          Back to&nbsp;
                          <span style={{ textDecoration: "underline" }}>
                            Register
                          </span>
                        </Button>
                      </Center>
                    </motion.div>
                  </AnimatePresence>
                </>
              )}
            </Container>

            <Center style={{ height: "50vh" }}>
              <Image
                src="../src/assets/wishingwell.png"
                height={300}
                // margin-left="50px"
                // width={250}
              />
            </Center>
          </Stack>
        </motion.section>
      </AnimatedLayout>
    </>
  );
}
