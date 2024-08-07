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