import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Withdraw() {
  const [opened, { open, close }] = useDisclosure(false);
  const [thought, setThought] = useState(localStorage.getItem("thought") || "");

  function withdrawThought() {
    // grab a random index from 0 to the length of the local storage
    const localStorageLength = localStorage.length;
    const randomIndex = Math.floor(Math.random() * localStorageLength);


    let key = localStorage.key(randomIndex);
    let value = localStorage.getItem(key!);
    console.log('key: ' + key + ' value: ' + value);
    setThought(value!);
  }

  return (
    <>
      <Modal opened={opened} onClose={close} title="Withdraw thought">
        <Text>
          {thought ? thought : "No thought to withdraw."}
        </Text>

        <Button
          onClick={() => {
            close();
          }}
        >
          Close
        </Button>
      </Modal>

      <Button
        size="xl"
        color="red"
        variant="light"
        onClick={() => {
          withdrawThought();
          open();
        }}
      >
        Withdraw
      </Button>
    </>
  );
}