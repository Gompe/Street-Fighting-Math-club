import React from 'react'
import { Link } from 'react-router-dom'
import ContestDelete from './ContestDelete'

const ContestCardAdmin = (contest) => {
  return (
    <React.Fragment key={contest._id}>
      <div className='col-md-4 my-2'>
        <div className='card card-fluid'>
          <div className='card-header'> {contest._id} </div>
          <div className='card-body'>
            <h2 className='card-title'>{contest.name}</h2>
            <p className='card-text'> {contest.description} </p>
            <div className='row'>
              <div className='col-9'>
                <Link
                  className='btn btn-primary'
                  to={`../admin/contests/${contest._id}`}
                >
                  View
                </Link>
              </div>
              <div className='col-3'>
                <ContestDelete
                  className='float-right'
                  contestId={contest._id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ContestCardAdmin
