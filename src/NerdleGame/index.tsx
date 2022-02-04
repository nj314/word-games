import { Stack } from "@mui/material";
import { useReducer, useState } from "react";
import Word from "./Word";

const NerdleGame: React.FC = () => {
  const [guesses, addGuess] = useReducer(
    (guesses: string[], newGuess: string) => [...guesses, newGuess],
    []
  );

  const handleSubmit = (word: string) => {
    console.log(`guessing ${word}`);
    addGuess(word);
  };

  return (
    <Stack spacing={2}>
      {guesses.map((g) => (
        <Word key={g} onSubmit={handleSubmit} guess={g} />
      ))}
      <Word key="active-word" onSubmit={handleSubmit} active />
    </Stack>
  );
};

export default NerdleGame;
