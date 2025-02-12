import { Ticket, TicketCategory, Tikets, Topics } from "./types";

import { ticketsDb, topicsDb } from "./utils";

const getTicketById = (id: number, category: TicketCategory): Ticket | null => {
  return ticketsDb[category]("get", String(id));
};

const getRandomTicket = (category: TicketCategory): Ticket | null => {
  const allTickets = ticketsDb[category]("getAll");
  if (allTickets.length === 0) return null;

  const randomKey =
    allTickets[Math.floor(Math.random() * allTickets.length)].key;

  return ticketsDb[category]("get", randomKey);
};

const getAllTickets = (category: TicketCategory): Tikets => {
  return ticketsDb[category]("getAll").map((entry) => ({
    ...entry.value,
    id: entry.key,
  }));
};

const getAllTopics = (category: TicketCategory): Topics => {
  return topicsDb[category]("getAll").map((entry) => ({
    ...entry.value,
    id: entry.key,
  }));
};

export default {
  getTicketById,
  getRandomTicket,
  getAllTickets,

  getAllTopics,
};
