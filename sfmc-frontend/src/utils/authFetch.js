import { API_URL } from '../globals'

import React, { useContext } from 'react'
import AlertContext from '../AlertContext'

const authFetch = async (url, { method, token, body }) => {
  // cleaning input
  url = API_URL + url
  token = token || ''
  body = body || {}

  const props = {}
  if (method !== 'GET' && method !== 'DELETE') {
    props.body = JSON.stringify(body)
  }

  // JWT Token
  const authorization = 'Bearer ' + token

  const response = await fetch(url, {
    ...props,
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      authorization,
    },
  })

  if (response.status >= 400) {
    const errorData = await response.json()
    throw new Error(errorData.msg)
  }

  return await response.json()
}

export default authFetch
