import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Stack,
  Button,
  Text,
  useMantineTheme,
  Container,
  Pagination,
} from "@mantine/core";
import { Thought } from "../../interfaces/thoughtInterface";
import { firebaseController } from "../../controllers/firebaseController";
import SignOutGroup from "../../widgets/signOutGroup";
import styles from "./thoughtsListPage.module.css";
import AnimatedLayout from "../../routes/AnimatedLayout";
import { motion } from "framer-motion";

const ThoughtsListPage = () => {
  const [thoughts, setThoughts] = useState<Thought[]>();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const thoughtsPerPage = 5;
  const theme = useMantineTheme();

  useEffect(() => {
    async function fetchThoughts() {
      const fetchedThoughts = await firebaseController.getThoughts();
      setThoughts(fetchedThoughts);
    }
    fetchThoughts();
  }, []);

  const indexOfLastThought = currentPage * thoughtsPerPage;
  const indexOfFirstThought = indexOfLastThought - thoughtsPerPage;
  const currentThoughts = thoughts?.slice(
    indexOfFirstThought,
    indexOfLastThought
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
    <AnimatedLayout>
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
            navigate("/main");
          }}
        >
          Back
        </Button>
        <SignOutGroup></SignOutGroup>
      </Flex>

      {/* Page content */}
      <Flex
        // justify="center"
        style={{ paddingLeft: "20px" }}
        align="flex-start"
        direction="column"
      >
        <h1
          style={{
            color: theme.colors["tea-green"][0],
            textDecoration: "underline",
          }}
        >
          Thoughts
        </h1>
        <Flex justify="left">
          <p
            className="text"
            style={{
              color: "white",
              fontFamily: "Anybody Variable, system-ui",
              fontSize: "1.5rem",
              marginTop: "0px",
            }}
          >
            Browse thoughts submitted by other users!
          </p>
        </Flex>

        <motion.section
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 1.5 } }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
        <Stack w={500}>
          {currentThoughts?.map((thought) => (
            <div key={thought.id} style={{ marginBottom: "10px" }}>
              <Text
                style={{
                  border: "1px solid black",
                  background: theme.colors["deep-blue"][9],
                  padding: "5px",
                  borderRadius: "4px",
                  color: "white",
                }}
                truncate="end"
              >
                {thought.thought}
              </Text>
              <Button
                radius="md"
                color="pale-blue.5"
                size="sm"
                style={{ marginTop: "5px" }}
                onClick={() => navigate(`/withdraw/${thought.id}`)}
              >
                View Replies
              </Button>
            </div>
          ))}
        </Stack>
        </motion.section>

        {/* Pagination */}
        <Flex justify="space-between" style={{ marginTop: "20px" }}>
          <Pagination
            color="pale-blue.7"
            total={Math.ceil((thoughts?.length || 0) / thoughtsPerPage)}
            value={currentPage}
            onChange={(page) => setCurrentPage(page)}
          ></Pagination>
        </Flex>
      </Flex>
      </AnimatedLayout>
    </>
    
  );
};

export default ThoughtsListPage;
