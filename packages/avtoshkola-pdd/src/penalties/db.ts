import { FSDB } from "file-system-db";
import path from "path";

const basePath = path.resolve(__dirname, "./data/penalties");

const penaltiesDbPath = path.join(basePath, "penalties.json");

const penaltiesDb = new FSDB(penaltiesDbPath, false);

export { penaltiesDb };
