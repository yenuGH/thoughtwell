import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Divider, Flex } from "@mantine/core";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { AnimatePresence, motion } from "framer-motion";

import { firebaseController } from "../controllers/firebaseController";
import { sessionController } from "../controllers/sessionController";

import UserSettings from "./userSettings/userSettings";

export default function SignOutGroup() {
    const [currentUser, updateCurrentUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                updateCurrentUser(user);
            } else {
                updateCurrentUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        firebaseController
            .signOut()
            .then(() => {
                // Sign-out successful.
                navigate("/"); // Navigate after successful sign-out

                // Clear the session token
                sessionController.clearSession();
            })
            .catch((error) => {
                // An error happened.
                console.error("Sign-out error:", error);
            });
    };

    return (
        <>
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0, transition: { delay: 0.5 } }}
                    exit={{ opacity: 0, y: 20 }}
                >
                    {currentUser ? (
                        <>
                            <Flex direction="row" >
                                <p style={{ color: "white" }}>
                                    Welcome, {currentUser.email}
                                </p>

                                <Divider 
                                    orientation="vertical"
                                    my="sm" 
                                    size={10}
                                    color="transparent"
                                />

                                <UserSettings />
                            </Flex>
                        </>
                    ) : (
                        <>
                            <p style={{ color: "white" }}>Welcome, Guest</p>
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring" }}
                            >
                                <Button
                                    variant="light"
                                    color="orange"
                                    size="xs"
                                    radius="sm"
                                    onClick={() => navigate("/")}
                                >
                                    Log in
                                </Button>
                            </motion.div>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>
        </>
    );
}
