import React, { useState } from 'react'

const AuthForm = ({ handleSubmit }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === 'email') {
      setEmail(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }

  return (
    <div className='container'>
      <form>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            {' '}
            Email{' '}
          </label>
          <input
            type='email'
            name='email'
            id='email'
            className='form-control'
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            {' '}
            Password{' '}
          </label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            className='form-control'
            onChange={handleChange}
          />
        </div>

        <button
          className='btn btn-primary'
          onClick={(e) => handleSubmit(e, email, password)}
        >
          {' '}
          Submit{' '}
        </button>
      </form>
    </div>
  )
}

export default AuthForm
