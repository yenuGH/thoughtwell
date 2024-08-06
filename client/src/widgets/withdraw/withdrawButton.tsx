import { Button, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export default function Withdraw() {
    const [opened, { open, close }] = useDisclosure(false);
  const handleClicked = () => {
    alert("Withdraw clicked!");
  };

  return (
    <>
        <Modal opened={opened} onClose={close} title="Deposit a thought">
        <Text>
            {localStorage.getItem("thought")}
        </Text>

        <Button
          onClick={() => {
            // Deposit thought
            console.log(localStorage.getItem("thought"));

            // deposit the thought into local storage here
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
        onClick={open}
        >
        Withdraw
        </Button>
    </>
  );
}