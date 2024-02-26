const mapping = {
  // vowels
  B85: "6D",
  B86: "4D",
  B87: "2C",
  B88: "3C",
  B89: "63",
  B8A: "43",
  B8E: "76",
  B8F: "56",
  B90: "49",
  B92: "78",
  B93: "58",
  B94: "edge_case",
  B83: "2F",

  // consonents
  B95: "66",
  B99: "71",
  B9A: "72",
  B9C: "58",
  B9E: "51",
  B9F: "6C",
  BA3: "7A",
  BA4: "6A",
  BA8: "65",
  BA9: "64",
  BAA: "67",
  BAE: "6B",
  BAF: "61",
  BB0: "75",
  BB1: "77",
  BB2: "79",
  BB3: "73",
  BB4: "6F",
  BB5: "74",
  BB7: "5C",
  BB8: "5D",
  BB9: "60",

  // signs
  BBE: "68",
  BBF: "70",
  BC0: "50",
  BC1: "7B",
  BC2: "5F",
  BC6: "6E",
  BC7: "4E",
  BC8: "69",
  BCA: "69",
  BCB: "69",
  BCC: "69",
  BCD: "3B",

  // common
  20: "20",
  30: "30",
  31: "31",
  32: "32",
  33: "33",
  34: "34",
  35: "35",
  36: "36",
  37: "37",
  38: "38",
  39: "39",
  "3A": "3A",
  "2E": "2E",
  "2D": "2D",
  "3F": "3F",
};

const id_mapping = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
};

const convertToBase16 = (s) => {
  return parseInt(s, 16);
};

export const lathaToKalaham = () => {
  const lk = new Map();

  Object.keys(mapping).forEach((key) => {
    const val = convertToBase16(mapping[key]);

    lk.set(convertToBase16(key), val);
  });

  return lk;
};
