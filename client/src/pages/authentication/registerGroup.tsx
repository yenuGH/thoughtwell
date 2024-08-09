import {
  Center,
  Stack,
  Group,
  Button,
  TextInput,
  PasswordInput,
} from "@mantine/core";
import classes from "./landingPage.module.css";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { firebaseController } from "../../controllers/firebaseController";
import { useNavigate } from "react-router-dom";

export default function registerGroup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function isMatching(password: string, confirmPassword: string) {
    return password === confirmPassword;
  }

  async function handleRegisterButton(): Promise<void> {
    if (email === "" || password === "" || confirmPassword === "") {
      setErrorMessage("Please fill in all fields.");
      return;
    } else {
      if (!isMatching(password, confirmPassword)) {
        setErrorMessage("Passwords do not match!");
        return;
      }
    }

    let isSuccessful: boolean = await firebaseController.register(
      email,
      password
    );
    if (isSuccessful) {
      console.log("User registered successfully.");
      navigate("/main");
    } else {
      setErrorMessage("Error during registration.");
      console.log("Error during registration."); // Maybe we can pass the error message from firebaseController for duplicate acc?
    }
  }

  return (
    <>
      <AnimatePresence>
        <Center>
          <Group>
            <Stack>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                exit={{ opacity: 0, y: -20 }}
              >
                <TextInput
                  classNames={{ input: classes.textInput }}
                  size="xl"
                  radius="xl"
                  placeholder="Enter your email address"
                  style={{ width: "350px" }} // Adjust the width as needed
                  onChange={(event) => setEmail(event.currentTarget.value)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6 } }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PasswordInput
                  classNames={{ input: classes.passwordInput }}
                  size="xl"
                  radius="xl"
                  placeholder="Create a password"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                exit={{ opacity: 0, y: -20 }}
              >
                <PasswordInput
                  classNames={{ input: classes.passwordInput }}
                  size="xl"
                  radius="xl"
                  placeholder="Confirm your password"
                  onChange={(event) =>
                    setConfirmPassword(event.currentTarget.value)
                  }
                />
              </motion.div>

              <Center mt="0" mb="0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.8 } }}
                  exit={{ opacity: 0, y: -20 }}
                  // transition={{
                  //   type: "spring",
                  //   stiffness: 400,
                  //   damping: 17,
                  //   delay: 0.8,
                  // }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
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

              {errorMessage && (
                <Center>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      duration: 0.5,
                    }}
                  >
                    <p style={{ color: "red", margin: 0, padding: 0 }}>
                      {errorMessage}
                    </p>
                  </motion.div>
                </Center>
              )}
            </Stack>
          </Group>
        </Center>
      </AnimatePresence>
    </>
  );
}
