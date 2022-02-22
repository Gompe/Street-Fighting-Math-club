import { useContext } from 'react'
import AlertContext from '../AlertContext'

const useAlert = (action) => {
  const { alertDispatch } = useContext(AlertContext)
  alertDispatch(action)
  setTimeout(5000, alertDispatch('CLOSE_ALERT'))
}

export default useAlert
