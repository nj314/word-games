import { assign, createMachine } from "xstate";

export type LetterResult = "CORRECT" | "INCLUDED" | "ABSENT";

export type GuessResult = {
  guess: string;
  letterResults: LetterResult[];
};

type Context = {
  guesses: GuessResult[];
  answer: string;
};

type Event =
  | { type: "RESET"; answer: string }
  | { type: "GUESS"; guess: string };

function getLetterResults(answer: string, guess: string): LetterResult[] {
  const answerLetters = answer.split("");
  return guess.split("").map<LetterResult>((guessedLetter, i) => {
    if (guessedLetter === answerLetters[i]) return "CORRECT";
    else if (answerLetters.includes(guessedLetter)) return "INCLUDED";
    return "ABSENT";
  });
}

const machine = createMachine<Context, Event>({
  id: "nerdle-machine",
  context: {
    guesses: [],
    answer: "",
  },
  initial: "stopped",
  states: {
    stopped: {},
    playing: {
      always: {
        cond: (ctx) =>
          ctx.guesses[ctx.guesses.length - 1]?.letterResults.every(
            (r) => r === "CORRECT"
          ),
        target: "complete",
      },
      on: {
        GUESS: {
          internal: false,
          actions: assign((ctx, e) => ({
            guesses: [
              ...ctx.guesses,
              {
                guess: e.guess,
                letterResults: getLetterResults(ctx.answer, e.guess),
              },
            ],
          })),
        },
      },
    },
    complete: {},
  },
  on: {
    RESET: {
      target: "playing",
      actions: assign((ctx, e) => {
        console.log("answer is", e.answer);
        return { answer: e.answer.toUpperCase(), guesses: [] };
      }),
    },
  },
});
export default machine;
