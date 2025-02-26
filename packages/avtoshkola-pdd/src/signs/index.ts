import type { SignTypes, Sign } from "./types";

import { signsDb } from "./db";

const getSygnTypes = (): SignTypes => {
  return signsDb.getAll().map((item) => item.key);
};

const getSigns = (type: string): Sign[] => {
  return signsDb.get(type);
};

const getSign = (type: string, number: string): Sign => {
  const typeData = signsDb.get(type);
  return typeData ? typeData[number] : undefined;
};

export default {
  getSygnTypes,
  getSigns,
  getSign,
};

export type { SignTypes, Sign };
