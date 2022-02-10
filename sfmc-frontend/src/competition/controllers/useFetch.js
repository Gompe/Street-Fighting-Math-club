import React, {useEffect, useState} from 'react'

export const useFetch = (url) => {

    const [questions, setQuestions] = useState([])

    // fetch the data
    const getQuestions = async () => {
        const response = await fetch(url)
        const jsonData = await response.json()

        const questions = jsonData.questions
        console.log(questions)

        setQuestions(questions.map((question) => {

            const cleanQuestion = {
                questionId: question._id,
                contestId: jsonData.contest._id,
                content: question.description
            }
            console.log(cleanQuestion)

            return cleanQuestion
        }))
    }

    useEffect(() => {
        getQuestions();
    }, [url])

    return questions
}
