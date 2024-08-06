import {
    ActionIcon,
    Menu,
    rem,
} from "@mantine/core";

import {
    IconUserCircle,
    IconSettings,
    IconTrash,
} from "@tabler/icons-react"

import LightDarkToggle from "../themeToggle/toggleButton";

export default function UserSettings() {
    return (
        <>
            <Menu shadow="md" width={200}>
                <Menu.Target>
                    <ActionIcon
                        variant="outline"
                        size="xl"
                        radius="xl"
                    >
                        <IconUserCircle />
                    </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>
                        User Settings
                    </Menu.Label>

                    <Menu.Item 
                        leftSection={
                            <IconSettings style={{ width: rem(14), height: rem(14) }} />
                        }
                    >
                        Account Settings
                    </Menu.Item>

                    <Menu.Item

                    >
                        <LightDarkToggle />
                    </Menu.Item>

                    <Menu.Divider />

                    <Menu.Item
                        color="red"
                        leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                    >
                        Delete my account
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </>
    );
}