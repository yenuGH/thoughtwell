import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function Deposit() {
  const [opened, { open, close }] = useDisclosure(false);
  const handleClicked = () => {
    alert("Deposit clicked!");
  };

  return (
    <>

      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Button
        size="xl"
        color="teal"
        variant="light"
        onClick={open}
      >
        Deposit
      </Button>

    </>
  );
}