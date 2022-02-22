import React, { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserContext from '../../UserContext'
import authFetch from '../../utils/authFetch'

// Button for deleting a contest
const ContestDelete = ({ contestId }) => {
  const { token } = useContext(UserContext)

  const handleSubmit = async (e) => {
    await authFetch(`/contests/${contestId}`, {
      method: 'DELETE',
      token,
    })
    window.location.reload(false)
  }

  return (
    <React.Fragment>
      <button
        className='btn bg-danger bg-gradient text-white font-weight-bold'
        onClick={handleSubmit}
      >
        DELETE
      </button>
    </React.Fragment>
  )
}

export default ContestDelete
