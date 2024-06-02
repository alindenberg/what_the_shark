import Question from '@/types/Question';

interface QuizResultProps {
    questions: Question[];
    answers: { [questionId: number]: number };
    handleTryAgain: () => void;
}

export default function Results({ questions, answers, handleTryAgain }: QuizResultProps) {
    const isIncorrectAnswer = (question: Question, option: { id: number; text: string }) => {
        return question.answer !== option.id && answers[question.id] === option.id;;
    }

    const isCorrectAnswer = (question: Question, option: { id: number; text: string }) => {
        return question.answer === option.id;
    }

    return (
        <div className="flex flex-col">
            {questions.map((question) => (
                <div key={question.id} className="p-4 mb-6 shadow-lg rounded-lg">
                    <p className="text-lg font-medium mb-2">{question.text}</p>
                    {question.options.map((option) => (
                        <label key={option.id} className="mb-2 flex items-center ml-2">
                            <input
                                type="radio"
                                name={question.text}
                                value={option.id}
                                checked={answers[question.id] === option.id}
                                className="form-radio mr-2"
                                disabled
                            />
                            <span className={`font-semibold ${isIncorrectAnswer(question, option) ? 'text-red-500' : isCorrectAnswer(question, option) ? 'text-green-500' : ''}`}>{option.text}</span>
                        </label>
                    ))}
                </div>
            ))}
            <button
                type="button"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                onClick={handleTryAgain}
            >
                Try Again
            </button>
        </div>
    );
}