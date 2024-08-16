import {
  Center,
  Stack,
  Group,
  Button,
  TextInput,
  PasswordInput,
  Loader,
} from "@mantine/core";
import classes from "../../pages/authentication/landingPage.module.css";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { firebaseController } from "../../controllers/firebaseController";
import { useNavigate } from "react-router-dom";
import { sessionController } from "../../controllers/sessionController";

export default function registerGroup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true); // Show loading spinner
    let isSuccessful: boolean = await firebaseController.register(
      email,
      password
    );
    setIsLoading(false); // Hide loading spinner

    if (isSuccessful) {
      console.log("User registered successfully.");
      setShowSuccess(true);

      // set the session token
      await sessionController.saveSession();

      setTimeout(() => {
        navigate("/main");
      }, 1500); // Show success effect for 1.5 seconds before navigating
    } else {
      const errorMsg = firebaseController.getErrorMessage();
      setErrorMessage(errorMsg);
      console.log(errorMsg);
    }
  }

  const handleEnterKey = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleRegisterButton();
    }
  };

  return (
    <>
      <AnimatePresence>
        <Center>
          <Stack>
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
                    style={{ width: "350px" }} // Adjust the width as needed
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
                    style={{ width: "350px" }} // Adjust the width as needed
                    onChange={(event) =>
                      setConfirmPassword(event.currentTarget.value)
                    }
                    onKeyDown={handleEnterKey}
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
                      style={{ color: "white" }}
                      onClick={() => {
                        handleRegisterButton();
                      }}
                    >
                      Register
                    </Button>
                  </motion.div>
                </Center>
              </Stack>
            </Group>
            {errorMessage && !isLoading && !showSuccess && (
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
                  style={{
                    maxWidth: "300px", // Set a maximum width for the container
                    overflow: "hidden", // Hide overflow content
                    wordWrap: "break-word", // Ensure long words are wrapped
                  }}
                >
                  <p
                    style={{
                      color: "red",
                      margin: 0,
                      padding: 0,
                    }}
                  >
                    {errorMessage}
                  </p>
                </motion.div>
              </Center>
            )}
            <Center>
              {isLoading && !showSuccess && (
                <Center>
                  <Loader color="indigo" size="lg" />
                </Center>
              )}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      // position: "fixed",
                      // top: "50%",
                      // left: "50%",
                      // transform: "translate(-50%, -50%)",
                      // background: "lightgreen",
                      color: "white",
                      padding: "12px",
                      borderRadius: "20px",
                      zIndex: 1000,
                    }}
                  >
                    Register Successful!
                  </motion.div>
                )}
              </AnimatePresence>
            </Center>
          </Stack>
        </Center>
      </AnimatePresence>
    </>
  );
}
