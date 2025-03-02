import {
  getAllTicketAnswersCount,
  getAllTickets,
  getAllTopicAnswersCount,
  getAllTopics,
  getTicketAnswers,
  getTicketById,
  getTopicAnswers,
  getTopicById,
  saveTicketAnswers,
  saveTopicAnswers
} from './methods'

export default {
  getTicket: getTicketById,
  getAllTickets,
  getTopic: getTopicById,
  getAllTopics,
  saveTicketAnswers,
  getTicketAnswers,
  getAllTicketAnswersCount,
  saveTopicAnswers,
  getTopicAnswers,
  getAllTopicAnswersCount
}
