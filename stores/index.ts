import { applySnapshot, types } from 'mobx-state-tree'

import { questionsStore, questionsStoreCreate } from './questionsStore'
import { resultStore, resultStoreCreate } from './resultStore'

const initStore = (data: any) => {
  return types
    .model({ questionsStore, resultStore })
    .actions((self) => ({
      update(data: any) {
        applySnapshot(self, data)
      }
    }))
    .create(
      data || {
        questionsStore: questionsStoreCreate(),
        resultStore: resultStoreCreate()
      }
    )
}

export default initStore
