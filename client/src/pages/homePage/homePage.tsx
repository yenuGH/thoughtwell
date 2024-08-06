import {
  Center,
  Container,
  Stack,
  Group,
  Button,
  Textarea,
  Text,
  Image,
} from "@mantine/core";

import DepositButton from "../../widgets/deposit/depositButton.tsx";
import WithdrawButton from "../../widgets/withdraw/withdrawButton.tsx";

export function HomePage() {
  // useEffect(() => {
  //   document.title = "Thoughtwell";
  // }, []);


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

          <DepositButton>
          </DepositButton>

          <WithdrawButton>
          </WithdrawButton>
        </Group>

        <Center style={{ height: '80vh' }}>
          <Image
            src="../src/assets/wishingwell.png"
            height={300}
          // margin-left="50px"
          // width={250}
          />
        </Center>

      </Stack>
    </>
  );
}