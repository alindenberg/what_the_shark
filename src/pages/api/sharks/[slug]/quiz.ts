// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    console.log("sharks url ", process.env.SHARKS_URL)
    await fetch(`${process.env.SHARKS_URL}/sharks/${req.query.slug}/quiz/`)
        .then(response => response.json())
        .then(data => res.status(200).json(data))
        .catch(() => res.status(400).json({ name: 'error' }));
}
