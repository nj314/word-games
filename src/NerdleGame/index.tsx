import { Pagination, Stack } from "@mui/material";
import { useMachine } from "@xstate/react";
import { useCallback, useEffect, useMemo, useState } from "react";
import machine from "./machine";
import Word from "./Word";
import seedRandom from "seedrandom";

const now = new Date();
const NerdleGame: React.FC = () => {
  const [state, send] = useMachine(machine);
  const [bank, setBank] = useState<string[]>([]);
  const [gameNumber, setGameNumber] = useState(1);

  const handleSubmit = (guess: string) => {
    console.log(`guessing ${guess}`);
    send({ type: "GUESS", guess });
  };

  const changeGameNumber = useCallback(
    (n: number) => {
      setGameNumber(n);
      const random = seedRandom(
        `${now.getFullYear()}${now.getMonth()}${now.getDate()}${n}`
      );
      console.log("bank has ", bank.length);
      const i = Math.trunc(random() * (bank.length - 1));
      console.log("using index ", i);
      send({
        type: "RESET",
        answer: bank[i],
      });
    },
    [bank, send]
  );

  useEffect(() => {
    // Fetch the word bank
    fetch("https://raw.githubusercontent.com/tabatkins/wordle-list/main/words")
      .then((r) => r.text())
      .then((t) => t.split("\n"))
      .then(setBank);
  }, [send]);

  useEffect(() => {
    bank.length && changeGameNumber(1);
  }, [bank.length, changeGameNumber]);

  if (state.matches("stopped")) return <>Loading...</>;

  return (
    <Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <h1>Nerdle</h1>
        <Pagination
          count={100}
          siblingCount={0}
          boundaryCount={0}
          page={gameNumber}
          onChange={(e, value) => changeGameNumber(value)}
        />
      </Stack>
      <Stack spacing={2}>
        {state.context.guesses.map((g, i) => (
          <Word key={`${g.guess}${i}`} result={g} />
        ))}
        {state.matches("playing") && (
          <Word key="active-word" onSubmit={handleSubmit} active />
        )}
      </Stack>
    </Stack>
  );
};

export default NerdleGame;
