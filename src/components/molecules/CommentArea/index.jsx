import { Next } from "../../../assets";
import { Comment } from "../../atoms";

export default function CommentArea({product, handleIsComment}) {
    return (
        <>
        <div className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-600 opacity-20">
        </div>
        <div className="fixed z-50 w-1/2 h-auto p-2 overflow-y-scroll rounded-md top-2 bottom-2 bg-cyan-100 left-1/4 right-1/4">
            <div className="flex items-center w-full h-10 border-b border-b-black">
                <img src={Next} className="w-5 h-5 rotate-180 cursor-pointer" onClick={() => {
                    handleIsComment(false);
                }} />
                <p className="flex-1 text-lg font-bold text-center">Review about this product</p>
            </div>
            <div className="w-full h-auto px-2">
                {product.review.map(rev => {
                    return <Comment key={rev.by.uid} uid={rev.by.uid} PId={product._id} name={rev.by.username} image={rev.image} rating={rev.rating} comment={rev.comment}  />
                })
                }
            </div>
        </div>
        </>
    )
}
