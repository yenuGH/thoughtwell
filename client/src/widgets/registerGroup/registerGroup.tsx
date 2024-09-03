import {
    Center,
    Stack,
    Group,
    Button,
    TextInput,
    PasswordInput,
    Loader,
    Text,
    Box,
    rem,
    Popover,
    Progress,
} from "@mantine/core";

import { IconCheck, IconX } from "@tabler/icons-react";

import classes from "../../pages/authentication/landingPage.module.css";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { firebaseController } from "../../controllers/firebaseController";
import { useNavigate } from "react-router-dom";
import { sessionController } from "../../controllers/sessionController";

export default function registerGroup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // password requirements dialog
    const [popoverOpened, setPopoverOpened] = useState(false);

    const passwordRequirements: { re: RegExp; label: string }[] = [
        { re: /[0-9]/, label: "Includes number" },
        { re: /[a-z]/, label: "Includes lowercase letter" },
        { re: /[A-Z]/, label: "Includes uppercase letter" },
        { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
    ];

    function getPasswordStrength(password: string): number {
        let multiplier = password.length > 5 ? 0 : 1;

        passwordRequirements.forEach((passwordRequirement) => {
            if (!passwordRequirement.re.test(password)) {
                multiplier += 1;
            }
        });

        return Math.max(
            100 - (100 / (passwordRequirements.length + 1)) * multiplier,
            10
        );
    }
    function PasswordRequirement({
        meets,
        label,
    }: {
        meets: boolean;
        label: string;
    }) {
        return (
            <Text
                c={meets ? "teal" : "red"}
                style={{ display: "flex", alignItems: "center" }}
                mt={7}
                size="sm"
            >
                {meets ? (
                    <IconCheck style={{ width: rem(14), height: rem(14) }} />
                ) : (
                    <IconX style={{ width: rem(14), height: rem(14) }} />
                )}{" "}
                <Box ml={10}>{label}</Box>
            </Text>
        );
    }

    const checks = passwordRequirements.map((requirement, index) => (
        <PasswordRequirement
            key={index}
            label={requirement.label}
            meets={requirement.re.test(password)}
        />
    ));

    const passwordStrength = getPasswordStrength(password);
    const passwordStrengthColor =
        passwordStrength === 100
            ? "teal"
            : passwordStrength > 50
            ? "yellow"
            : "red";

    const navigate = useNavigate();

    function isMatching(password: string, confirmPassword: string) {
        return password === confirmPassword;
    }

    function inputValidation(): boolean {
        // case: email is empty
        if (email === "") {
            setErrorMessage("Please enter your email address.");
            return false;
        }

        // case: email is not in the correct format
        if (!email.includes("@") || !email.includes(".")) {
            setErrorMessage("Please enter a valid email address.");
            return false;
        }

        // case: password is empty
        if (password === "") {
            setErrorMessage("Please enter your password.");
            return false;
        }

        // case: password confirmation does not match
        if (!isMatching(password, confirmPassword)) {
            setErrorMessage("Passwords do not match!");
            return false;
        }

        // case: password is less than 6 characters
        if (password.length < 6) {
            setErrorMessage("Password must be at least 6 characters long.");
            return false;
        }

        // case: password does not contain a number
        if (!/\d/.test(password)) {
            setErrorMessage("Password must contain at least one number.");
            return false;
        }

        // case: password does not contain an uppercase letter
        if (!/[A-Z]/.test(password)) {
            setErrorMessage(
                "Password must contain at least one uppercase letter."
            );
            return false;
        }

        // case: password does not contain a lowercase letter
        if (!/[a-z]/.test(password)) {
            setErrorMessage(
                "Password must contain at least one lowercase letter."
            );
            return false;
        }

        // case: password does not contain a special character
        if (!/[!@#$%^&*]/.test(password)) {
            setErrorMessage(
                "Password must contain at least one special character."
            );
            return false;
        }

        return true;
    }

    async function handleRegisterButton(): Promise<void> {
        // Validate the input fields
        if (!inputValidation()) {
            return;
        }

        setIsLoading(true); // Show loading spinner
        let isSuccessful: boolean = await firebaseController.register(
            email,
            password
        );
        setIsLoading(false); // Hide loading spinner

        if (isSuccessful) {
            console.log("User registered successfully.");
            setShowSuccess(true);

            // set the session token
            await sessionController.saveSession();

            setTimeout(() => {
                navigate("/main");
            }, 1500); // Show success effect for 1.5 seconds before navigating
        } else {
            // if it somehow manages to skip the validation above, it is some unknwon error
            // display the error firebase gives

            const errorMsg = firebaseController.getErrorMessage();
            setErrorMessage(errorMsg);
            console.log(errorMsg);
        }
    }

    const handleEnterKey = (event: { key: string }) => {
        if (event.key === "Enter") {
            handleRegisterButton();
        }
    };

    return (
        <>
            <AnimatePresence>
                <Center>
                    <Stack>
                        <Group>
                            <Stack>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: 0.5 },
                                    }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <TextInput
                                        classNames={{
                                            input: classes.textInput,
                                        }}
                                        size="xl"
                                        radius="xl"
                                        placeholder="Enter your email address"
                                        style={{ width: "350px" }} // Adjust the width as needed
                                        onChange={(event) =>
                                            setEmail(event.currentTarget.value)
                                        }
                                    />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: 0.6 },
                                    }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <Popover
                                        opened={popoverOpened}
                                        position="bottom"
                                        width="target"
                                        transitionProps={{ transition: "pop" }}
                                        radius="md"
                                    >
                                        <Popover.Target>
                                            <div
                                                onFocusCapture={() =>
                                                    setPopoverOpened(true)
                                                }
                                                onBlurCapture={() =>
                                                    setPopoverOpened(false)
                                                }
                                            >
                                                <PasswordInput
                                                    classNames={{
                                                        input: classes.passwordInput,
                                                    }}
                                                    size="xl"
                                                    radius="xl"
                                                    placeholder="Create a password"
                                                    style={{ width: "350px" }} // Adjust the width as needed
                                                    onChange={(event) =>
                                                        setPassword(
                                                            event.currentTarget
                                                                .value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </Popover.Target>
                                        <Popover.Dropdown>
                                            <Progress
                                                color={passwordStrengthColor}
                                                value={passwordStrength}
                                                size={5}
                                                mb="xs"
                                            />
                                            <PasswordRequirement
                                                label="Includes at least 6 characters"
                                                meets={password.length > 5}
                                            />
                                            {checks}
                                        </Popover.Dropdown>
                                    </Popover>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                        transition: { delay: 0.7 },
                                    }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <PasswordInput
                                        classNames={{
                                            input: classes.passwordInput,
                                        }}
                                        size="xl"
                                        radius="xl"
                                        placeholder="Confirm your password"
                                        style={{ width: "350px" }} // Adjust the width as needed
                                        onChange={(event) =>
                                            setConfirmPassword(
                                                event.currentTarget.value
                                            )
                                        }
                                        onKeyDown={handleEnterKey}
                                    />
                                </motion.div>

                                <Center mt="0" mb="0">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: { delay: 0.8 },
                                        }}
                                        exit={{ opacity: 0, y: -20 }}
                                        // transition={{
                                        //   type: "spring",
                                        //   stiffness: 400,
                                        //   damping: 17,
                                        //   delay: 0.8,
                                        // }}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Button
                                            size="lg"
                                            color="pale-blue.5"
                                            radius="xl"
                                            variant="filled"
                                            style={{ color: "white" }}
                                            onClick={() => {
                                                handleRegisterButton();
                                            }}
                                        >
                                            Register
                                        </Button>
                                    </motion.div>
                                </Center>
                            </Stack>
                        </Group>
                        {errorMessage && !isLoading && !showSuccess && (
                            <Center>
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        duration: 0.5,
                                    }}
                                    style={{
                                        maxWidth: "300px", // Set a maximum width for the container
                                        overflow: "hidden", // Hide overflow content
                                        wordWrap: "break-word", // Ensure long words are wrapped
                                    }}
                                >
                                    <p
                                        style={{
                                            color: "red",
                                            margin: 0,
                                            padding: 0,
                                        }}
                                    >
                                        {errorMessage}
                                    </p>
                                </motion.div>
                            </Center>
                        )}
                        <Center>
                            {isLoading && !showSuccess && (
                                <Center>
                                    <Loader color="indigo" size="lg" />
                                </Center>
                            )}
                            <AnimatePresence>
                                {showSuccess && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        style={{
                                            // position: "fixed",
                                            // top: "50%",
                                            // left: "50%",
                                            // transform: "translate(-50%, -50%)",
                                            // background: "lightgreen",
                                            color: "white",
                                            padding: "12px",
                                            borderRadius: "20px",
                                            zIndex: 1000,
                                        }}
                                    >
                                        Register Successful!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Center>
                    </Stack>
                </Center>
            </AnimatePresence>
        </>
    );
}
