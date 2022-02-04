import { OutlinedInput } from "@mui/material";
import { forwardRef } from "react";

type Props = {
  disabled?: boolean;
  onBack: () => void;
  onChange: (value: string) => void;
  value: string;
};
const Letter = forwardRef<HTMLInputElement, Props>(
  ({ disabled, onChange, onBack, value = "" }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (value === "_" && e.key === "Backspace") {
        e.preventDefault();
        onBack();
      }
    };
    return (
      <OutlinedInput
        inputRef={ref}
        inputProps={{ style: { textAlign: "center", fontSize: 40 } }}
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
