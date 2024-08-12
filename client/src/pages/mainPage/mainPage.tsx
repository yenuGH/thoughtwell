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
} from "@mantine/core";

import AnimatedLayout from "../../routes/AnimatedLayout.tsx";
import DepositButton from "../../widgets/deposit/depositButton.tsx";
import WithdrawButton from "../../widgets/withdraw/withdrawButton.tsx";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SignOutGroup from "../../widgets/signOutGroup.tsx";
import { AnimatePresence, motion } from "framer-motion";

export function MainPage() {
  // useEffect(() => {
  //   document.title = "Thoughtwell";
  // }, []);

  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );

  const navigate = useNavigate();

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
                <Container style={{ marginTop: "100px" }}>
                  <Center>
                    <h1 style={{ textAlign: "center" }}>
                      How would you like to interact today?
                    </h1>
                  </Center>
                </Container>

                <Group justify="center" gap="xl">
                  <DepositButton />

                  <WithdrawButton />
                </Group>

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
