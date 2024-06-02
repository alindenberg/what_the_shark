import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import QuestionCard from "@/components/QuestionCard";
import Question from "@/types/Question";
import QuizResults from "@/components/QuizResults";

export default function QuizPage() {
    const router = useRouter();
    const { slug } = router.query;
    const [score, setScore] = useState<number | null>(null);
    const [viewingResults, setViewingResults] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    useEffect(() => {
        if (slug) {
            fetch(`/api/sharks/${slug}/quiz`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to load quiz");
                    }
                    return response.json();
                })
                .then((data) => setQuestions(data.quiz.map((q: any, index: number) => ({
                    id: index,
                    text: q.question,
                    options: q.answers.map((a: string, i: number) => ({
                        id: i,
                        text: a,
                    })),
                    answer: q.correct,
                }))))
                .catch(() => setError("Failed to load quiz"));
        }
    }, [slug]);

    const handleChange = (optionId: number) => {
        setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: optionId }));
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSubmitted(true);

        if (Object.keys(answers).length === questions.length) {
            const score = questions.reduce((acc, question) => {
                if (question.answer === answers[question.id]) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            setScore(score);
        } else {
            setError("Please answer all questions before submitting.");
        }
    };

    const handleTryAgain = () => {
        setAnswers({});
        setSubmitted(false);
        setCurrentQuestionIndex(0);
        setViewingResults(false);
        setScore(null);
    };

    const handleViewResults = () => {
        setViewingResults(true);
    };

    return (
        <div className="container min-h-screen flex flex-col mx-auto items-center p-4">
            <h1 className="text-2xl font-bold mb-4">{slug} Shark Quiz</h1>
            {score && <h3>Your score is {score} out of {questions.length}</h3>}
            {error && <p className="text-red-500">{error}</p>}
            {currentQuestionIndex < questions.length && (
                <QuestionCard
                    index={currentQuestionIndex}
                    question={questions[currentQuestionIndex].text}
                    options={questions[currentQuestionIndex].options}
                    handleChange={handleChange}
                />
            )}
            {!submitted && Object.keys(answers).length === questions.length && (
                <button
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            )}
            {submitted && viewingResults && (
                <QuizResults
                    questions={questions}
                    answers={answers}
                    handleTryAgain={handleTryAgain}
                />
            )}
            {submitted && !viewingResults && (
                <div className="flex flex-col sm:flex-row">
                    <button
                        type="button"
                        className="bg-green-500 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:mr-2"
                        onClick={handleViewResults}
                    >
                        View Results
                    </button>
                    <button
                        type="button"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        onClick={handleTryAgain}
                    >
                        Try Again
                    </button>
                </div>
            )
            }
        </div >
    );
}
