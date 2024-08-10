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
} from "@mantine/core";

import AnimatedLayout from "../../routes/AnimatedLayout.tsx";
import DepositButton from "../../widgets/deposit/depositButton.tsx";
import WithdrawButton from "../../widgets/withdraw/withdrawButton.tsx";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function HomePage() {
  // useEffect(() => {
  //   document.title = "Thoughtwell";
  // }, []);

  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );
  const [currentUser, updateCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        updateCurrentUser(user);
      } else {
        updateCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  const navigate = useNavigate();

  return (
    <>
      <AnimatedLayout>
        <div style={{ background: gradient }}>
          <Stack>
            <Container style={{ marginTop: "200px" }}>
              <Center>
                <h1 style={{ textAlign: "center" }}>
                  How would you like to interact with the Well today?
                </h1>
              </Center>
            </Container>

            <Group justify="center" gap="xl">
              <DepositButton></DepositButton>

              <WithdrawButton></WithdrawButton>
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
        </div>
      </AnimatedLayout>
    </>
  );
}
