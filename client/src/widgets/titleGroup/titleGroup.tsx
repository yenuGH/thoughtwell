import { Center, Stack, useMantineTheme } from "@mantine/core";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import "./titleGroup.css";

export default function titleGroup() {
  const theme = useMantineTheme();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const words = ["well", "big", "smart", "happy"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentWordIndex]);

  const currentWord = words[currentWordIndex];
  const characters = currentWord.split("");

  return (
    <>
      <Center>
        <Stack gap="xs">
          <motion.div
            initial={{ rotateY: 90 }}
            animate={{
              rotateY: 0,
              transition: { delay: 0.1, duration: 1.5 },
            }}
            exit={{ rotateY: 90 }}
          >
            <h1
              style={{
                color: theme.colors.indigo[1],
                fontFamily: "Bungee, system-ui",
                // margin: 0,
                marginBottom: 0,
                // padding: 0,
              }}
            >
              T H O U G H T W E L L
            </h1>
          </motion.div>

          <Center>
            <motion.div
              // initial={{ opacity: 0, y: -20 }}
              // animate={{ opacity: 1, y: 0, transition: { delay: 1.5 } }}
              // exit={{ opacity: 0, y: 20 }}
            >
              <p
                className="text"
                style={{
                  color: theme.colors.indigo[1],
                  fontFamily: "Anybody Variable, system-ui",
                  fontSize: "1.5rem",
                  marginTop: 0,
                  marginBottom: "50px",
                }}
              >
                Think{" "}
                {/* This is the animation for words coming in */}
                <motion.span
                  key={currentWord}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0 }}
                  style={{ display: "inline-block", color: theme.colors["tea-green"][2] }}
                >
                  {characters.map((char, index) => (
                    // Animate each character
                    <motion.span
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      style={{ display: "inline-block" }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
                .
              </p>
            </motion.div>
          </Center>
        </Stack>
      </Center>
    </>
  );
}
