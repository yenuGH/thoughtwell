import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Stack, Button, Text } from '@mantine/core';
import { Thought } from "../../interfaces/thoughtInterface";
import { firebaseController } from "../../controllers/firebaseController";

const ThoughtsListPage = () => {
  const [thoughts, setThoughts] = useState<Thought[]>();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchThoughts() {
      const fetchedThoughts = await firebaseController.getThoughts();
      setThoughts(fetchedThoughts);
    }
    fetchThoughts();
  }, []);

  return (
    <Flex 
    // justify="center" 
    style={{ padding: '20px' }}
    align="flex-start"
    direction="column"
    >
      <Stack>
        {thoughts?.map((thought) => (
          <div key={thought.id} style={{ marginBottom: '10px' }}>
            <Text>{thought.thought}</Text>
            <Button
              onClick={() => navigate(`/thought/${thought.id}`)}
            >
              View Replies
            </Button>
          </div>
        ))}
      </Stack>
    </Flex>
  );
};

export default ThoughtsListPage;