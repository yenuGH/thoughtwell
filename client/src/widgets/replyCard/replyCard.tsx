import {
    Box,
    Button,
    Card,
    Text,
} from "@mantine/core";

import { Reply } from "../../interfaces/replyInterface";

interface ReplyCardProps {
    reply: Reply;
}

export function ReplyCard({ reply }: ReplyCardProps): JSX.Element {
    return (
        <>
            <Card shadow="md" padding="md" radius="md" mt="md" mb="md">
                <Box>
                    <Text>
                        {reply.reply}
                    </Text>
                </Box>
            </Card>
        </>
    );
}