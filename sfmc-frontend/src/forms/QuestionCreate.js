import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_URL } from '../globals'
import { usePOST } from '../controllers/usePOST'
import authFetch from '../utils/authFetch'
import UserContext from '../UserContext'

const QuestionForm = () => {
  const { contestId } = useParams()
  const { token } = useContext(UserContext)
  const [question, setQuestion] = useState({
    description: '',
    answer: '',
    contestId,
  })

  const createQuestion = async () => {
    const body = { ...question }
    const response = await authFetch('/questions', {
      method: 'POST',
      token,
      body,
    })
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    setQuestion({ ...question, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setQuestion({
      ...question,
      description: '',
      answer: '',
    })
    createQuestion()
  }

  return (
    <React.Fragment>
      <div className='container text-center my-5 w-75'>
        <h2 className='display-5'> Add Question to the Contest </h2>
        <h3 className='h6'> {contestId} </h3>
        <form>
          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              <h3> Question Description </h3>
            </label>

            <textarea
              name='description'
              id='description'
              cols='30'
              rows='10'
              className='form-control border border-primary rounded'
              value={question.description}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className='mb-3'>
            <label htmlFor='answer' className='form-label'>
              <h3> Question Answer </h3>
            </label>
            <br />
            <input
              type='text'
              name='answer'
              id='answer'
              className='form-label border border-primary rounded'
              value={question.answer}
              onChange={handleChange}
            />
          </div>

          <button className='btn btn-primary' onClick={handleSubmit}>
            {' '}
            Create{' '}
          </button>
        </form>
      </div>
    </React.Fragment>
  )
}

export default QuestionForm
