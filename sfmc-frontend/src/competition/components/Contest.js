import React, { useState, useEffect } from 'react'
import Question from './Question'
import {useFetch} from '../controllers/useFetch'

import data from '../../test_files/data'
import { useParams } from 'react-router-dom'

const Contest = () => {

    const {contestId} = useParams()

    const questions = useFetch(`http://localhost:5000/api/v1/contests/${contestId}`) 
    //const [questions, setQuestions] = useState(data)

    return <>
        <div className='container'>
            <h2>Welcome to Contest {contestId}</h2>
        </div>
        <section className='contest'>
            {questions.map((question) => {
                return <Question key={question.id} {...question}/>
            })}
        </section>
    </>
    
}

export default Contest