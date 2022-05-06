import { createContext, useContext } from 'react'
import initStore from '../stores'

let store: any
const StoreContext = createContext<object | null>(null)

const useStore = (serverStore: any) => {
  const storeContext = useContext(StoreContext)
  let _store = typeof window === 'undefined' ? storeContext : store
  if (serverStore && typeof window !== 'undefined' && !store) {
    store = initStore(serverStore)
    _store = store
  }
  return _store
}

export { useStore, StoreContext }
