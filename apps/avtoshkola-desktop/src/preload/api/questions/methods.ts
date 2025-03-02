import { getTicketsDb, getTopicsDb } from './utils'
import { dbPromise } from './db'

import type {
  Ticket,
  TicketCategory,
  Tikets,
  Topic,
  SelectedAnswer,
  TicketAnswers,
  TopicAnswers
} from './types'

export const getTicketById = async (
  id: string,
  category: TicketCategory
): Promise<Ticket | null> => {
  const ticketsDb = await getTicketsDb()
  return ticketsDb[category]('get', id)
}

export const getAllTickets = async (category: TicketCategory): Promise<Tikets> => {
  const ticketsDb = await getTicketsDb()

  return ticketsDb[category]('getAll').map((entry) => ({
    ...entry.value,
    id: entry.key
  }))
}

export const getTopicById = async (id: string, category: TicketCategory): Promise<Topic | null> => {
  const topicsDb = await getTopicsDb()
  return topicsDb[category]('get', id)
}

export const getAllTopics = async (category: TicketCategory): Promise<Topic[]> => {
  const topicsDb = await getTopicsDb()
  return topicsDb[category]('getAll').map((entry) => ({
    ...entry.value,
    id: entry.key
  }))
}

export const saveTicketAnswers = async (
  ticket_id: string,
  answers: SelectedAnswer[]
): Promise<{ success: boolean }> => {
  try {
    const db = await dbPromise
    const ticketAnswers: TicketAnswers[] = db.ticketAnswersDb.get('answers') || []

    const existingTicket = ticketAnswers.find((item) => item.ticket_id === ticket_id)
    if (existingTicket) {
      existingTicket.answers = answers
    } else {
      ticketAnswers.push({ ticket_id, answers })
    }

    db.ticketAnswersDb.set('answers', ticketAnswers)
    return { success: true }
  } catch (error) {
    console.error('Error saving ticket answers:', error)
    return { success: false }
  }
}

export const getTicketAnswers = async (ticket_id: string): Promise<{ data: SelectedAnswer[] }> => {
  try {
    const db = await dbPromise
    const ticketAnswers: TicketAnswers[] = db.ticketAnswersDb.get('answers') || []
    const ticket = ticketAnswers.find((item) => item.ticket_id === ticket_id)
    return { data: ticket ? ticket.answers : [] }
  } catch (error) {
    console.error('Error reading ticket answers:', error)
    return { data: [] }
  }
}

export const getAllTicketAnswersCount = async (): Promise<
  { ticket_id: string; count: number; is_correct_count: number }[]
> => {
  try {
    const db = await dbPromise
    const ticketAnswers: TicketAnswers[] = db.ticketAnswersDb.get('answers') || []
    return ticketAnswers.map((item) => ({
      ticket_id: item.ticket_id,
      count: item.answers.length,
      is_correct_count: item.answers.filter((answer) => answer.is_correct).length
    }))
  } catch (error) {
    console.error('Error reading ticket answers count:', error)
    return []
  }
}

export const saveTopicAnswers = async (
  topic_id: string,
  answers: SelectedAnswer[]
): Promise<{ success: boolean }> => {
  try {
    const db = await dbPromise
    const topicAnswers: TopicAnswers[] = db.topicAnswersDb.get('answers') || []

    const existingTopic = topicAnswers.find((item) => item.topic_id === topic_id)
    if (existingTopic) {
      existingTopic.answers = answers
    } else {
      topicAnswers.push({ topic_id, answers })
    }

    db.topicAnswersDb.set('answers', topicAnswers)
    return { success: true }
  } catch (error) {
    console.error('Error saving topic answers:', error)
    return { success: false }
  }
}

export const getTopicAnswers = async (topic_id: string): Promise<{ data: SelectedAnswer[] }> => {
  try {
    const db = await dbPromise
    const topicAnswers: TopicAnswers[] = db.topicAnswersDb.get('answers') || []
    const topic = topicAnswers.find((item) => item.topic_id === topic_id)
    return { data: topic ? topic.answers : [] }
  } catch (error) {
    console.error('Error reading topic answers:', error)
    return { data: [] }
  }
}

export const getAllTopicAnswersCount = async (): Promise<
  { topic_id: string; count: number; is_correct_count: number }[]
> => {
  try {
    const db = await dbPromise
    const topicAnswers: TopicAnswers[] = db.topicAnswersDb.get('answers') || []
    return topicAnswers.map((item) => ({
      topic_id: item.topic_id,
      count: item.answers.length,
      is_correct_count: item.answers.filter((answer) => answer.is_correct).length
    }))
  } catch (error) {
    console.error('Error reading topic answers count:', error)
    return []
  }
}
