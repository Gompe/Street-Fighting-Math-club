import React, { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import UserContext from '../../UserContext'
import authFetch from '../../utils/authFetch'

const ContestRegister = () => {
  const navigate = useNavigate()

  const { token } = useContext(UserContext)
  const { contestId } = useParams()

  const handleSubmit = async (e) => {
    try {
      const response = await authFetch(`/participations/${contestId}`, {
        method: 'POST',
        token,
        body: {},
      })

      window.location.reload()
    } catch (e) {
      console.log(e)
    }

    navigate(`../contests/${contestId}`)
  }

  return (
    <React.Fragment>
      <div className='container my-5 w-25'>
        <div className='card text-center bg-info text-white border-dark'>
          <div className='card-header'></div>
          <div className='card-body'>
            <h5 className='card-title'> Register for this Contest! </h5>
            <p className='card-text'>
              With supporting text below as a natural lead-in to additional
              content.
            </p>

            <button className='btn btn-primary my-5' onClick={handleSubmit}>
              Participate
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ContestRegister
