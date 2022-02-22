import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserContext from '../UserContext'
import authFetch from '../utils/authFetch'

import { Title, Subtitle } from '../components/Layout'

const Scoreboard = () => {
  const { contestId } = useParams()

  const [data, setData] = useState({
    userRows: [],
    contestName: 'Loading Contest',
    numQuestions: 13,
  })

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    authFetch(`/test/scoreboard/${contestId}`, {
      method: 'GET',
    })
      .then((response) => {
        setData(response)
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [contestId])

  return (
    <React.Fragment>
      <Title> Scoreboard </Title>
      <Subtitle> {data.contestName} </Subtitle>
      <div className='container text-center'>
        <Link className='btn btn-primary my-5' to={`../contests/${contestId}`}>
          Back to Contest
        </Link>
      </div>
      <div className='container'>
        {isLoading ? (
          <h1> Loading ...</h1>
        ) : (
          <table className='table table-bordered'>
            <ScoreboardHeader numQuestions={data.numQuestions} />
            <ScoreboardBody
              numQuestions={data.numQuestions}
              userRows={data.userRows}
            />
          </table>
        )}
      </div>
    </React.Fragment>
  )
}

const ScoreboardHeader = ({ numQuestions }) => {
  const arrayTh = []
  for (let i = 1; i <= numQuestions; i++) {
    arrayTh.push(
      <th scope='col' key={`question-${i}-th`}>
        {i}
      </th>
    )
  }

  return (
    <React.Fragment>
      <thead>
        <tr>
          <th scope='col'> # </th>
          {arrayTh}
          <th scope='col'> points </th>
        </tr>
      </thead>
    </React.Fragment>
  )
}

const ScoreboardBody = ({ userRows, numQuestions }) => {
  return (
    <React.Fragment>
      <tbody>
        {userRows.map((userRow) => (
          <ScoreboardUser
            key={userRow.userId + 'row'}
            userRow={userRow}
            numQuestions={numQuestions}
          />
        ))}
      </tbody>
    </React.Fragment>
  )
}

const ScoreboardUser = ({ userRow, numQuestions }) => {
  const { userId, userName, answers, points } = userRow
  console.log(userRow)

  const [isLoading, setIsLoading] = useState(true)
  const [grades, setGrades] = useState(Array(numQuestions).fill(-1))

  useEffect(() => {
    let gradesCopy = grades
    for (const answer of answers) {
      gradesCopy[answer.questionIndex] = answer.grade
    }

    setGrades(gradesCopy)
    setIsLoading(false)
  }, [])

  const gradesRow = (grades) => {
    return (
      <React.Fragment>
        {grades.map((grade, index) => {
          // green for correct answer
          // yellow for wrong answer
          let bg = 'bg-warning'
          if (grade !== -1) {
            bg = 'bg-success'
          }

          return (
            <td
              scope='row'
              key={userId + `-${index}`}
              className={bg + ' text-black font-weight-bold'}
            >
              {grade}
            </td>
          )
        })}
        <td
          scope='row'
          key={userId + '-points'}
          className='text-black font-weight-bold'
        >
          {points}
        </td>
      </React.Fragment>
    )
  }

  const gradesDefault = (numQuestions) => {
    const arrayAux = Array(numQuestions)
    return (
      <React.Fragment>
        {arrayAux.map((x, index) => {
          return (
            <td
              scope='row'
              key={userId + `-${index}`}
              className={'bg-info text-black font-weight-bold'}
            >
              {'...'}
            </td>
          )
        })}
        <td
          scope='row'
          key={userId + '-points'}
          className='text-black font-weight-bold'
        >
          {'???'}
        </td>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <tr>
        <th scope='row'> {userName} </th>
        {isLoading ? gradesDefault(numQuestions) : gradesRow(grades)}
      </tr>
    </React.Fragment>
  )
}

// ------- OLD ---------

const Scoreboard_ = () => {
  const { contestId } = useParams()
  const { token } = useContext(UserContext)

  // --- data to be fetched
  const [contest, setContest] = useState({})
  const [questions, setQuestions] = useState([])
  const [users, setUsers] = useState([])

  // --- functions that will fetch data
  const getContestAndQuestions = async () => {
    const data = await authFetch(`/contests/${contestId}`, {
      method: 'GET',
      token,
    })

    setContest(data.contest)
    setQuestions(data.questions)
  }

  const getUsers = async () => {
    const participations = await authFetch(`/participations/${contestId}`, {
      method: 'GET',
      token,
    })

    console.trace(participations)

    const usersInContest = []
    participations.forEach((participation) => {
      usersInContest.push(participation.userId)
    })

    setUsers(usersInContest)
  }

  // --- useEffect
  useEffect(() => {
    getContestAndQuestions()
    getUsers()
  }, [])

  // --- Returning Component
  return (
    <React.Fragment>
      <Title> Scoreboard </Title>
      <Subtitle>
        <Link to={`../contests/${contestId}`} className='btn btn-primary'>
          Back to contest
        </Link>
      </Subtitle>

      <div className='container w-75'>
        <table className='table table-bordered'>
          <ScoreboardHeader questions={questions} />
          {questions.length > 0 && (
            <ScoreboardBody users={users} questions={questions} />
          )}
        </table>
      </div>
    </React.Fragment>
  )
}

const ScoreboardHeader_ = ({ questions }) => {
  return (
    <React.Fragment>
      <thead>
        <tr>
          <th scope='col'> # </th>
          {questions.map((question, index) => {
            return (
              <th scope='col' key={question._id}>
                {index}
              </th>
            )
          })}
          <th scope='col'> POINTS </th>
        </tr>
      </thead>
    </React.Fragment>
  )
}

const ScoreboardBody_ = ({ questions, users }) => {
  return (
    <React.Fragment>
      <tbody>
        {users.map((userId) => {
          return (
            <ScoreboardUser
              userId={userId}
              questions={questions}
              key={userId}
            />
          )
        })}
      </tbody>
    </React.Fragment>
  )
}

const ScoreboardUser_ = ({ userId, questions }) => {
  const { token } = useContext(UserContext)
  const [grades, setGrades] = useState(Array(questions.length).fill(-1))
  // points start at (10)*(2**13)
  const [points, setPoints] = useState(10 * 1024 * 8)

  // --- Getting grades from the server
  const getGrades = async () => {
    let gradesData = Array(questions.length).fill(-1)

    // --- Updating Each Problems Grade
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i]
      const response = await authFetch(
        `/participations/question/${question._id}/user/${userId}`,
        {
          method: 'GET',
          token,
        }
      )

      gradesData[i] = response.lastGrade
    }

    setGrades(gradesData)
  }

  useEffect(() => {
    getGrades()
  }, [])

  return (
    <React.Fragment>
      <tr>
        <th scope='row'> {userId} </th>
        {grades.map((grade, index) => {
          let bg
          if (grade !== -1) {
            bg = 'bg-success'
          } else {
            bg = 'bg-warning'
          }
          return (
            <td
              scope='row'
              key={userId + questions[index]._id}
              className={bg + ' text-black font-weight-bold'}
            >
              {grade}
            </td>
          )
        })}
        <td scope='row'> {points} </td>
      </tr>
    </React.Fragment>
  )
}

export default Scoreboard
