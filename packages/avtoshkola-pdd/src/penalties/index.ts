import type { Penalty } from "./types";

import { penaltiesDb } from "./db";

const getAllPenalties = (): Penalty[] => {
  return penaltiesDb.getAll().map((item) => item.value);
};

export default {
  getAllPenalties,
};

export type { Penalty };
