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
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./landingPage.module.css";
import { useState } from "react";
import AnimatedLayout from "../../routes/AnimatedLayout";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { motion } from "framer-motion";
import { firebaseController } from "../../controllers/firebaseController";

export function LandingPage() {
  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.3" },
    theme
  );
  const navigate = useNavigate();

  /* const attemptRegister = async () => {
    setIsSubmitting(true);
    try {
      if (email === "" || password === "" || confirmPassword === "") {
        setErrorMessage("Please fill in all fields.");
        setIsSubmitting(false);
        return;
      }

      if (!isMatching(password, confirmPassword)) {
        setErrorMessage("Passwords do not match!");
        setIsSubmitting(false);
        return;
      }

      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log("User registered successfully:", user);
          navigate("/main");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error during registration:", errorCode, errorMessage);
          setErrorMessage(errorMessage);
          setIsSubmitting(false);
        });
    } catch (error) {
      console.error("Unexpected error occurred:", error);
      setErrorMessage("Unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  }; */

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegisterButton(): Promise<void> {
    if (email === "" || password === "") {
      console.log("Please fill in all fields.");
      return;
    }

    let isSuccessful: boolean = await firebaseController.register(email, password);
    if (isSuccessful) {
      console.log("User registered successfully.");
      navigate("/main");
    } else {
      console.log("Error during registration.");
    }
  }

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
              <Center>
                <Group>
                  <Stack>
                    <TextInput
                      classNames={{ input: classes.textInput }}
                      size="xl"
                      radius="xl"
                      placeholder="Enter your email address"
                      style={{ width: "350px" }} // Adjust the width as needed
                        onChange={(event) => setEmail(event.currentTarget.value)}
                    />

                    <PasswordInput
                      classNames={{ input: classes.passwordInput }}
                      size="xl"
                      radius="xl"
                      placeholder="Create a password"
                    />

                    <PasswordInput
                      classNames={{ input: classes.passwordInput }}
                      size="xl"
                      radius="xl"
                      placeholder="Confirm your password"
                      onChange={(event) => setPassword(event.currentTarget.value)}
                    />
                  </Stack>
                </Group>
              </Center>

              {/* {errorMessage && (
                <Center>
                  <p style={{ color: "red", margin: 0, padding: 0 }}>
                    {errorMessage}
                  </p>
                </Center>
              )} */}

              <Center mt="xs">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
                    color="pale-blue.5"
                    radius="xl"
                    variant="filled"
                    style={{ color: "black" }}
                    onClick={() => {
                      handleRegisterButton();
                    }}
                  >
                    Register
                  </Button>
                </motion.div>
              </Center>

              <Center mt="lg">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" color="deep-blue.9" radius="xl">
                    Already have an account?&nbsp;{" "}
                    <span style={{ textDecoration: "underline" }}> Login</span>
                  </Button>
                </motion.div>

                <motion.div
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
                </motion.div>
              </Center>
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
