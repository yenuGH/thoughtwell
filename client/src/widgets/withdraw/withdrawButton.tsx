import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";

import { Thought } from "../../interfaces/thoughtInterface";

import { firebaseController } from "../../controllers/firebaseController";

export default function Withdraw() {
  const [opened, { open, close }] = useDisclosure(false);
  const [thought, setThought] = useState(localStorage.getItem("thought") || "");

  async function withdrawThought() {
    try {
        console.log("Withdrawing random thought...");
        var thought: Thought = await firebaseController.withdrawThought();
        console.log("Withdrew thought: ", thought);
        setThought(thought.thought);
    }
    catch (error) {
        console.error("Error withdrawing thought: ", error);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Withdraw thought">
        <Text>
          {thought ? thought : "No thought to withdraw."}
        </Text>

        <Button
          onClick={() => {
            close();
          }}
        >
          Close
        </Button>
      </Modal>

      <Button
        size="xl"
        color="red"
        variant="light"
        onClick={() => {
          withdrawThought();
          open();
        }}
      >
        Withdraw
      </Button>
    </>
  );
}