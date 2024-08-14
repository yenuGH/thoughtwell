import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Flex,
  Stack,
  Text,
  Textarea,
  Button,
  getGradient,
  useMantineTheme,
  Center,
  Box,
  Pagination,
} from "@mantine/core";
import { firebaseController } from "../../controllers/firebaseController";
import { Thought } from "../../interfaces/thoughtInterface";
import { Reply } from "../../interfaces/replyInterface";
import AnimatedLayout from "../../routes/AnimatedLayout";
import { ReplyCard } from "../../widgets/replyCard/replyCard";
import SignOutGroup from "../../widgets/signOutGroup";
import styles from "./thoughtDetailsPage.module.css";
import { AnimatePresence, motion } from "framer-motion";

export function ThoughtDetailsPage() {
  const { thoughtId } = useParams<{ thoughtId: string }>();
  const [thought, setThought] = useState<Thought>();
  const [replies, setReplies] = useState<Reply[]>();
  const [replyInput, setReplyInput] = useState("");
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const repliesPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastReply = currentPage * repliesPerPage;
  const indexOfFirstReply = indexOfLastReply - repliesPerPage;
  const currentReplies = replies?.slice(
    indexOfFirstReply,
    indexOfLastReply
  );

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
        await getReplies(fetchedThought);
        setThought(fetchedThought);
      } else {
        console.error("No thoughtId provided");
      }
    }
    fetchThoughtAndReplies();
  }, [thoughtId]);

  async function replyThought(): Promise<void> {
    try {
      setLoading(true);
      console.log("Replying to thought...");
      await firebaseController.replyThought(thought!, replyInput);
      console.log("Replied to thought: ", thought);
      await getReplies(thought!);
      setReplyInput(""); // Clear the input after submitting
    } catch (error) {
      console.error("Error replying to thought: ", error);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );

  return (
    <>
      <AnimatedLayout>
        <div style={{ background: gradient }}>
          {/* Sign out Group */}
          <Flex
            justify="space-between"
            style={{
              paddingTop: "10px",
              paddingRight: "20px",
              paddingLeft: "10px",
              textAlign: "right",
            }}
          >
            <Button
              radius="xl"
              color="deep-blue.9"
              size="md"
              style={{ width: "100px" }}
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
            <SignOutGroup></SignOutGroup>
          </Flex>
          <Flex justify="center" style={{ paddingTop: "50px", width: "100%" }}>
            <Stack gap="0" style={{ width: "40%" }}>
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0 } }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 17,
                  }}
                >
                  <Box
                    style={{
                      backgroundColor: "#1c7ed6", // Replace with your theme color if needed
                      color: "white",
                      padding: "1em",
                      borderRadius: "10px",
                      maxWidth: "40%",
                      margin: "10px auto 10px 0", // Align to the right
                      wordWrap: "break-word",
                      position: "relative",
                    }}
                  >
                    <Text c="white">
                      {thought ? thought.thought : "Loading thoughts..."}
                    </Text>
                    <div
                      style={{
                        content: '""',
                        position: "absolute",
                        bottom: "0px",
                        left: "-23px",
                        borderWidth: "15px",
                        borderStyle: "solid",
                        borderColor:
                          "transparent #1c7ed6 transparent transparent", // Adjust the border color to point the tail to the right
                      }}
                    />
                  </Box>
                </motion.div>
                <Textarea
                  classNames={{ input: styles.customTextArea }}
                  size="lg"
                  radius="xl"
                  placeholder="Reply to this thought!"
                  value={replyInput}
                  onChange={(event) => setReplyInput(event.currentTarget.value)}
                  autosize
                  minRows={3}
                />
                <Button
                  loading={loading}
                  style={{ marginTop: "10px", marginLeft: "auto" }}
                  radius="md"
                  onClick={replyThought}
                  color="tea-green.7"
                >
                  Reply
                </Button>

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
                  {currentReplies?.map((reply) => (
                    <ReplyCard key={reply.id} reply={reply} />
                  ))}
                </motion.div>

                {/* Pagination */}
                <Flex justify="space-between" style={{ marginTop: "20px" }}>
                  <Pagination
                    color="pale-blue.7"
                    total={Math.ceil((replies?.length || 0) / repliesPerPage)}
                    value={currentPage}
                    onChange={(page) => setCurrentPage(page)}
                  ></Pagination>
                </Flex>
              </AnimatePresence>
            </Stack>
          </Flex>

          <Center style={{ height: "80vh" }}></Center>
        </div>
      </AnimatedLayout>
    </>
  );
}

export default ThoughtDetailsPage;
