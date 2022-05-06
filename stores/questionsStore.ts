import { toJS } from 'mobx'
import { flow, types } from 'mobx-state-tree'

import { api } from '../utils'
import { QuestionModel } from './models'
import { Question } from './models/QuestionModel'

export const questionsStore = types
  .model('questionsStore', {
    questions: types.optional(types.array(QuestionModel), [])
  })
  .views((self) => ({
    get questionList() {
      return toJS(self.questions)
    }
  }))
  .actions((self) => ({
    setQuestions: (data: Question[] | []) => {
      self.questions = data
    },
    fetch: flow(function* () {
      const defaultSettings = { amount: 10, difficulty: 'hard', type: 'boolean' }
      const { results, error } = yield api.get(defaultSettings)
      if (error) return
      return results
    })
  }))

export const questionsStoreCreate = () => questionsStore.create()
