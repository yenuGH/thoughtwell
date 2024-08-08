import {
  Center,
  Container,
  Stack,
  Group,
  Button,
  Textarea,
  Text,
  Image,
  useMantineTheme,
  getGradient,
} from "@mantine/core";

import AnimatedLayout from "../../routes/AnimatedLayout";
import DepositButton from "../../widgets/deposit/depositButton.tsx";
import WithdrawButton from "../../widgets/withdraw/withdrawButton.tsx";

export function HomePage() {
  // useEffect(() => {
  //   document.title = "Thoughtwell";
  // }, []);

  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );

  return (
    <>
      <AnimatedLayout>
        <div style={{ background: gradient }}>
          <Stack>
            <Container>
              <Center>
                <h1 style={{ textAlign: "center" }}>
                  How would you like to interact with the Well today?
                </h1>
              </Center>
              {/* <Center>
              <Text size="lg">
                How would you like to interact with the Well today?
              </Text>
            </Center> */}
            </Container>

            <Group justify="center">
              <DepositButton></DepositButton>

              <WithdrawButton></WithdrawButton>
            </Group>

            <Center style={{ height: "80vh" }}>
              <Image
                src="../src/assets/wishingwell.png"
                height={300}
                // margin-left="50px"
                // width={250}
              />
            </Center>
          </Stack>
        </div>
      </AnimatedLayout>
    </>
  );
}
