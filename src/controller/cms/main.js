const API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL

export async function fetchAPI(query = {}) {
    const headers = { 'Content-Type': 'application/json' }
    const res = await fetch(API_URL, { method: 'POST', headers, body: JSON.stringify({ query }) });

    const json = await res.json()
    if (json.errors) {
        throw new Error('Failed to fetch API')
    }

    return json.data
}