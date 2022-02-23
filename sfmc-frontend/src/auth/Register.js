import React, { useState } from 'react'
import AuthForm from './AuthForm'
import { API_URL } from '../globals'
import FormEntry from '../forms/FormEntry'
import { handleChange } from '../utils/handleChange'
import authFetch from '../utils/authFetch'

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    password: '',
    email: '',
  })

  // --- Register User in the DB
  const registerUser = async () => {
    const response = await authFetch('/auth/register', {
      method: 'POST',
      body: { ...user },
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    registerUser()
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser({ ...user, [name]: value })
  }

  return (
    <React.Fragment>
      <div className='container my-5 w-50'>
        <div className='card'>
          <div className='card-body'>
            <h1 className='card-title'> Register Page </h1>
            <form>
              <FormEntry
                name='email'
                inputType='email'
                value={user.email}
                handleChange={handleChange}
              >
                Email
              </FormEntry>

              <FormEntry
                name='name'
                inputType='text'
                value={user.name}
                handleChange={handleChange}
              >
                Username
              </FormEntry>

              <FormEntry
                name='password'
                inputType='password'
                value={user.password}
                handleChange={handleChange}
              >
                Password
              </FormEntry>
            </form>

            <button onClick={handleSubmit} className='btn btn-primary'>
              Submit
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Register
