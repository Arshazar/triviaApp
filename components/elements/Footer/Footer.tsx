import cn from 'classnames'

import s from '../Header/Header.module.css'

const Footer = () => {
  return (
    <div className={cn(s.header, 'p-4 text-center text-sm text-white bg-zinc-900 italic')}>
      Made by Arshazar
    </div>
  )
}
export { Footer }
