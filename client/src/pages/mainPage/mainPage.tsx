import {
  Center,
  Container,
  Stack,
  Group,
  Button,
  Textarea,
  Text,
  Image,
  useMantineTheme,
  getGradient,
  UnstyledButton,
  Flex,
  Box,
} from "@mantine/core";

import AnimatedLayout from "../../routes/AnimatedLayout.tsx";
// import DepositPage from "../../widgets/deposit/depositUI.tsx";
// import WithdrawButton from "../withdraw/withdrawPage.tsx";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignOutGroup from "../../widgets/signOutGroup.tsx";
import { AnimatePresence, motion } from "framer-motion";

export function MainPage() {
  // useEffect(() => {
  //   document.title = "Thoughtwell";
  // }, []);

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );

  const handleInterfaceClick = (interfaceType: "deposit" | "withdraw") => {
    if (interfaceType === "deposit") {
      navigate("/deposit");
    } else if (interfaceType === "withdraw") {
      navigate("/withdraw");
    }
  };

  return (
    <>
      <AnimatedLayout>
        <div style={{ background: gradient }}>
          <AnimatePresence>
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
              <Flex
                justify="flex-end"
                style={{
                  paddingTop: "0px",
                  paddingRight: "20px",
                  textAlign: "right",
                }}
              >
                <SignOutGroup></SignOutGroup>
              </Flex>

              <Stack>
                <>
                  <Container style={{ marginTop: "100px" }}>
                    <Center>
                      <h1 style={{ textAlign: "center" }}>
                        How would you like to interact today?
                      </h1>
                    </Center>
                  </Container>

                  <Group justify="center" gap="xl">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        size="xl"
                        color="teal.6"
                        radius="xl"
                        variant="filled"
                        style={{ color: "white" }}
                        onClick={() => handleInterfaceClick("deposit")}
                      >
                        Deposit
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        size="xl"
                        color="red.6"
                        radius="xl"
                        variant="filled"
                        style={{ color: "white" }}
                        onClick={() => {
                          handleInterfaceClick("withdraw");
                        }}
                      >
                        Withdraw
                      </Button>
                    </motion.div>

                    {/* <Box
                      style={{
                        backgroundColor: "#1c7ed6", // Replace with your theme color if needed
                        color: "white",
                        padding: "10px 15px",
                        borderRadius: "20px",
                        maxWidth: "75%",
                        margin: "10px 0",
                        wordWrap: "break-word",
                        position: "relative",
                      }}
                    >
                      <Text>
                        ASdjaklfjkldjfkl jldkfj klasdjflkj aldkfj
                        klasdfjklasjdflkdsjflkj
                      </Text>
                      <div
                        style={{
                          content: '""',
                          position: "absolute",
                          bottom: "-16px",
                          right: "8px",
                          borderWidth: "10px",
                          borderStyle: "solid",
                          borderColor:
                            "#1c7ed6 transparent transparent transparent", // Replace with your theme color if needed
                        }}
                      />
                    </Box> */}

                  </Group>
                </>

                <Center style={{ height: "80vh" }}>
                  {/* <Image
                src="../src/assets/birdseyewell.png"
                height={900}
                // margin-left="50px"
                // width={250}
              /> */}
                </Center>
              </Stack>
            </motion.section>
          </AnimatePresence>
        </div>
      </AnimatedLayout>
    </>
  );
}
