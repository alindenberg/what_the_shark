import { useState, useEffect } from "react";

interface QuestionCardProps {
    index: number;
    question: string;
    options: { id: number; text: string }[];
    handleChange: (optionId: number) => void;
}

export default function QuestionCard({ index, question, options, handleChange }: QuestionCardProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {
        setSelectedOption(null);
    }, [question]);

    const handleOptionChange = (optionId: number) => {
        setSelectedOption(optionId);
    };

    const handleConfirm = () => {
        if (selectedOption !== null) {
            handleChange(selectedOption);
        }
    };

    return (
        <div className="p-4 mb-6 shadow-lg rounded-lg">
            <p className="text-lg font-medium mb-2">#{index + 1}) {question}</p>
            {options.map((option) => (
                <label key={option.id} className="mb-2 flex items-center ml-2">
                    <input
                        type="radio"
                        name={question}
                        value={option.id}
                        checked={selectedOption === option.id}
                        onChange={() => handleOptionChange(option.id)}
                        className="form-radio mr-2"
                    />
                    <span className="font-semibold">{option.text}</span>
                </label>
            ))}
            <div className="flex justify-end">
                <button
                    onClick={handleConfirm}
                    className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 ${selectedOption === null ? 'opacity-50' : 'hover:bg-blue-700'}`}
                    disabled={selectedOption === null}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}