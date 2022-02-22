import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserContext from '../UserContext'

import authFetch from '../utils/authFetch'

import FormEntry from './FormEntry'

const ContestUpdateForm = () => {
  const { token } = useContext(UserContext)
  const { contestId } = useParams()
  const navigate = useNavigate()

  const timeNow = new Date().toISOString().split('.')[0]

  // --- Contest use State
  const [contest, setContest] = useState({
    name: '',
    description: '',
    startingTime: timeNow,
    duration: 30,
  })

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setContest({ ...contest, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await authFetch(`/admin/contests/${contestId}`, {
      method: 'PATCH',
      body: { ...contest },
      token,
    })
    navigate('../contests')
  }

  useEffect(() => {
    authFetch(`/admin/contests/${contestId}`, {
      method: 'GET',
      token,
    })
      .then((response) => {
        setContest({
          ...response.contest,
          startingTime: response.contest.startingTime.split('.')[0],
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }, [contestId])

  return (
    <React.Fragment>
      <div className='container-md w-50 my-5'>
        <div className='card'>
          <div className='card-body'>
            <div className='card-title'>
              <h2> Update a Contest Here </h2>
            </div>
            <form>
              <FormEntry
                name='name'
                inputType='text'
                value={contest.name}
                handleChange={handleChange}
              >
                {' '}
                Contest Name{' '}
              </FormEntry>
              <FormEntry
                name='description'
                inputType='textarea'
                value={contest.description}
                handleChange={handleChange}
              >
                {' '}
                Contest Description{' '}
              </FormEntry>

              <FormEntry
                name='startingTime'
                inputType='datetime-local'
                value={contest.startingTime}
                handleChange={handleChange}
              >
                Choose Starting Time
              </FormEntry>

              <FormEntry
                name='duration'
                inputType='number'
                value={contest.duration}
                handleChange={handleChange}
              >
                Duration (min)
              </FormEntry>

              <button onClick={handleSubmit} className='btn btn-primary'>
                Create!
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ContestUpdateForm
