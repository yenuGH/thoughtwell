import {
  Button,
  Center,
  Container,
  Flex,
  getGradient,
  Group,
  Stack,
  useMantineTheme
} from "@mantine/core";

import AnimatedLayout from "../../routes/AnimatedLayout.tsx";
// import DepositPage from "../../widgets/deposit/depositUI.tsx";
// import WithdrawButton from "../withdraw/withdrawPage.tsx";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SignOutGroup from "../../widgets/signOutGroup.tsx";

export function MainPage() {
  // useEffect(() => {
  //   document.title = "Thoughtwell";
  // }, []);

  const navigate = useNavigate();
  const theme = useMantineTheme();
  const gradient = getGradient(
    { deg: 180, from: "deep-blue.7", to: "space-cadet-purple.4" },
    theme
  );

  const handleInterfaceClick = (interfaceType: "deposit" | "withdraw") => {
    if (interfaceType === "deposit") {
      navigate("/deposit");
    } else if (interfaceType === "withdraw") {
      navigate("/withdraw");
    }
  };

  return (
    <>
      <AnimatedLayout>
        <div style={{ background: gradient }}>
          <AnimatePresence>
            <motion.section
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
              style={{
                background: gradient,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Flex
                justify="flex-end"
                style={{
                  paddingTop: "10px",
                  paddingRight: "20px",
                  textAlign: "right",
                }}
              >
                <SignOutGroup></SignOutGroup>
              </Flex>

              <Stack>
                <>
                  <Container style={{ marginTop: "100px" }}>
                    <Center>
                      <h1 style={{ textAlign: "center", color: "white" }}>
                        How would you like to interact today?
                      </h1>
                    </Center>
                  </Container>

                  <Group justify="center" gap="xl">
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        size="xl"
                        // color="teal.6"
                        radius="xl"
                        variant="filled"
                        style={{ color: "white", background: "linear-gradient(45deg, #1de9b6, #1dc4e9)",}}
                        onClick={() => handleInterfaceClick("deposit")}
                      >
                        Deposit
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                    >
                      <Button
                        size="xl"
                        // color="red.6"
                        radius="xl"
                        variant="filled"
                        style={{ color: "white",
                          background: "linear-gradient(45deg, #ff6f61, #ff3d00)" }}
                        onClick={() => {
                          handleInterfaceClick("withdraw");
                        }}
                      >
                        Withdraw
                      </Button>
                    </motion.div>

                  </Group>
                </>

                <Center style={{ height: "80vh" }}>
                  {/* <Image
                src="../src/assets/birdseyewell.png"
                height={900}
                // margin-left="50px"
                // width={250}
              /> */}
                </Center>
              </Stack>
            </motion.section>
          </AnimatePresence>
        </div>
      </AnimatedLayout>
    </>
  );
}
