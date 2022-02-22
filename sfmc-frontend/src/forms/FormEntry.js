import React from 'react'

const FormEntry = ({ name, value, handleChange, inputType, children }) => {
  return (
    <React.Fragment>
      <div className='container my-3'>
        <FormLabel {...{ name, children }} />
        <FormControl {...{ name, value, handleChange, inputType }} />
      </div>
    </React.Fragment>
  )
}

const FormControl = ({ name, value, handleChange, inputType }) => {
  inputType = inputType || 'text'

  if (inputType === 'textarea') {
    return (
      <React.Fragment>
        <textarea
          name={name}
          id={name}
          cols='30'
          rows='10'
          value={value}
          onChange={handleChange}
          className='form-control'
        ></textarea>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <input
        type={inputType}
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-control'
      />
    </React.Fragment>
  )
}

const FormLabel = ({ name, children }) => {
  return (
    <React.Fragment>
      <label htmlFor={name} className='form-label'>
        {' '}
        {children}{' '}
      </label>
    </React.Fragment>
  )
}

export default FormEntry
