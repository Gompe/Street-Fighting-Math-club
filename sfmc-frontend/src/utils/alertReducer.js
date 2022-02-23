import React, { useContext } from 'react'
import AlertContext from '../AlertContext'

const alertReducer = (state, action) => {
  if (action.type === 'CLOSE_ALERT') {
    return {
      ...state,
      show: false,
    }
  }

  if (action.type === 'SHOW_ALERT') {
    const { style, content } = action.payload

    return {
      ...state,
      show: true,
      style,
      content,
    }
  }

  throw new Error(`Unkown command at alert reducer: ${action.type}`)
}

export default alertReducer
