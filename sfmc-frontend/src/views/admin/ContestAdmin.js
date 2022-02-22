import React, { useState, useEffect, useContext } from 'react'
import { Question } from '../../components/Question'

import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import authFetch from '../../utils/authFetch'
import UserContext from '../../UserContext'
import ContestUpdateForm from '../../forms/ContestUpdate'

import { Title, Subtitle } from '../../components/Layout'

const ContestAdmin = () => {
  const { token } = useContext(UserContext)
  const { contestId } = useParams()

  const [data, setData] = useState({
    contest: {},
    questions: [],
    attempts: -1,
  })
  const [errorData, setErrorData] = useState({
    isError: false,
    msg: '',
  })

  useEffect(() => {
    authFetch(`/admin/contests/${contestId}`, { method: 'GET', token })
      .then((response) => {
        setData({
          ...data,
          ...response,
        })
      })
      .catch((error) => {
        console.error(error)
        setErrorData({
          isError: true,
          msg: error.message,
        })
      })
  }, [contestId])

  return (
    <React.Fragment>
      <Title> {data.contest.name} </Title>
      <Subtitle> {data.contest.description} </Subtitle>

      <div className='container my-3'>
        <Link to='./scoreboard'>
          {' '}
          <button className='btn btn-warning'> View Scoreboard </button>
        </Link>
      </div>

      <div className='container'>
        <Link
          to={`/admin/contests/${contestId}/create-question`}
          className='btn btn-primary'
        >
          Create Question for This Contest
        </Link>
      </div>

      <div className='container my-4'>
        <p>
          {' '}
          {data.contest
            ? data.contest.description
            : 'No description available'}{' '}
        </p>
      </div>

      {errorData.isError && (
        <div className='container'>
          <h2> {errorData.msg} </h2>
        </div>
      )}

      <div className='container'>
        <ContestUpdateForm />
      </div>

      <div className='container'>
        {data.questions.map((question) => {
          const questionId = question._id
          const content = question.description
          const contestId = question.contestId

          return (
            <Question
              key={question._id}
              {...{ questionId, content, contestId }}
            />
          )
        })}
      </div>
    </React.Fragment>
  )
}

export default ContestAdmin
