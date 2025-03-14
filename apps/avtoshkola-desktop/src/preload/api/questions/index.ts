import {
  getAllTicketAnswersCount,
  getAllTickets,
  getAllTopicAnswersCount,
  getAllTopics,
  getTicketAnswers,
  getSolvedTicketsCount,
  getAverageMaxTicketsScore,
  getLastSolvedTicket,
  getTicketById,
  getTopicAnswers,
  getTopicById,
  saveTicketAnswers,
  saveTopicAnswers,
  getTopicsTotals
} from './methods'

export default {
  getTicket: getTicketById,
  getAllTickets,
  getTopic: getTopicById,
  getAllTopics,
  saveTicketAnswers,
  getSolvedTicketsCount,
  getAverageMaxTicketsScore,
  getLastSolvedTicket,
  getTicketAnswers,
  getAllTicketAnswersCount,
  saveTopicAnswers,
  getTopicAnswers,
  getAllTopicAnswersCount,
  getTopicsTotals
}
