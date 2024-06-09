import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Layout from "@/components/Layout";
import QuestionCard from "@/components/QuestionCard";
import Question from "@/types/Question";
import QuizResults from "@/components/QuizResults";

export default function QuizPage() {
    const router = useRouter();
    const slug = String(router.query.slug);
    const [score, setScore] = useState<number | null>(null);
    const [canGoBack, setCanGoBack] = useState<boolean>(false);
    const [canGoForward, setCanGoForward] = useState<boolean>(true);
    const [viewingResults, setViewingResults] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (slug) {
            fetch(`/api/sharks/${slug}/quiz`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to load quiz");
                    }
                    return response.json();
                })
                .then((data) => {
                    setQuestions(data.quiz.map((q: any, index: number) => ({
                        id: index,
                        text: q.question,
                        options: q.answers.map((a: string, i: number) => ({
                            id: i,
                            text: a,
                        })),
                        answer: q.correct,
                    })));
                    setLoading(false);
                })
                .catch(() => {
                    setError("Failed to load quiz");
                    setLoading(false);
                });
        }
    }, [slug]);

    useEffect(() => {
        setCanGoBack(currentQuestionIndex > 0);
        setCanGoForward(answers[currentQuestionIndex] !== undefined)
    }, [currentQuestionIndex, answers, questions]);

    const handleSelection = async (optionId: number) => {
        setAnswers((prev) => ({
            ...prev,
            [currentQuestionIndex]: optionId,
        }));
    }

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
        setCanGoBack(false);
        setCanGoForward(false);
    };

    const handleViewResults = () => {
        setViewingResults(true);
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex-grow flex items-center justify-center">Generating a brand new quiz just for you...</div>
            </Layout>
        )
    }

    const transformSlugToName = (slug: string) => {
        return slug
            .split('_')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <Layout>
            <div className="container flex flex-col mx-auto items-center p-4">
                <h1 className="text-2xl font-bold mb-4">{transformSlugToName(slug)} Shark Quiz</h1>
                {score && <h3>Your score is {score} out of {questions.length}</h3>}
                {error && <p className="text-red-500">{error}</p>}
                {!!questions.length && !submitted && (
                    <>
                        <QuestionCard
                            index={currentQuestionIndex}
                            question={questions[currentQuestionIndex].text}
                            options={questions[currentQuestionIndex].options}
                            selection={answers[currentQuestionIndex]}
                            handleSelection={handleSelection}
                        />

                        <div className="inline-flex">
                            <button
                                className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l ${canGoBack ? '' : 'opacity-50'}`}
                                disabled={!canGoBack}
                                onClick={() => { setCurrentQuestionIndex((prev) => prev - 1) }}>
                                Prev
                            </button>
                            {currentQuestionIndex < questions.length - 1 ? (
                                <button
                                    className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r ${canGoForward ? '' : 'opacity-50'}`}
                                    disabled={!canGoForward}
                                    onClick={() => { setCurrentQuestionIndex((prev) => prev + 1) }}
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${canGoForward ? '' : 'opacity-50'}`}
                                    disabled={!canGoForward}
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            )}
                        </div>
                    </>
                )
                }
                {
                    submitted && viewingResults && (
                        <QuizResults
                            questions={questions}
                            answers={answers}
                            handleTryAgain={handleTryAgain}
                        />
                    )
                }
                {
                    submitted && !viewingResults && (
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
        </Layout>
    );
}
