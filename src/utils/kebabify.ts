const kebabify = (input: string) => {
  const normalised = input.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const noPunctuation = normalised.replace(/[^\w\s]|_/g, "");
  return noPunctuation.toLowerCase().replace(/\s+/g, "-").trim();
};

export default kebabify;
