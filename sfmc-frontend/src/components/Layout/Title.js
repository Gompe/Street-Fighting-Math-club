import React from 'react'

const Title = ({ children }) => {
  return (
    <React.Fragment>
      <div className='container text-center my-5'>
        <h1 className='display-1'> {children} </h1>
      </div>
    </React.Fragment>
  )
}

export default Title
