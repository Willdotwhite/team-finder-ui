import { NUM_NEWLINES } from "./consts";

const newlineRegex = /\r?\n/g;
export const limitNewlines = (input: string): string => {
  const newlines = [...input.matchAll(/\r?\n/g)];
  if (newlines.length > NUM_NEWLINES) {
    const firstNewlineToBeRemoved = newlines[NUM_NEWLINES];
    return (
      input.slice(0, firstNewlineToBeRemoved.index) +
      input.slice(firstNewlineToBeRemoved.index).replace(newlineRegex, "")
    );
  }
  return input;
};
