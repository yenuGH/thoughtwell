import {
  Group,
  Stack,
  ActionIcon,
  Title,
  Divider,
} from "@mantine/core";

import {
  IconBuildingBank,
  IconBrandGithub
} from "@tabler/icons-react"

export function Footer(): JSX.Element {
  return (
    <>
      <Stack style={{paddingBottom:'16px'}}>
        <Divider my="xs" />
        <Group
          justify="right"
          align="center"
          style={{ paddingRight: '32px' }} // Add padding to the right
        >
          <ActionIcon
            component="a"
            href="https://github.com/yenuGH/thoughtwell"
            target="_blank"
            rel="noopener noreferrer"
            size="xl"
          >

            <IconBrandGithub size={24} />
          </ActionIcon>
        </Group>


      </Stack>
    </>
  );
}