import React, { useContext } from 'react'
import AlertContext from './AlertContext'

const Alert = () => {
  const { alert, alertDispatch } = useContext(AlertContext)
  const className = `text-center container alert alert-${alert.style} text-center fixed-top`

  return (
    <React.Fragment>
      {alert.show && (
        <div className={className} role='alert'>
          <strong className='mx-3'> {alert.content} </strong>
          <button
            type='button'
            className='btn btn-close text-right'
            aria-label='Close'
            onClick={(e) => alertDispatch({ type: 'CLOSE_ALERT' })}
          ></button>
        </div>
      )}
    </React.Fragment>
  )
}

export default Alert
