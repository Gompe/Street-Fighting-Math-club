import React, { useContext } from 'react'
import AuthForm from './AuthForm'
import { API_URL } from '../globals'
import authFetch from '../utils/authFetch'
import UserContext from '../UserContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const { token, setToken } = useContext(UserContext)

  const handleSubmit = async (e, email, password) => {
    e.preventDefault()
    const data = await authFetch('/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (data.token) {
      setToken(data.token)
      localStorage.setItem('token', data.token)
      navigate('../')
    }
  }

  return (
    <React.Fragment>
      <div className='container my-5'>
        <div className='card'>
          <div className='card-body'>
            <h1 className='card-title'> Login Page </h1>
            <AuthForm handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
      <div className='container'>
        <p>
          Don't Have an Account?
          <Link to='/register'> Register. </Link>
        </p>
      </div>
    </React.Fragment>
  )
}

export default Login
