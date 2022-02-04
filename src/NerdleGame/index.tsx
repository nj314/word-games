import { Stack } from "@mui/material";
import { useMachine } from "@xstate/react";
import { useEffect } from "react";
import machine from "./machine";
import Word from "./Word";

const NerdleGame: React.FC = () => {
  const [state, send] = useMachine(machine);

  const handleSubmit = (guess: string) => {
    console.log(`guessing ${guess}`);
    send({ type: "GUESS", guess });
  };

  useEffect(() => {
    // Set the answer
    send({ type: "RESET", answer: "DWARF" });
  }, [send]);

  return (
    <Stack spacing={2}>
      {state.context.guesses.map((g) => (
        <Word key={g.guess} result={g} />
      ))}
      {state.matches("playing") && (
        <Word key="active-word" onSubmit={handleSubmit} active />
      )}
    </Stack>
  );
};

export default NerdleGame;
