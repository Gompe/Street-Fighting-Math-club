import React from 'react'

const Subtitle = ({ children }) => {
  return (
    <React.Fragment>
      <div className='container text-center my-3'>
        <h2 className='h5'>{children}</h2>
      </div>
    </React.Fragment>
  )
}

export default Subtitle
