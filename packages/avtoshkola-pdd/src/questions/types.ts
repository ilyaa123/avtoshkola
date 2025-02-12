export type TicketCategory = "A_B" | "C_D";

export type Answer = {
  answer_text: string;
  is_correct: boolean;
};

export type Question = {
  title: string;
  image: string;
  question: string;
  answers: Answer[];
  correct_answer: string;
  answer_tip: string;
};

export type Ticket = {
  id: string;
  ticket_number: string;
  ticket_category: TicketCategory;
  questions: Question[];
};

export type Topic = {
  id: string;
  topic_name: string;
  questions: Question[];
};

export type Tikets = Ticket[];

export type Topics = Topic[];
