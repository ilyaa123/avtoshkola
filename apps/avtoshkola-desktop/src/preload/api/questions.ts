import { ipcRenderer } from 'electron'
import fs from 'fs'
import path from 'path'
import { questions } from 'avtoshkola-pdd'

import type { TicketCategory } from 'avtoshkola-pdd'

type SelectedAnswer = {
  question_id: string
  answer: number
  is_correct: boolean
  answer_tip: string
}

type TicketAnswers = {
  ticket_id: string
  answers: SelectedAnswer[]
}

type TopicAnswers = {
  topic_id: string
  answers: SelectedAnswer[]
}

const getAppPath = (): Promise<string> => ipcRenderer.invoke('get-app-path')

const getTicketAnswersFilePath = async () => {
  const appPath = await getAppPath()
  const dataDirectory = path.join(appPath, 'data')
  return path.join(dataDirectory, 'ticket_answers.json')
}

const getTopicAnswersFilePath = async () => {
  const appPath = await getAppPath()
  const dataDirectory = path.join(appPath, 'data')
  return path.join(dataDirectory, 'topic_answers.json')
}

const saveTicketAnswers = async (
  ticket_id: string,
  answers: SelectedAnswer[]
): Promise<{ success: boolean }> => {
  let ticketAnswers: TicketAnswers[] = []

  try {
    const ticketAnswersFilePath = await getTicketAnswersFilePath()

    const dir = path.dirname(ticketAnswersFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    if (fs.existsSync(ticketAnswersFilePath)) {
      const existingData = fs.readFileSync(ticketAnswersFilePath, 'utf-8')
      ticketAnswers = JSON.parse(existingData)
    }

    const existingTicket = ticketAnswers.find((item) => item.ticket_id === ticket_id)
    if (existingTicket) {
      existingTicket.answers = answers
    } else {
      ticketAnswers.push({ ticket_id, answers })
    }

    fs.writeFileSync(ticketAnswersFilePath, JSON.stringify(ticketAnswers, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Error saving ticket answers:', error)
    return { success: false }
  }
}

const getTicketAnswers = async (ticket_id: string): Promise<{ data: SelectedAnswer[] }> => {
  try {
    const ticketAnswersFilePath = await getTicketAnswersFilePath()

    if (fs.existsSync(ticketAnswersFilePath)) {
      const data = fs.readFileSync(ticketAnswersFilePath, 'utf-8')
      const ticketAnswers = JSON.parse(data)

      const ticket = ticketAnswers.find((item) => item.ticket_id === ticket_id)
      if (ticket) {
        return { data: ticket.answers }
      }
    }
    return { data: [] }
  } catch (error) {
    console.error('Error reading ticket answers:', error)
    return { data: [] }
  }
}

const getAllTicketAnswersCount = async (): Promise<
  { ticket_id: string; count: number; is_correct_count: number }[]
> => {
  try {
    const ticketAnswersFilePath = await getTicketAnswersFilePath()

    if (fs.existsSync(ticketAnswersFilePath)) {
      const data = fs.readFileSync(ticketAnswersFilePath, 'utf-8')
      const ticketAnswers = JSON.parse(data)

      return ticketAnswers.map((item) => {
        const correctCount = item.answers.filter(
          (answer: SelectedAnswer) => answer.is_correct
        ).length
        return {
          ticket_id: item.ticket_id,
          count: item.answers.length,
          is_correct_count: correctCount
        }
      })
    }
    return []
  } catch (error) {
    console.error('Error reading ticket answers count:', error)
    return []
  }
}

const saveTopicAnswers = async (
  topic_id: string,
  answers: SelectedAnswer[]
): Promise<{ success: boolean }> => {
  let topicAnswers: TopicAnswers[] = []

  try {
    const topicAnswersFilePath = await getTopicAnswersFilePath()

    const dir = path.dirname(topicAnswersFilePath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }

    if (fs.existsSync(topicAnswersFilePath)) {
      const existingData = fs.readFileSync(topicAnswersFilePath, 'utf-8')
      topicAnswers = JSON.parse(existingData)
    }

    const existingTopic = topicAnswers.find((item) => item.topic_id === topic_id)
    if (existingTopic) {
      existingTopic.answers = answers
    } else {
      topicAnswers.push({ topic_id, answers })
    }

    fs.writeFileSync(topicAnswersFilePath, JSON.stringify(topicAnswers, null, 2))
    return { success: true }
  } catch (error) {
    console.error('Error saving topic answers:', error)
    return { success: false }
  }
}

const getTopicAnswers = async (topic_id: string): Promise<{ data: SelectedAnswer[] }> => {
  try {
    const topicAnswersFilePath = await getTopicAnswersFilePath()

    if (fs.existsSync(topicAnswersFilePath)) {
      const data = fs.readFileSync(topicAnswersFilePath, 'utf-8')
      const topicAnswers = JSON.parse(data)

      const topic = topicAnswers.find((item) => item.topic_id === topic_id)
      if (topic) {
        return { data: topic.answers }
      }
    }
    return { data: [] }
  } catch (error) {
    console.error('Error reading topic answers:', error)
    return { data: [] }
  }
}

const getAllTopicAnswersCount = async (): Promise<
  { topic_id: string; count: number; is_correct_count: number }[]
> => {
  try {
    const topicAnswersFilePath = await getTopicAnswersFilePath()

    if (fs.existsSync(topicAnswersFilePath)) {
      const data = fs.readFileSync(topicAnswersFilePath, 'utf-8')
      const topicAnswers = JSON.parse(data)

      return topicAnswers.map((item) => {
        const correctCount = item.answers.filter(
          (answer: SelectedAnswer) => answer.is_correct
        ).length
        return {
          topic_id: item.topic_id,
          count: item.answers.length,
          is_correct_count: correctCount
        }
      })
    }
    return []
  } catch (error) {
    console.error('Error reading topic answers count:', error)
    return []
  }
}

export default {
  getTicket: async (id: string, category: TicketCategory) => questions.getTicketById(id, category),
  getAllTickets: async (category: TicketCategory) => questions.getAllTickets(category),
  getTopic: async (id: string, category: TicketCategory) => questions.getTopicById(id, category),
  getAllTopics: async (category: TicketCategory) => questions.getAllTopics(category),
  saveTicketAnswers,
  getTicketAnswers,
  getAllTicketAnswersCount,
  saveTopicAnswers,
  getTopicAnswers,
  getAllTopicAnswersCount
}
