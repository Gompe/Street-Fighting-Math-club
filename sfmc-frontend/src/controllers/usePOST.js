import React from 'react'
import { useContext } from 'react'
import { API_URL } from '../globals'

export const usePOST = (url, requestBody) => {
  url = API_URL + url

  const asyncPOST = async () => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        authorization: '',
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()
    return data
  }

  return asyncPOST()
}
