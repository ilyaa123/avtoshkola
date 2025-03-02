export type TicketCategory = 'A_B' | 'C_D'

export type Answer = {
  id: string
  answer_text: string
  is_correct: boolean
}

export type Question = {
  id: string
  title: string
  image: string
  question: string
  answers: Answer[]
  correct_answer: string
  answer_tip: string
}

export type Ticket = {
  id: string
  ticket_number: string
  ticket_category: TicketCategory
  questions: Question[]
}

export type Topic = {
  id: string
  topic_name: string
  questions: Question[]
}

export type SelectedAnswer = {
  question_id: string
  answer: number
  is_correct: boolean
  answer_tip: string
}

export type TicketAnswers = {
  ticket_id: string
  answers: SelectedAnswer[]
}

export type TopicAnswers = {
  topic_id: string
  answers: SelectedAnswer[]
}

export type Tikets = Ticket[]

export type Topics = Topic[]
