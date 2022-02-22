import React from 'react'
import { Link } from 'react-router-dom'
import { Subtitle, Title } from '../../components/Layout'

// --- The admin can go everything
const Admin = () => {
  return (
    <React.Fragment>
      <Title> ADMIN PAGE </Title>
      <Subtitle> Admin Links: </Subtitle>
      <div className='container text-center w-50'>
        <ul>
          <li>
            <Link to='/admin/contests'> List of Contests Admin </Link>
          </li>
          <li>
            <Link to='/admin/contests/create'> Create Contest </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default Admin
