import { CssOutlined } from "@mui/icons-material";
import { Paper, Stack } from "@mui/material";
import React, { useState } from "react";
import { useMemo } from "react";
import Letter from "./Letter";

const NUM_LETTERS = 5;
const defaultWord = "_____";

type Props = {
  active?: boolean;
  onSubmit?: (word: string) => void;
  guess?: string;
};
const Word: React.FC<Props> = ({ active, guess, onSubmit }) => {
  const [word, setWord] = useState(defaultWord);
  const letters = (guess || word).split("");
  const letterRefs = useMemo(
    () =>
      Array(NUM_LETTERS)
        .fill(0)
        .map(() => React.createRef<HTMLInputElement>()),
    []
  );
  const handleLetterChange = (newLetter: string, i: number) => {
    const newLetters = [...letters];
    newLetters[i] = newLetter || "_";
    setWord(newLetters.join(""));
    const nextFocusIndex = newLetter === "_" ? i - 1 : i + 1;
    letterRefs[nextFocusIndex]?.current?.focus();
  };
  const handleBack = (i: number) => letterRefs[i - 1]?.current?.focus();
  console.log(word);
  return (
    <Paper elevation={active ? 2 : 0}>
      <Stack direction="row" spacing={1}>
        {letterRefs.map((ref, i) => {
          const letter = letters[i];
          return (
            <Letter
              key={i}
              ref={ref}
              disabled={!active}
              onBack={() => handleBack(i)}
              onChange={(l) => handleLetterChange(l, i)}
              onSubmit={() => {
                if (word.replaceAll("_", "").length !== NUM_LETTERS) return;
                onSubmit?.(word);
                setWord(defaultWord);
                letterRefs[0]?.current?.focus();
              }}
              value={letter}
            />
          );
        })}
      </Stack>
    </Paper>
  );
};

export default React.memo(Word);
