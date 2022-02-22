import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authFetch from '../utils/authFetch'
import UserContext from '../UserContext'

import { ContestCard } from '../components/Contest'
import { Title } from '../components/Layout'

const AllContests = () => {
  // version 1 ... get all

  const { token } = useContext(UserContext)
  const [contests, setContests] = useState([])

  useEffect(() => {
    authFetch('/contests', { method: 'GET', token })
      .then((data) => {
        setContests(data.contests)
      })
      .catch((e) => {
        console.log(e)
      })
  }, [])

  return (
    <React.Fragment>
      <Title> List of Contests </Title>
      <div className='container'>
        <div className='row my-5'>{contests && contests.map(ContestCard)}</div>
      </div>
    </React.Fragment>
  )
}

export default AllContests
