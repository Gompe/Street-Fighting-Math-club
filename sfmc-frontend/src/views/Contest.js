import React, { useState, useEffect, useContext } from 'react'
import { Question } from '../components/Question'

import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
import authFetch from '../utils/authFetch'
import UserContext from '../UserContext'
import ContestRegister from '../components/Contest/ContestRegister'
import { Subtitle, Title } from '../components/Layout'

import AlertContext from '../AlertContext'

const Contest = () => {
  const { token } = useContext(UserContext)
  const { alertDispatch } = useContext(AlertContext)

  const { contestId } = useParams()

  const [isRegistered, setIsRegistered] = useState(false)

  const [data, setData] = useState({
    contest: {
      startingTime: new Date(),
      duration: 100,
    },
    questions: [],
    attempts: -1,
  })
  const [errorData, setErrorData] = useState({
    isError: false,
    msg: '',
  })

  useEffect(() => {
    authFetch(`/play/${contestId}`, { method: 'GET', token })
      .then((response) => {
        response.contest.startingTime = new Date(response.contest.startingTime)
        setData(response)
        setIsRegistered(true)
      })
      .catch((error) => {
        alertDispatch({
          type: 'SHOW_ALERT',
          payload: {
            style: 'danger',
            content: error.message,
          },
        })
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
      {!isRegistered ? (
        <ContestRegister />
      ) : (
        <ContestStatus
          attempts={data.attempts}
          startingTime={data.contest.startingTime}
          duration={data.contest.duration}
        />
      )}
      <div className='container my-4 text-center'>
        <Link to='./scoreboard'>
          {' '}
          <button className='btn btn-warning'> View Scoreboard </button>
        </Link>
      </div>
      {errorData.isError && (
        <div className='container'>
          <h2> {errorData.msg} </h2>
        </div>
      )}
      <div className='container'>
        {data.questions.map((question, index) => (
          <Question key={question._id} question={question} index={index} />
        ))}
      </div>{' '}
    </React.Fragment>
  )
}

const ContestStatus = ({ attempts, startingTime, duration }) => {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear()
    let difference = +startingTime - +new Date() + duration * 60 * 1000

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timerComponents = []

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return
    }

    timerComponents.push(
      <span key={`timer-${interval}`}>
        {timeLeft[interval]} {interval}{' '}
      </span>
    )
  })

  return (
    <React.Fragment>
      <div className='container w-25 text-center text-white fonte-weigth-bold'>
        <div className='card bg-info'>
          <div className='card-header'>
            <h3> Information </h3>
          </div>
          <div className='card-body'>
            <h3> Time Left </h3>
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            <h4> Attempts Left {attempts} </h4>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Contest
