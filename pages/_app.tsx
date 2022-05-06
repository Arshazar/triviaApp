import { useEffect, useState } from 'react'
import type { AppProps as NextAppProps } from 'next/app'
import Error from 'next/error'
import { getSnapshot } from 'mobx-state-tree'

import '../styles/globals.css'
import { Header, Footer, ErrorBoundary } from '../components/elements'
import { StoreContext } from '../hooks/useStore'
import initStore from '../stores'
import { useTheme, useStore } from '../hooks'

type AppProps = NextAppProps & {
  initialStore: object | null
}

const App = ({ Component, pageProps, initialStore = null }: AppProps) => {
  const { theme, setTheme } = useTheme() //theme management
  useStore(initialStore)

  //server-side error handling
  if (pageProps && pageProps.error) {
    return (
      <Error
        statusCode={0}
        title="No internet connection! Please make sure you are connected to the internet then refresh the page"
      />
    )
  }

  return (
    <ErrorBoundary>
      <StoreContext.Provider value={initStore(initialStore)}>
        <div className="fullScreen" data-theme={theme}>
          <Header theme={theme} setTheme={setTheme} />
          <div className="container-1 h-full">
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      </StoreContext.Provider>
    </ErrorBoundary>
  )
}

App.getInitialProps = async ({ ctx }: any) => {
  if (ctx.req?.url?.indexOf('/_next/data/') === -1) {
    const initialStore = initStore(null)
    return { initialStore: getSnapshot(initialStore) }
  }
  return {}
}

export default App
