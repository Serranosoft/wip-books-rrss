// pages/api/webhook.js

import { supabase } from "@/layout/layout";


export default async function handler(req, res) {
  if (req.method === 'POST') {
    return res.status(200).json({ data });
    // const { title, author, description, otherFields } = req.body;

    // Inserta el nuevo libro en la base de datos de Supabase
    // const { data, error } = await supabase.from('books').insert([{ title, author, description, otherFields }]);

    // if (error) {
    //   return res.status(500).json({ error: error.message });
    // }

    // return res.status(200).json({ data });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
