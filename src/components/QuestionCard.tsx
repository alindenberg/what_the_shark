import { useState, useEffect } from "react";

interface QuestionCardProps {
    index: number;
    question: string;
    options: { id: number; text: string }[];
    selection: number | null;
    handleSelection: (optionId: number) => void;
}

export default function QuestionCard({ index, question, options, selection, handleSelection }: QuestionCardProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    useEffect(() => {
        setSelectedOption(selection);
    }, [question]);

    const handleOptionChange = (optionId: number) => {
        setSelectedOption(optionId);
        handleSelection(optionId);
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
        </div>
    );
}