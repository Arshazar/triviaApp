import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem' }}>The page does not exist!</h1>
      <span>
        return to{' '}
        <Link href="/">
          <a style={{ color: 'rgb(6 182 212)' }}>Home</a>
        </Link>
      </span>
    </div>
  )
}
