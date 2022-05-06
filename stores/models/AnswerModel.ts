import { types } from 'mobx-state-tree'

export interface Answer {
  number: number
  text: string | null
}

const AnswerModel = types.model({
  number: types.number,
  text: types.maybeNull(types.string)
})

export { AnswerModel }
