import { useNavigate } from "react-router-dom";

import { ActionIcon, Menu, rem } from "@mantine/core";

import {
  IconLogout,
  IconSend,
  IconSettings,
  IconUserCircle
} from "@tabler/icons-react";

import { firebaseController } from "../../controllers/firebaseController";
import { sessionController } from "../../controllers/sessionController";

export default function UserSettings(): JSX.Element {
    const navigate = useNavigate();

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

    const handleViewSubmissions = () => {
        navigate("/submissions");
    }

    return (
        <>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon
                        variant="filled"
                        size="xl"
                        radius="xl"
                        style={{ boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" }}
                    >
                        <IconUserCircle />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>User Settings</Menu.Label>

                    <Menu.Item
                        leftSection={
                            <IconSettings
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                        disabled
                    >
                        Account Settings
                    </Menu.Item>

                    <Menu.Item
                        leftSection={
                            <IconSend
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                        onClick={handleViewSubmissions}
                    >
                        Your Submissions
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                        color="red"
                        leftSection={
                            <IconLogout
                                style={{ width: rem(14), height: rem(14) }}
                            />
                        }
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
