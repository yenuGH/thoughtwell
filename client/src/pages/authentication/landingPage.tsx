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
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AnimatedLayout from "../../routes/AnimatedLayout";

import { AnimatePresence, motion } from "framer-motion";
import RegisterGroup from "./registerGroup.tsx";
import LoginGroup from "./loginGroup.tsx";

export function LandingPage() {
  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.9", to: "space-cadet-purple.7" },
    theme
  );

  const navigate = useNavigate();

  const [showRegisterButtons, setShowRegisterButtons] = useState(true);
  const handleLoginClick = () => {
    setShowRegisterButtons(false);
  };

  return (
    <>
      <AnimatedLayout>
        <div style={{ background: gradient }}>
          <Stack>
            <Container>
              <Center>
                <h1 style={{ color: theme.colors.indigo[1] }}>
                  Welcome to Thoughtwell!
                </h1>
              </Center>

              {/* registerGroup.tsx */}
              {/* <AnimatePresence> */}
              {showRegisterButtons && (
                <>
                  {/* <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    > */}
                  <RegisterGroup></RegisterGroup>
                  {/* </motion.div> */}

                  <Center mt="lg">
                    <Button
                      size="lg"
                      color="deep-blue.9"
                      radius="xl"
                      onClick={handleLoginClick}
                    >
                      Already have an account?&nbsp;{" "}
                      <span style={{ textDecoration: "underline" }}>
                        {" "}
                        Login
                      </span>
                    </Button>
                  </Center>
                </>
              )}

              {!showRegisterButtons && (
                <>
                  <LoginGroup></LoginGroup>
                </>
              )}

              {/* <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button
                  size="md"
                  color="deep-blue.3"
                  style={{ marginLeft: "10px" }}
                  onClick={() => navigate("/main")}
                >
                  Continue as Guest
                </Button>
              </motion.div> */}
            </Container>

            <Group justify="center"></Group>

            <Center style={{ height: "80vh" }}>
              <Image
                src="../src/assets/wishingwell.png"
                height={300}
                // margin-left="50px"
                // width={250}
              />
            </Center>
          </Stack>
        </div>
      </AnimatedLayout>
    </>
  );
}
