import {
  Group,
  Stack,
  ActionIcon,
  Title,
  Divider,
  Switch,
} from "@mantine/core";

import {
  IconUserCircle,
  IconBuildingBank
} from "@tabler/icons-react"

import LightDarkToggle from "./toggleButton";

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

        <Group ml="auto" mr="50">
          <LightDarkToggle></LightDarkToggle>
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