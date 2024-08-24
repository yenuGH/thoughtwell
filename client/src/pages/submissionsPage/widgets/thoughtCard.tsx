import { useNavigate } from "react-router-dom";

import { Title, Card, Text, Flex, Divider } from "@mantine/core";

import { Thought } from "../../../interfaces/thoughtInterface";

interface ThoughtCardProps {
    thought: Thought;
}

export function ThoughtCard({ thought }: ThoughtCardProps) {
    const navigate = useNavigate();

    function handleThoughtCardClick(id: string) {
        console.log("Clicked on thought card with id: ", id);
        navigate(`/withdraw/${id}`);
    }

    return (
        <>
            <Card 
                shadow="xs" 
                padding="xl" 
                m="md" 
                radius="md"
                onClick={() => handleThoughtCardClick(thought.id)}
                style={{ cursor: "pointer" }}
            >
                <Flex 
                    direction="row" 
                    justify="flex-start" 
                    align="center"
                >
                    <Title>
                        {
                            // red when negative, green when positive
                            thought.karma > 0 ? (
                                <span style={{ color: "green" }}>
                                    {thought.karma}
                                </span>
                            ) : (
                                <span style={{ color: "red" }}>
                                    {thought.karma}
                                </span>
                            )
                        }
                    </Title>
                    
                    <Divider 
                        orientation="vertical"
                        my="xl" 
                        size={30}
                        color="transparent"
                    />

                    <Text>{thought.thought}</Text>
                </Flex>
            </Card>
        </>
    );
}
