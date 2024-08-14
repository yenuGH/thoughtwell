import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Flex,
  Stack,
  Text,
  Textarea,
  Button,
  getGradient,
  useMantineTheme,
  Center,
} from "@mantine/core";
import { firebaseController } from "../../controllers/firebaseController";
import { Thought } from "../../interfaces/thoughtInterface";
import { Reply } from "../../interfaces/replyInterface";
import AnimatedLayout from "../../routes/AnimatedLayout";
import { ReplyCard } from "../../widgets/replyCard/replyCard";

export function ThoughtDetailsPage() {
  const { thoughtId } = useParams<{ thoughtId: string }>();
  const [thought, setThought] = useState<Thought>();
  const [replies, setReplies] = useState<Reply[]>();
  const [replyInput, setReplyInput] = useState("");
  const theme = useMantineTheme();

  async function getReplies(thought: Thought): Promise<void> {
    try {
      console.log("Getting replies...");
      if (!thought) {
        console.error("No thought to get replies for.");
        return;
      }
      var replies: Reply[] = await firebaseController.getReplies(thought);

      console.log("Got replies: ", replies);

      setReplies(replies);
    } catch (error) {
      console.error("Error getting replies: ", error);
    }
  }

  useEffect(() => {
    async function fetchThoughtAndReplies() {
      if (thoughtId) {
        const fetchedThought = await firebaseController.getThoughtById(
          thoughtId
        );
        const fetchedReplies = await getReplies(fetchedThought);
        setThought(fetchedThought);
      } else {
        console.error("No thoughtId provided");
      }
    }
    fetchThoughtAndReplies();
  }, [thoughtId]);

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
          <Flex justify="center" style={{ paddingTop: "50px" }}>
            <Stack>
              <Text>{thought ? thought.thought : "Loading thought..."}</Text>

              {replies?.map((reply) => (
                <ReplyCard key={reply.id} reply={reply} />
              ))}

              <Textarea
                placeholder="Reply to this thought!"
                value={replyInput}
                onChange={(event) => setReplyInput(event.currentTarget.value)}
              />
              <Button onClick={replyThought}>Reply</Button>
            </Stack>
          </Flex>
          <Center style={{ height: "80vh" }}>
          </Center>
        </div>
      </AnimatedLayout>
    </>
  );
}

export default ThoughtDetailsPage;
