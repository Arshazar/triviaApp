import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

import s from './Button.module.css'

interface Props {
  title: string
  onClick?: Function
  className?: string
  type?: string
  style?: object
  disabled?: boolean
  selected?: boolean
  href?: string
  status?: string
  layout?: string
}

interface Event {
  preventDefault: Function
}

const Button = ({
  type = 'button', //button or link
  onClick = () => {},
  layout = 'default',
  title,
  status = '', //correct or incorrect
  className,
  style,
  href,
  disabled = false,
  selected = false
}: Props) => {
  const iRef = useRef<any>(null)
  const Container = type === 'link' ? 'a' : 'button'
  const props = {
    className: cn(
      s['btn'],
      className,
      s[layout],
      s[status],
      `${selected ? s['selected'] : ''} ${disabled ? s['disabled'] : ''}`
    ),
    onClick: (e: Event) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick()
    },
    style
  }
  const children = title && <span>{title}</span>

  useEffect(() => {
    if (iRef.current !== null && !selected) {
      iRef.current.blur()
    }
  }, [selected])

  return type === 'link' ? (
    <Link href={`${href}`} passHref>
      <Container {...props}>{children}</Container>
    </Link>
  ) : (
    <Container {...props}>{children}</Container>
  )
}

export { Button }
