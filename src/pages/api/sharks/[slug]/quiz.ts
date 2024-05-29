// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await fetch(`http://127.0.0.1:8000/sharks/${req.query.slug}/quiz/`)
        .then(response => response.json())
        .then(data => res.status(200).json(data))
        .catch(err => { console.error("error getting quiz ", err); res.status(400).json({ name: 'error' }) });
}
