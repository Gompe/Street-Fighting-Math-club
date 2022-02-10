import React, {useState} from 'react'
import { useParams } from 'react-router-dom'

const QuestionForm = () => {

    const {contestId} = useParams()
    const [question, setQuestion] = useState({
        description: 'Question description',
        answer: 999,
        contestId
    })

    const createQuestion = async () => {
        const url = "http://localhost:5000/api/v1/questions"

        console.log("Body of request")
        console.log(question)

        const response = await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(question),
            });

        response.json().then(data => {
            console.log(data);
        });
    }

    const handleChange = (e) => {

        const name = e.target.name
        const value = e.target.value

        setQuestion({...question, [name]:value})

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Submitted the following question:")
        console.log(question)

        setQuestion({
            description:'',
            answer:0
        })
        createQuestion()
    }

    return <>
    <div className='container'>
        <h2> Add a question to the contest </h2>
        <form>
            <label htmlFor="description"> Description </label>
            <input 
                type="text"
                id="description"
                name="description"
                value={question.description}
                onChange={handleChange}
            />

            <label htmlFor="answer"> Answer </label>
            <input 
                type="number"
                id="answer"
                name="answer"
                value={question.answer}
                onChange={handleChange}
            />

            <button type='submit' className='btn' onClick={handleSubmit}> Submit </button>
        </form>
    </div>
    </>
}

export default QuestionForm