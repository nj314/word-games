import { OutlinedInput } from "@mui/material";
import { forwardRef } from "react";
import { LetterResult } from "./machine";
import { lime, green } from "@mui/material/colors";

const backgrounds: Record<LetterResult, string> = {
  CORRECT: green["700"],
  INCLUDED: lime["900"],
  ABSENT: "transparent",
};

type Props = {
  disabled?: boolean;
  onBack: () => void;
  onChange: (value: string) => void;
  onSubmit: () => void;
  result?: LetterResult;
  value: string;
};
const Letter = forwardRef<HTMLInputElement, Props>(
  ({ disabled, onChange, onBack, onSubmit, result, value = "" }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (value === "_" && e.key === "Backspace") {
        e.preventDefault();
        onBack();
      } else if (e.key === "Enter") {
        onSubmit();
      }
    };
    return (
      <OutlinedInput
        inputRef={ref}
        inputProps={{
          style: {
            backgroundColor: result && backgrounds[result],
            textAlign: "center",
            fontSize: 40,
            color: "white",
          },
        }}
        disabled={disabled}
        value={value === "_" ? "" : value}
        onChange={(e) => {
          const value =
            e.target.value.substring(e.target.value.length - 1).toUpperCase() ||
            "_";
          if (value === " ") return;
          onChange(value);
        }}
        onKeyDown={handleKeyDown}
      />
    );
  }
);

export default Letter;
