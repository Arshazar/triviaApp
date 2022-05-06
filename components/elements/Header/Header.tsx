import Link from 'next/link'
import cn from 'classnames'
import Switch from 'react-switch'
import Image from 'next/image'

import s from './Header.module.css'
import Stars from '../../../public/stars.svg'
import Clouds from '../../../public/clouds.svg'

interface Props {
  theme: string
  setTheme: Function
}

const Header = ({ theme, setTheme }: Props) => {
  const onChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div
      className={cn(s.header, 'grid grid-cols-3 gap-1 p-4 text-center text-sm text-white italic')}>
      <div className="" />
      <div className="flex items-center">
        <Link href="/">
          <a className="m-auto text-xl">Trivia Test</a>
        </Link>
      </div>
      <div className="flex justify-end">
        <Switch
          onChange={onChange}
          checked={theme === 'dark'}
          offColor="#71cbf7"
          onColor="#0c0f3b"
          offHandleColor="#f9d71c"
          checkedIcon={
            <span className="centralised h-full">
              <Image src={Stars} alt="stars" width={11} height={11} />
            </span>
          }
          uncheckedIcon={
            <span className="centralised h-full">
              <Image src={Clouds} alt="clouds" width={15} height={15} />
            </span>
          }
        />
      </div>
    </div>
  )
}
export { Header }
