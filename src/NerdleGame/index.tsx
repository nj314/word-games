import { Stack } from "@mui/material";
import { useState } from "react";
import Word from "./Word";
const defaultWord = "_____";

const NerdleGame: React.FC = () => {
  const [word1, setWord1] = useState(defaultWord);
  const [word2, setWord2] = useState(defaultWord);
  const [word3, setWord3] = useState(defaultWord);
  const [word4, setWord4] = useState(defaultWord);
  const [word5, setWord5] = useState(defaultWord);

  return (
    <Stack spacing={2}>
      <Word word={word1} onChange={setWord1} />
      <Word word={word2} onChange={setWord2} />
      <Word word={word3} onChange={setWord3} />
      <Word word={word4} onChange={setWord4} />
      <Word word={word5} onChange={setWord5} active />
    </Stack>
  );
};

export default NerdleGame;
