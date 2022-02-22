import React, { useEffect, useState } from 'react'
import { API_URL } from '../globals'

export const useFetch = (url) => {
  url = API_URL + url
  const [data, setData] = useState({})

  const getData = async () => {
    const response = await fetch(url)
    const jsonData = await response.json()

    setData(jsonData)
  }

  useEffect(() => {
    console.log('Use effect being called')
    getData()
  }, [url])

  return data
}
