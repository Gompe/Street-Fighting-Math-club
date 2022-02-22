import { useContext } from 'react'
import UserContext from '../UserContext'
import authFetch from './authFetch'

const useAuthentication = async () => {
  const { token } = useContext(UserContext)
  if (token === '') {
    return false
  }

  return true

  const response = await authFetch('auth/verify', {
    method: 'GET',
    token,
  })

  return response.authenticated ? true : false
}

export default useAuthentication
