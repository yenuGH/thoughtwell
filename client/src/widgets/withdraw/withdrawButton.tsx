import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";

import { Thought } from "../../interfaces/thoughtInterface";

import { firebaseController } from "../../controllers/firebaseController";
import { motion } from "framer-motion";

export default function Withdraw() {
  const [opened, { open, close }] = useDisclosure(false);
  const [thought, setThought] = useState(localStorage.getItem("thought") || "");

  async function withdrawThought() {
    try {
      console.log("Withdrawing random thought...");
      var thought: Thought = await firebaseController.withdrawThought();
      console.log("Withdrew thought: ", thought);
      setThought(thought.thought);
    } catch (error) {
      console.error("Error withdrawing thought: ", error);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Withdraw thought">
        <Text>{thought ? thought : "No thought to withdraw."}</Text>

        <Button
          onClick={() => {
            close();
          }}
        >
          Close
        </Button>
      </Modal>

      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          size="xl"
          color="red.6"
          radius="xl"
          variant="filled"
          style={{ color: "white" }}
          onClick={() => {
            withdrawThought();
            open();
          }}
        >
          Withdraw
        </Button>
      </motion.div>
    </>
  );
}
