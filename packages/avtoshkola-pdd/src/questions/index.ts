import { Ticket, TicketCategory, Tikets, Topic, Topics } from "./types";

import { ticketsDb, topicsDb } from "./utils";

const getTicketById = (id: string, category: TicketCategory): Ticket | null => {
  return ticketsDb[category]("get", id);
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

const getTopicById = (id: string, category: TicketCategory): Topic | null => {
  return topicsDb[category]("get", id);
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
  getTopicById,
  getAllTopics,
};

export type { Ticket, TicketCategory, Tikets, Topic, Topics };
