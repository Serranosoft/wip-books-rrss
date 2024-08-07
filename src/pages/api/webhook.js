import { supabase } from "@/layout/layout";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body);

        const { error } = await supabase.from("books").insert({ id: req.body.post_id });

        if (!error) return res.status(200);
        return res.status(500).json({ error: error.message });;       
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
