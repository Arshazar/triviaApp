import { useEffect, useState } from 'react'
import cn from 'classnames'

import s from './QuestionBox.module.css'
import { Button } from '../../commons'
import { Question } from '../../../stores/models/QuestionModel'
import { useStore } from '../../../hooks'

interface Props {
  data: Question
  onChangeAnswers?: Function
  type: number
  index?: number
  isQuestionChanged?: boolean
  setIsQuestionChanged?: Function
}

const QuestionBox = ({
  data,
  onChangeAnswers = () => {},
  type = 1,
  index,
  isQuestionChanged = false,
  setIsQuestionChanged = () => {}
}: Props) => {
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [selection, setSelection] = useState<boolean | null>(null)
  const { resultStore } = useStore(null)
  const userAnswer = Number.isInteger(index)
    ? resultStore.getAnswer(Number(index) + 1)
    : { number: 0, text: null }

  const onChange = (v: string) => {
    let value = null

    switch (selection) {
      case true:
        value = v === 'true' ? null : v === 'false' ? false : null
        break
      case false:
        value = v === 'true' ? true : v === 'false' ? null : null
        break
      case null:
        value = v === 'true' ? true : false
        break
    }

    setSelection(value)
    onChangeAnswers(String(value))
  }

  useEffect(() => {
    if (userAnswer && type === 2) {
      if (data.correct_answer === userAnswer.text) setIsCorrect(true)
      else setIsCorrect(false)
    }
  }, [userAnswer])

  useEffect(() => {
    if (isQuestionChanged) {
      setSelection(null)
      if (userAnswer && userAnswer.text) {
        setSelection(userAnswer.text === 'true' ? true : userAnswer.text === 'false' ? false : null)
      } else {
        setSelection(null)
      }
      setIsQuestionChanged(false)
    }
  }, [isQuestionChanged])

  return type === 1 ? (
    <div className="box box-setting-1">
      <div className="block">
        <h1 className="mb-12 text-lg text-bold">{data.category}</h1>
        <h2 className="text-extrabold">{data.question}</h2>
      </div>
      <div className="block">
        {typeof index === 'number' && <span>{`${index + 1}`}/10</span>} <div></div>
        <div className="flex justify-evenly">
          <Button
            selected={selection ? true : false}
            layout="outline"
            title="True"
            onClick={() => onChange('true')}
          />
          <Button
            selected={selection === false ? true : false}
            layout="outline"
            title="False"
            onClick={() => onChange('false')}
          />
        </div>
      </div>
    </div>
  ) : (
    <div
      key={index}
      className={cn(
        'box box-setting-2 text-xs my-4 border-2',
        s[isCorrect ? 'correct' : 'incorrect']
      )}>
      <h2 className="text-extrabold mb-2">{data.question}</h2>
      <span>
        correct answer: <span>{data.correct_answer}</span>
      </span>
    </div>
  )
}

export { QuestionBox }
