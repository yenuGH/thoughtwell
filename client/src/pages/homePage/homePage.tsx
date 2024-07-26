import {
    Center,
    Container,

    Textarea
} from "@mantine/core";

export function HomePage() {
    return (
        <>
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
        </>
    );
}