import {
  Box,
  Button,
  Card,
  getGradient,
  Text,
  useMantineTheme,
} from "@mantine/core";

import { Reply } from "../../interfaces/replyInterface";
import { AnimatePresence, motion } from "framer-motion";

interface ReplyCardProps {
  reply: Reply;
}

export function ReplyCard({ reply }: ReplyCardProps): JSX.Element {
  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );
  return (
    <>
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
          <Card
            shadow="0"
            padding="sm"
            radius="md"
            mt="0"
            mb="0"
            style={{ backgroundColor: gradient }}
          >
            {/* <Card.Section> */}
            <Box
              style={{
                backgroundColor: "#1c7ed6", // Replace with your theme color if needed
                color: "white",
                padding: "1em",
                borderRadius: "10px",
                maxWidth: "40%",
                margin: "10px 0 10px auto", // Align to the right
                wordWrap: "break-word",
                position: "relative",
              }}
            >
              <Text>{reply.reply}</Text>
              
              <div
                style={{
                  content: '""',
                  position: "absolute",
                  bottom: "0px",
                  right: "-20px",
                  borderWidth: "15px",
                  borderStyle: "solid",
                  borderColor: "transparent transparent transparent #1c7ed6", // Adjust the border color to point the tail to the right
                }}
              />
            </Box>
            {/* </Card.Section> */}
          </Card>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
