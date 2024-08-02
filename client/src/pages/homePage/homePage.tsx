import {
    Center,
    Container,
    Stack,
    Group,
    Button,
    Textarea
} from "@mantine/core";

export function HomePage() {
    return (
        <>
            <Stack>
                <Container>
                    <Center>
                        <h1>Welcome to the positivity app!</h1>
                    </Center>
                </Container>

                <Textarea 
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
                </Group>
            </Stack>
        </>
    );
}