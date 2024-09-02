import { supabase } from "@/utils/supabase";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body);

        const regex = /https?:\/\/[^\/]+(\/libro\/[^\/]+\/)/;
        const match = req.body.post_permalink.match(regex);
        const slug = match[1];

        const { error } = await supabase.from("books").insert({ id: req.body.post_id, name: req.body.post.post_title, slug: slug });
        console.log(error);
        if (!error) return res.status(200);
        return res.status(500).json({ error: error.message });;       
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
