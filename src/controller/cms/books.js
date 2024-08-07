import { fetchAPI } from "./main";

export async function getAllBooks() {
    const data = await fetchAPI(
        `
        query allBooks {
            posts(where: {categoryName: "book"}) {
                edges {
                    node {
                        postId
                        slug
                        title
                        excerpt
                        content
                        book {
                            author
                            name
                        }
                        featuredImage {
                            node {
                                altText
                                sourceUrl
                            }
                        }
                    }
                }
            }
        }
    `
    )
    return data?.posts.edges;
}

export async function getBookBySlug(slug) {
    const data = await fetchAPI(
        `
        {
            post(id: "/book/${slug}", idType: SLUG) {
                postId
                title
                content
                slug
                book {
                    author
                    name
                }
                featuredImage {
                    node {
                        altText
                        sourceUrl
                    }
                }
            }
        }
        `
    )

    return data?.post;
}

export async function getAllSlugs(category) {
    const data = await fetchAPI(
        `
        {
            posts(where: {categoryName: "${category}"}, first: 300) {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `
    )
    return data?.posts
}