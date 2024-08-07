import { Button, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";

import { firebaseController } from "../../controllers/firebaseController";

export default function Deposit() {
  const [opened, { open, close }] = useDisclosure(false);
  const [thought, setThought] = useState("");

  async function depositThought() {
    // soemthing to do with local storage
    // localStorage.setItem(uuid(), thought); 

    // deposit the thought into firebase here
    await firebaseController.depositThought(thought);
    console.log("Deposited thought: ", thought);
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Deposit a thought">
        <Textarea
          label="Thought"
          placeholder="What's on your mind?"
          aria-label="Deposit a thought"
          style={{ width: "100%" }}
          onChange={(event) => {
            // Update thought
            setThought(event.currentTarget.value);
          }}
        />

        <Button
          onClick={() => {
            // Deposit thought
            console.log(thought);

            // deposit the thought into local storage here
            depositThought();

            close();
          }}
        >
          Deposit Thought
        </Button>
      </Modal>

      <Button size="xl" color="teal" variant="light" onClick={open}>
        Deposit
      </Button>
    </>
  );
}
