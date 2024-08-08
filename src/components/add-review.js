import { addReview } from "@/controller/database/reviews";

export default function AddReviewElement() {

    const content = "asdasd asdasd asdasd lqwoeq wqeqw e";
    const rating = 4.1;
    const bookId = 1255;
    const userId = "5b0b65f5-c20e-4664-a1b0-6874bf9039bc"

    return (
        <div>
            <textarea style={{ width: 250, height: 250, background: "lightgray" }}></textarea>
            <button onClick={() => addReview({ content, rating, bookId, userId })}>añadir review</button>
        </div>
    )
}