import { Button, Modal, Text, Textarea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState } from "react";
import { motion } from "framer-motion";

import { ReplyCard } from "../replyCard/replyCard";
import { Thought } from "../../interfaces/thoughtInterface";
import { Reply } from "../../interfaces/replyInterface";
import { firebaseController } from "../../controllers/firebaseController";

export default function Withdraw() {
  const [opened, { open, close }] = useDisclosure(false);

  const [thought, setThought] = useState<Thought>();
  const [thoughtInput, setThoughtInput] = useState("");

  const [replies, setReplies] = useState<Reply[]>();
  const [replyInput, setReplyInput] = useState("");

  async function withdrawThought(): Promise<void> {
    try {
      console.log("Withdrawing random thought...");
      var thought: Thought = await firebaseController.withdrawThought();
      console.log("Withdrew thought: ", thought);

      setThought(thought);
      setThoughtInput(thought.thought);

      await getReplies();
      
      open();
    } catch (error) {
      console.error("Error withdrawing thought: ", error);
    }
  }

  async function replyThought(): Promise<void> {
    try {
      console.log("Replying to thought...");
      await firebaseController.replyThought(thought!, replyInput);
      console.log("Replied to thought: ", thought);
      close();
    } catch (error) {
      console.error("Error replying to thought: ", error);
    }
  }

  async function getReplies(): Promise<void> {
    try {
      console.log("Getting replies...");
      var replies: Reply[] = await firebaseController.getReplies(thought!);
      console.log("Got replies: ", replies);
      setReplies(replies);
    } catch (error) {
      console.error("Error getting replies: ", error);
    }
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Withdraw thought">
        <Text>{thoughtInput ? thoughtInput : "No thought to withdraw."}</Text>

        {/* <Button
          onClick={() => {
            close();
          }}
        >
          Close
        </Button> */}

        <Textarea
          // label="Thought"
          placeholder="Reply to this thought!"
          onChange={(event) => {
            setReplyInput(event.currentTarget.value);
          }}
        />

        {replies?.map((reply) => (
          <ReplyCard key={reply.id} reply={reply} />
        ))}

        <Button onClick={replyThought}>Send a reply...</Button>
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
          }}
        >
          Withdraw
        </Button>
      </motion.div>
    </>
  );
}
