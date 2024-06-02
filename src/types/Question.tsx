export default interface Question {
    id: number;
    text: string;
    options: { id: number; text: string }[];
    answer: number;  // option id
};