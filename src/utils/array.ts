interface Indexed {
  index?: number;
}

export const sortByIndex = (a: Indexed, b: Indexed) => {
  if (a.index === undefined) return 1;
  if (b.index === undefined) return -1;
  if (a.index < b.index) return -1;
  if (a.index > b.index) return 1;
  return 0;
};
