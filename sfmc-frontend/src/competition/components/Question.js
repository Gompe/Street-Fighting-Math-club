import React, { useState } from "react"
import {submitPOST} from '../controllers/submitPOST'

const Question = ({contestId, questionId, content}) => {

    return <article className="product" style={{marginBottom:"3rem", marginTop:"1rem"}}>
        <p> {content} </p>
        <AnswerForm {...{contestId, questionId, content}}/>
    </article>
}

const AnswerForm = ({contestId, questionId, content}) => {

    const [lowerBound, setLowerBound] = useState('')
    const [upperBound, setUpperBound] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(lowerBound, upperBound)

        setLowerBound('')
        setUpperBound('')
    }

    const changeLowerBound = (e) => {
        setLowerBound(e.target.value)
    }

    const changeUpperBound = (e) => {
        setUpperBound(e.target.value)
    }

    return <form>
        <label htmlFor="lowerBound"> Lower Bound </label>
        <input
            type="text"
            id="lowerBound"
            name="lowerBound"
            value={lowerBound}
            onChange={changeLowerBound}
        />

        <label htmlFor="upperBound"> Upper Bound </label>
        <input
            type="text"
            id="upperBound"
            name="upperBound"
            value={upperBound}
            onChange={changeUpperBound}
        />

        <button className='btn' type="submit" onClick={handleSubmit}> Submit Answer </button>
    </form>
}

export default Question