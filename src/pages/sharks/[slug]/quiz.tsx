import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface QuizItem {
    question: string;
    answers: string[];
    correct: number;
}

export default function Quiz() {
    const router = useRouter()
    const { slug } = router.query
    const [quiz, setQuiz] = useState<QuizItem[]>([])

    useEffect(() => {
        if (!slug) return
        fetch(`/api/sharks/${slug}/quiz/`)
            .then(response => response.json())
            .then(data => { console.log("data ", data); setQuiz(data.quiz) })
    }, [slug])

    return (
        <div className="flex min-h-screen w-full flex-col items-center p-10">
            <h1>Quiz for {slug} shark</h1>
            <div className="flex-col text-center">
                {quiz.map((item, index) => (
                    <div key={index} className="quiz-item">
                        <h2 className="quiz-question font-bold">{item.question}</h2>
                        {item.answers.map((answer, i) => (
                            <li key={i} className="quiz-answer">{answer}</li>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}