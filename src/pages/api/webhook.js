// pages/api/webhook.js

import { supabase } from "@/layout/layout";


export default async function handler(req, res) {
    const { body } = req;
    return res.send(`Parsed request body: ${body} / ${body.name}`);
}
