import {
  Button,
  Center,
  Flex,
  getGradient,
  Modal,
  Stack,
  Text,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { ReplyCard } from "../../widgets/replyCard/replyCard";
import { Thought } from "../../interfaces/thoughtInterface";
import { Reply } from "../../interfaces/replyInterface";
import { firebaseController } from "../../controllers/firebaseController";
import AnimatedLayout from "../../routes/AnimatedLayout";
import { useNavigate } from "react-router-dom";
import ThoughtsListPage from "./thoughtsListPage";

export function WithdrawPage() {
  const navigate = useNavigate();

  const [thought, setThought] = useState<Thought>();
  const [thoughtInput, setThoughtInput] = useState("");
  const theme = useMantineTheme();
  useEffect(() => {
    if (thought) {
      getReplies();
    }
  }, [thought]);

  const [replies, setReplies] = useState<Reply[]>();
  const [replyInput, setReplyInput] = useState("");

  async function getReplies(): Promise<void> {
    try {
      console.log("Getting replies...");
      if (!thought) {
        console.error("No thought to get replies for.");
        return;
      }
      var replies: Reply[] = await firebaseController.getReplies(thought);

      console.log("Got replies: ", replies);

      setReplies(replies);

      // NOTE: we call open here so that the modal opens once all the replies are loaded
      open();
    } catch (error) {
      console.error("Error getting replies: ", error);
    }
  }

  async function withdrawThought(): Promise<void> {
    try {
      console.log("Withdrawing random thought...");
      var thought: Thought = await firebaseController.withdrawThought();
      console.log("Withdrew thought: ", thought);

      setThought(thought);
      setThoughtInput(thought.thought);
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
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );

  return (
    <>
      <AnimatedLayout>
        <div style={{ background: gradient }}>
        <ThoughtsListPage />
          {/* <Flex justify="center" style={{ paddingTop: "50px" }}> */}
            
            {/* <Stack>
              <Text>
                {thoughtInput ? thoughtInput : "No thought to withdraw."}
              </Text>

              {replies?.map((reply) => (
                <ReplyCard key={reply.id} reply={reply} />
              ))}

              <Textarea
                placeholder="Reply to this thought!"
                onChange={(event) => {
                  setReplyInput(event.currentTarget.value);
                }}
              />
              <Button onClick={replyThought}>Send a reply...</Button>
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
            </Stack> */}
          {/* </Flex> */}
          <Center style={{ height: "80vh" }}>
          </Center>
        </div>
      </AnimatedLayout>
    </>
  );
}
