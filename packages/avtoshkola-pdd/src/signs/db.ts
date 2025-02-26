import { FSDB } from "file-system-db";
import path from "path";

const basePath = path.resolve(__dirname, "./data/signs");

const signsDbPath = path.join(basePath, "signs.json");

const signsDb = new FSDB(signsDbPath, false);

export { signsDb };
