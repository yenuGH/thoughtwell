import {
    Button,
    Center,
    Flex,
    getGradient,
    Modal,
    Stack,
    Textarea,
    useMantineTheme,
} from "@mantine/core";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { firebaseController } from "../../controllers/firebaseController";
import { Thought } from "../../interfaces/thoughtInterface";

import styles from "./submissionsPage.module.css";
import AnimatedLayout from "../../routes/AnimatedLayout";
import SignOutGroup from "../../widgets/signOutGroup";

import { ThoughtCard } from "./widgets/thoughtCard";

export function SubmissionsPage() {
    const navigate = useNavigate();

    const theme = useMantineTheme();
    const gradient = getGradient(
        { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
        theme
    );

    const [thoughts, setThoughts] = useState<Thought[]>();
    async function getUserThoughts() {
        const userThoughts: Thought[] = await firebaseController.getThoughtsByUserId();
        setThoughts(userThoughts);
    }

    useEffect(() => {
        getUserThoughts();
    }, []);

    return (
        <>
            <Flex
                justify="space-between"
                style={{
                    paddingTop: "10px",
                    paddingRight: "20px",
                    paddingLeft: "20px",
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

            <AnimatedLayout>
                <div style={{ background: gradient }}>
                    <Flex justify="center">
                        <Stack>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: { delay: 1.0 },
                                }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 400,
                                    damping: 17,
                                }}
                            >
                                {
                                    thoughts?.map((thought) => (
                                        <ThoughtCard 
                                            key={thought.id}
                                            thought={thought} 
                                        />
                                    ))
                                }
                            </motion.div>
                        </Stack>
                    </Flex>
                    <Center style={{ height: "80vh" }}></Center>
                </div>
            </AnimatedLayout>
        </>
    );
}
