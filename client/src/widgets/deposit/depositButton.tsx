import { Button, Modal, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";

import { firebaseController } from "../../controllers/firebaseController";

import { motion } from "framer-motion"

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
          // label="Thought"
          placeholder="What's on your mind?"
          aria-label="Deposit a thought"
          style={{ width: "100%", padding: "10px"}}
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

      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button size="xl" color="teal" variant="light" onClick={open}>
          Deposit
        </Button>
      </motion.div>
      
    </>
  );
}
