import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'

import authFetch from '../../utils/authFetch'

// Context
import UserContext from '../../UserContext'
import AlertContext from '../../AlertContext'

const Question = ({ question, index }) => {
  return (
    <div className='container justify-items-center'>
      <div className='card my-2 w-50 mx-auto'>
        <div className='card-header '> Question {index + 1}</div>
        <div className='card-body'>
          <p> {question.description} </p>
          <AnswerForm question={question} />
        </div>
      </div>
    </div>
  )
}

const AnswerForm = ({ question }) => {
  const questionId = question._id
  const { token } = useContext(UserContext)
  const { alertDispatch } = useContext(AlertContext)
  const { contestId } = useParams()

  const [lowerBound, setLowerBound] = useState('')
  const [upperBound, setUpperBound] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLowerBound('')
    setUpperBound('')

    alertDispatch({
      type: 'SHOW_ALERT',
      payload: {
        style: 'info',
        content: 'sending answer...',
      },
    })

    const requestBody = {
      questionId,
      lowerBound: parseFloat(lowerBound),
      upperBound: parseFloat(upperBound),
    }

    const response = await authFetch(
      `/play/${contestId}/answers/${questionId}`,
      {
        method: 'POST',
        body: requestBody,
        token,
      }
    )

    alertDispatch({
      type: 'SHOW_ALERT',
      payload: {
        style: 'success',
        content: 'Answer Submitted',
      },
    })
    setTimeout(5000, () => alertDispatch({ type: 'CLOSE_ALERT' }))

    // window.location.reload(false)
  }

  const changeLowerBound = (e) => {
    setLowerBound(e.target.value)
  }

  const changeUpperBound = (e) => {
    setUpperBound(e.target.value)
  }

  return (
    <div className='container text-center'>
      <form>
        <div className='row mb-3'>
          <div className='col-6'>
            <label htmlFor='lowerBound' className='form-label'>
              {' '}
              Lower Bound{' '}
            </label>
            <input
              type='text'
              id='lowerBound'
              name='lowerBound'
              className='form-control'
              value={lowerBound}
              onChange={changeLowerBound}
            />
          </div>

          <div className='col-6'>
            <label htmlFor='upperBound' className='form-label'>
              {' '}
              Upper Bound{' '}
            </label>
            <input
              type='text'
              id='upperBound'
              name='upperBound'
              className='form-control'
              value={upperBound}
              onChange={changeUpperBound}
            />
          </div>
        </div>

        <button
          className='btn btn-primary'
          type='submit'
          onClick={handleSubmit}
        >
          {' '}
          Submit Answer{' '}
        </button>
      </form>
    </div>
  )
}

export default Question
