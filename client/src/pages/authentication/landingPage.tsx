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
  TextInput,
  PasswordInput,
} from "@mantine/core";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "./landingPage.module.css";

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

                {/* <Button size="xl" variant="gradient"
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                  radius="xl"
                  onClick={() => {
                    navigate('/register');
                  }}
                >
                  Register
                </Button> */}
                <Stack>
                  <TextInput
                    classNames={{ input: classes.textInput }}
                    size="xl"
                    radius="xl"
                    placeholder="Enter an email address"
                    style={{ width: '350px' }} // Adjust the width as needed
                  />

                  <PasswordInput
                    classNames={{ input: classes.passwordInput }}
                    size="xl"
                    radius="xl"
                    placeholder="Create a password"
                  />

                  <PasswordInput
                    classNames={{ input: classes.passwordInput }}
                    size="xl"
                    radius="xl"
                    placeholder="Confirm your password"
                  />

                </Stack>
              </Group>

            </Center>

            <Center mt="lg">
              <Button size="lg" color='deep-blue.9' radius="xl">
                Already have an account?&nbsp; <span style={{ textDecoration: 'underline' }}> Login</span>
              </Button>
              <Button
                size="md" color="deep-blue.3" style={{ marginLeft: '10px' }}
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
      </div >
    </>
  );
}