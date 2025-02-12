import { FSDB } from "file-system-db";
import path from "path";

const basePath = path.resolve(__dirname, "./data/questions");

const tickets_AB_dbPath = path.join(basePath, "A_B", "tickets.json");
const tickets_CD_dbPath = path.join(basePath, "C_D", "tickets.json");
const topics_AB_dbPath = path.join(basePath, "A_B", "topics.json");
const topics_CD_dbPath = path.join(basePath, "C_D", "topics.json");

const tickets_db_AB = new FSDB(tickets_AB_dbPath, false);
const tickets_db_CD = new FSDB(tickets_CD_dbPath, false);
const topics_db_AB = new FSDB(topics_AB_dbPath, false);
const topics_db_CD = new FSDB(topics_CD_dbPath, false);

export { tickets_db_AB, tickets_db_CD, topics_db_AB, topics_db_CD };
