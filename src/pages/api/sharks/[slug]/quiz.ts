import Question from "@/types/Question";
import { fetchQuiz } from "@/services/quizService";

import type { NextApiRequest, NextApiResponse } from "next";

type Response = {
    error: string;
    quiz: Question[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Response>,
) {
    await fetchQuiz(req.query.slug as string)
        .then(data => res.status(200).json({ quiz: data, error: "" }))
        .catch((err) => {
            res.status(400).json({ quiz: [], error: err.message })
        });
}
