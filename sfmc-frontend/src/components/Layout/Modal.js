import React, { useEffect } from 'react'

const Modal = ({ children, closeModal }) => {
  useEffect(() => {
    setTimeout(() => {
      closeModal()
    }, 10 * 1000)
  })

  return (
    <div className='modal'>
      <p> {children} </p>
      <button onClick={closeModal} className='btn btn-muted'>
        close
      </button>
    </div>
  )
}

export default Modal
