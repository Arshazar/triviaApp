import { types } from 'mobx-state-tree'
import { decode } from 'html-entities'

export interface Question {
  category: string
  type: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

const QuestionModel = types.snapshotProcessor(
  types.model({
    category: types.string,
    type: types.string,
    question: types.string,
    correct_answer: types.string,
    incorrect_answers: types.array(types.string)
  }),
  {
    preProcessor(sn: Question) {
      return {
        ...sn,
        question: `${decode(sn.question)}`,
        correct_answer: sn.correct_answer.toLowerCase()
      }
    }
  }
)

export { QuestionModel }
