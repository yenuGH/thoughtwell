import {
  Button,
  Center,
  Flex,
  getGradient,
  Modal,
  Stack,
  Textarea,
  useMantineTheme,
} from "@mantine/core";

import { useState } from "react";

import { firebaseController } from "../../controllers/firebaseController";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import styles from "./depositPage.module.css";
import AnimatedLayout from "../../routes/AnimatedLayout";
import SignOutGroup from "../../widgets/signOutGroup";

export function DepositPage() {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const [thought, setThought] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const [message, setMessage] = useState(""); // Add message state
  const [isError, setIsError] = useState(false);
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );

  async function depositThought() {
    // soemthing to do with local storage
    // localStorage.setItem(uuid(), thought);

    // deposit the thought into firebase here
    setLoading(true);
    try {
      await firebaseController.depositThought(thought);
      console.log("Deposited thought: ", thought);
    } catch (error) {
      setMessage("Failed to deposit thought."); // Set error message
    } finally {
      setMessage("Successfully deposited! Redirecting...");
      setLoading(false); // Reset loading state after the operation is complete
      setTimeout(() => {
        navigate("/main");
      }, 2000);
    }
  }

  return (
    <>
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

      <AnimatedLayout>
        <div style={{ background: gradient }}>
          <Flex justify="center">
            <Stack>
              <p
                className="text"
                style={{
                  color: "white",
                  fontFamily: "Anybody Variable, system-ui",
                  fontSize: "1.5rem",
                  marginTop: "50px",
                }}
              >
                Let the world know what's on your mind.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 1.0 } }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                <Textarea
                  // label="Thought"
                  placeholder="What's on your mind?"
                  aria-label="Deposit a thought"
                  classNames={{ input: styles.customTextArea }}
                  style={{ width: "100%", padding: "10px" }}
                  size="lg"
                  color="blue"
                  radius="xl"
                  autosize
                  minRows={5}
                  onChange={(event) => {
                    // Update thought
                    setThought(event.currentTarget.value);
                  }}
                />
                <Flex>
                  <Button
                    radius="xl"
                    color="pale-blue.5"
                    size="md"
                    style={{ width: "25%", marginRight: "10px" }}
                    loading={loading}
                    onClick={() => {
                      // Deposit thought
                      console.log(thought);
                      // deposit the thought into local storage here
                      depositThought();
                    }}
                  >
                    Deposit
                  </Button>
                  <Button
                    radius="xl"
                    color="deep-blue.9"
                    size="md"
                    style={{ width: "20%" }}
                    onClick={() => {
                      navigate("/main");
                    }}
                  >
                    Back
                  </Button>
                </Flex>
              </motion.div>
              {message && ( // Conditionally render the message
                <p
                  style={{
                    color: isError ? "red" : "lightgreen",
                    fontFamily: "Anybody Variable, system-ui",
                    fontSize: "1rem",
                    marginTop: "20px",
                  }}
                >
                  {message}
                </p>
              )}
            </Stack>
          </Flex>
          <Center style={{ height: "80vh" }}>
            {/* <Image
                src="../src/assets/birdseyewell.png"
                height={900}
                // margin-left="50px"
                // width={250}
              /> */}
          </Center>
        </div>
      </AnimatedLayout>
    </>
  );
}
