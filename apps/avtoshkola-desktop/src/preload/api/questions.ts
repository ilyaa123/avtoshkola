import { questions } from 'avtoshkola-pdd'

import { TicketCategory } from 'avtoshkola-pdd/dist/questions/types'

export default {
  getRandomTicket: async (category: TicketCategory) => questions.getRandomTicket(category),
  getAllTickets: async (category: TicketCategory) => questions.getAllTickets(category),
  getAllTopics: async (category: TicketCategory) => questions.getAllTopics(category)
}
