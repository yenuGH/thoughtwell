import {
    Group,
    Stack,
    ActionIcon,
    Title,
    Divider,
} from "@mantine/core";

import {
    IconUserCircle,
    IconBuildingBank
} from "@tabler/icons-react"

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

                <ActionIcon
                    variant="outline"
                    size="xl"
                    radius="xl"
                >
                    <IconUserCircle />
                </ActionIcon>
            </Group>

            <Divider my="xs" />
        </Stack>
    );
}