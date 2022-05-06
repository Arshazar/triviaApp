import { useState } from 'react'
import { observer } from 'mobx-react-lite'

import { Button } from '../../../commons'
import { QuestionBox } from '../../../elements'
import { useStore } from '../../../../hooks'

interface Props {
  setFinish: Function
}

const QuestionList = observer(({ setFinish }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [isQuestionChanged, setIsQuestionChanged] = useState<boolean>(false)
  const { resultStore, questionsStore } = useStore(null)
  const questions = questionsStore.questionList
  const { getAnswers, setAnswer } = resultStore

  const onChageCurrentIndex = (direction: string) => {
    setIsQuestionChanged(true)
    switch (direction) {
      case 'next':
        setCurrentIndex(currentIndex + 1)
        break
      case 'prev':
        setCurrentIndex(currentIndex - 1)
        break
    }
  }

  const onFinishQuiz = () => {
    setFinish(true)
  }

  return (
    <div className="text-center">
      <QuestionBox
        index={currentIndex}
        type={1}
        onChangeAnswers={(v: string | null) =>
          setAnswer({ number: currentIndex + 1, text: v ? v : null })
        }
        isQuestionChanged={isQuestionChanged}
        setIsQuestionChanged={(v: boolean) => setIsQuestionChanged(v)}
        data={questions[currentIndex]}
      />
      <div className="flex justify-around">
        <Button
          className="m-12"
          disabled={currentIndex === 0}
          onClick={() => onChageCurrentIndex('prev')}
          title={'prev'}
        />
        {currentIndex === 9 && Object.entries(getAnswers).length === 10 ? (
          <Button className="m-12" onClick={onFinishQuiz} title={'Finish'} />
        ) : (
          <Button
            className="m-12"
            onClick={() => onChageCurrentIndex('next')}
            disabled={questions.length === currentIndex + 1}
            title={'next'}
          />
        )}
      </div>
    </div>
  )
})

export { QuestionList }
