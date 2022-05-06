import { useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite'

import { QuestionList, Result } from '../../components/pages/Quiz'
import initStore from '../../stores'
import { useStore } from '../../hooks'
import { Question } from '../../stores/models/QuestionModel'
import { storage } from '../../utils'

interface Props {
  data: Question[] | null
}

const Quiz = observer(({ data }: Props) => {
  const [isCompleted, setCompleted] = useState(false)
  const { questionsStore } = useStore(null)

  useMemo(async () => {
    await questionsStore.setQuestions(data)
  }, [data])

  return (
    <div className="container-2">
      {isCompleted ? <Result /> : <QuestionList setFinish={(v: boolean) => setCompleted(v)} />}
    </div>
  )
})

export const getServerSideProps = async () => {
  const { questionsStore } = initStore(null)
  const data = await questionsStore.fetch()

  if (typeof window !== 'undefined') console.log('window', window)
  return {
    props: {
      data: data || null,
      error: !data && 'Please make sure you are connected to the internet then refresh the page'
    }
  }
}

export default Quiz
