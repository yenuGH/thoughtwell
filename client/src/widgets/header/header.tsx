import {
    Group,
    Stack,
    ActionIcon,
    Title,
    Divider,
} from "@mantine/core";

import {
    IconBuildingBank
} from "@tabler/icons-react"

import LightDarkToggle from "../themeToggle/toggleButton";
import UserSettings from "../userSettings/userSettings";

export default function Header() {
    return (
        <Stack>
            <Group
                justify="space-between"
                align="center"
            >
                <Group
                    gap="xs"
                    justify="flex-start"
                >
                    <ActionIcon
                        variant="outline"
                        size="lg"
                    >
                        <IconBuildingBank />
                    </ActionIcon>

                    <Title>
                        Thoughtwell
                    </Title>
                </Group>

                <Group>
                    <LightDarkToggle />
                    <UserSettings />
                </Group>

            </Group>

            <Divider my="xs" />
        </Stack>
    );
}