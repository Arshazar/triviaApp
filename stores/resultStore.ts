/* eslint-disable react-hooks/rules-of-hooks */
import { toJS } from 'mobx'
import { types } from 'mobx-state-tree'

import { useStore } from '../hooks'
import { AnswerModel } from './models'
import { Answer } from './models/AnswerModel'
import { Question } from './models/QuestionModel'

export const resultStore = types
  .model('resultStore', {
    answers: types.optional(types.array(AnswerModel), [])
  })
  .views((self) => ({
    get getAnswers() {
      return toJS(self.answers)
    },
    get score() {
      const { questionsStore } = useStore(null)
      let corrects = 0
      questionsStore.questions.forEach((question: Question, index: number) => {
        Object.values(self.answers).forEach((answer) => {
          const values = Object.values(answer)
          if (values[0] === index + 1 && values[1] === question.correct_answer) {
            corrects += 1
          }
        })
      })
      return `${Math.round((corrects + Number.EPSILON) * 100) / 10}`
    }
  }))
  .actions((self: { answers: Answer[] }) => ({
    setAnswer: (data: Answer) => {
      const answers = toJS(self.answers)
      if (answers.length > 0) {
        Object.values(answers).forEach((answer, i) => {
          if (answer.number === data.number) {
            answers.splice(i, 1)
          }
        })
      }
      self.answers = [...answers, { number: data.number, text: data.text }]
    },
    setAnswers: (data: any) => {
      self.answers = data
    },
    getAnswer: (n: number) => {
      return toJS(self.answers).find((answer) => answer.number === n)
    }
  }))

export const resultStoreCreate = () => resultStore.create()
