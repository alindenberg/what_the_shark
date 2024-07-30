// services/quizService.ts
import Question from '@/types/Question';

export const fetchQuiz = async (slug: string): Promise<Question[]> => {
    if (!slug) {
        return Promise.reject(new Error('No slug provided'));
    }

    try {
        const response = await fetch(`/api/sharks/${slug}/quiz`);
        if (!response.ok) {
            throw new Error('Failed to load quiz');
        }
        const data = await response.json();
        return data.quiz;
    } catch (error) {
        throw new Error('Failed to load quiz');
    }
};