import { useRouter } from 'next/router'
import type { NextPage } from 'next'
import { observer } from 'mobx-react-lite'

import { Button } from '../components/commons'

const Home: NextPage = observer(() => {
  const { push } = useRouter()

  return (
    <div className="text-center">
      <h1 className="db text-2xl font-bold">Welcome to the Trivia Challenge!</h1>
      <h2 className="text-xl my-20">You will be presented with 10 True or False questions.</h2>
      <h2 className="text-xl mb-12">Can you score 100%?</h2>
      <Button onClick={() => push('/quiz')} title="Begin" />
    </div>
  )
})

export default Home
