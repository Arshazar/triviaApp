import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

import { useStore } from '../../../../hooks'
import { Question } from '../../../../stores/models/QuestionModel'
import { storage } from '../../../../utils'
import { Button } from '../../../commons'
import { QuestionBox } from '../../../elements'

const Result = observer(() => {
  const {
    resultStore,
    questionsStore: { questionList }
  } = useStore(null)
  const { score } = resultStore
  const { reload } = useRouter()

  const onResetStore = () => {
    reload()
  }

  const _renderQuestions = () => {
    return questionList.map((item: Question, i: number) => (
      // eslint-disable-next-line react/jsx-key
      <QuestionBox index={i} type={2} data={item} />
    ))
  }

  return (
    <div className="box box-setting-3 text-center">
      <h1>{`You scored ${score}%`}</h1>
      <div className="answers-box text-left mt-4 overflow-auto max-h-96 w-fit m-auto">
        {_renderQuestions()}
      </div>
      <div>
        <Button className="mt-5" title="Try again!" onClick={onResetStore} />
      </div>
    </div>
  )
})

export { Result }
