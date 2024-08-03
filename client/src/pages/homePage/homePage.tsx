import {
  Center,
  Container,
  Stack,
  Group,
  Button,
  Textarea,
  Text
} from "@mantine/core";

export function HomePage() {
  return (
    <>
      <Stack>
        <Container>
          <Center>
            <h1>Welcome to Thoughtwell!</h1>
          </Center>
          <Center>
            <Text size="lg">
              How would you like to interact with the Well today?
            </Text>
          </Center>
        </Container>

        <Group justify="center">
          <Button 
            size="xl"
            color="teal"
            variant="light"
          >
            Deposit
          </Button>

          <Button
            size="xl"
            color="red"
            variant="light"
          >
            Withdraw
          </Button>
        </Group>

        {/* <Textarea
          label="Spread some positivity"
          description="What's on your mind?"
          placeholder="Type here..."
          size="xl"
          autosize
          minRows={5}
        />

        <Group
          justify="space-between"
          align="center"
        >
          <Button
            color="teal"
            variant="light"
          >
            Deposit
          </Button>

          <Button
            color="red"
            variant="light"
          >
            Withdraw
          </Button>
        </Group> */}

      </Stack>
    </>
  );
}