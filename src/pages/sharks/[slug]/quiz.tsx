import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Question = {
    id: string;
    text: string;
    options: { id: number; text: string }[];
    answer: number;
};

export default function QuizPage() {
    const router = useRouter();
    const { slug } = router.query;
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<{ [key: string]: number }>({});
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState<boolean>(false);

    useEffect(() => {
        if (slug) {
            fetch(`/api/sharks/${slug}/quiz`)
                .then((response) => response.json())
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

    const handleChange = (questionId: string, optionId: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
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
        } else {
            setError("Please answer all questions before submitting.");
        }
    };

    const isIncorrectAnswer = (question: Question, option: { id: number; text: string }) => {
        return submitted && question.answer !== option.id && answers[question.id] === option.id;;
    }

    const isCorrectAnswer = (question: Question, option: { id: number; text: string }) => {
        return submitted && question.answer === option.id;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleSubmit}>
                {questions.map((question) => (
                    <div key={question.id} className="mb-6">
                        <p className="text-lg font-medium mb-2">{question.text}</p>
                        {question.options.map((option) => (
                            <div key={option.id} className="mb-2">
                                <label >
                                    < input
                                        type="radio"
                                        name={question.id}
                                        value={option.id}
                                        checked={answers[question.id] === option.id}
                                        onChange={() => handleChange(question.id, option.id)}
                                        className="form-radio"
                                        disabled={submitted}
                                    />
                                    <span className={`ml-2 ${isCorrectAnswer(question, option) ? 'text-green-500' : isIncorrectAnswer(question, option) ? 'text-red-500' : ''}`}>{option.text}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                ))
                }
                <button
                    type="submit"
                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${Object.keys(answers).length !== questions.length ? 'opacity-50 hover:bg-blue-500' : 'hover:bg-blue-700'}`}
                    disabled={Object.keys(answers).length !== questions.length || submitted}
                >
                    Submit
                </button>
            </form >
        </div >
    );
}
