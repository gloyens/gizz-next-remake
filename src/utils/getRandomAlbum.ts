// TODO: put albumNames in a constants.ts file

const albumNames = [
  "12-bar-bruise",
  "butterfly-3000",
  "changes",
  "eyes-like-the-sky",
  "fishing-for-fishies",
  "flight-b741",
  "float-along-fill-your-lungs",
  "flying-microtonal-banana",
  "gumboot-soup",
  "ice-death-planets-lungs-mushrooms-and-lava",
  "im-in-your-mind-fuzz",
  "infest-the-rats-nest",
  "kg",
  "laminated-denim",
  "lw",
  "made-in-timeland",
  "murder-of-the-universe",
  "nonagon-infinity",
  "oddments",
  "omnium-gatherum",
  "paper-mache-dream-balloon",
  "petrodragonic-apocalypse",
  "polygondwanaland",
  "quarters",
  "sketches-of-brunswick-east",
  "the-silver-cord",
  "willoughbys-beach",
];

export function getRandomAlbum(): string | null {
  if (albumNames.length === 0) return null;
  return albumNames[Math.floor(Math.random() * albumNames.length)];
}
