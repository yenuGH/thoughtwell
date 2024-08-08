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
import { NavLink, useNavigate } from "react-router-dom";

export function LandingPage() {
  // useEffect(() => {
  //   document.title = "Thoughtwell";
  // }, []);

  const theme = useMantineTheme();
  const gradient = getGradient({ deg: 180, from: 'deep-blue.7', to: 'space-cadet-purple.3' }, theme);
  const navigate = useNavigate();

  return (
    <>
      <div style={{ background: gradient }}>
        <Stack>
          <Container>
            <Center>
              <h1>Welcome to Thoughtwell!</h1>
            </Center>
            <Center>
              <Group>

                <Button size="xl" variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                  radius="xl"
                >
                  Register
                </Button>

                <Button size="xl" color='deep-blue.9' radius="xl">
                  Sign In
                </Button>


              </Group>

            </Center>

            <Center mt="lg">
              <Button
                size="md" color="deep-blue.3"
                onClick={() => {
                  navigate('/main');
                }}
              >
                Continue as Guest
              </Button>
            </Center>

          </Container>

          <Group justify="center">

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
      </div>
    </>
  );
}