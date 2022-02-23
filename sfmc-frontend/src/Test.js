import React from 'react'
import { Title } from './components/Layout'

async function sleep(ms) {
  await new Promise((r) => setTimeout(r, ms))
}

const Test = () => {
  const timeAsync = async () => {
    let a = ['0', '1', '2']
    console.time('queryTime')

    a.forEach(async (x) => {
      // console.time('async loop ' + x)
      await sleep(5000)
    })

    console.timeEnd('queryTime')
  }

  timeAsync()

  return (
    <div className='container'>
      <Title> Testing Page </Title>
    </div>
  )
}

export default Test
