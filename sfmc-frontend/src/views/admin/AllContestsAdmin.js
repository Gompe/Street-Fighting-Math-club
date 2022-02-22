import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authFetch from '../../utils/authFetch'
import UserContext from '../../UserContext'

import { ContestCardAdmin } from '../../components/Contest'
import { Subtitle, Title } from '../../components/Layout'

const AllContestsAdmin = () => {
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
      <div className='container'>
        <Title> List of Contests (ADMIN) </Title>
        <Subtitle>
          <Link to='../admin/contests/create' className='btn btn-primary'>
            Create Contest
          </Link>
        </Subtitle>
        <div className='container'>
          <div className='row my-5'>
            {contests && contests.map(ContestCardAdmin)}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AllContestsAdmin
