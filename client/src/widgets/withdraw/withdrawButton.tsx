import { Button } from "@mantine/core";

export default function Withdraw() {
  const handleClicked = () => {
    alert("Withdraw clicked!");
  };

  return (
    <Button
      size="xl"
      color="red"
      variant="light"
      onClick={handleClicked}
    >
      Withdraw
    </Button>
  );
}