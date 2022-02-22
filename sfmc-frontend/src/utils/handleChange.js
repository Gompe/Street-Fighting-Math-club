import React from 'react'

export const handleChange = (e, states) => {
  if (states[e.target.name]) {
    states[e.target.name](e.target.value)
  }
}
