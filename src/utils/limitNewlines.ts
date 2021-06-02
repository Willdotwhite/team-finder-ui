const newlineRegex = /\r?\n/g;
export const limitNewlines = (input: string): string => {
  const newlines = [...input.matchAll(/\r?\n/g)];
  if (newlines.length > 10) {
    const firstNewlineToBeRemoved = newlines[10];
    return (
      input.slice(0, firstNewlineToBeRemoved.index) +
      input.slice(firstNewlineToBeRemoved.index).replace(newlineRegex, "")
    );
  }
  return input;
};
