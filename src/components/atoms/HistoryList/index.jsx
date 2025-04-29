import { data, useNavigate, useParams } from "react-router-dom";
import Button from "../Button";
import { CommentArea, ReviewForm } from "../../molecules";
import { useEffect, useState } from "react";
import axios from "axios";

export default function HistoryList({ PName, amount, price, date, PId, img }) {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [isAddReview, setIsAddReview] = useState(false);
    const [isSeeReview, setIsSeeReview] = useState(false);
    const [commentAdded, setCommentAdded] = useState(false);
    
    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${PId}`)
        .then(result => {
            setProduct(result.data.data);
            result.data.data.review.forEach(rev => {
                if(rev.by.uid === params.uid) {
                    setCommentAdded(true);
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
    })

    return (
        <>
            {isAddReview &&
                <ReviewForm PId={PId} handleIsAddReview={setIsAddReview} />
            }
            {isSeeReview &&
                <CommentArea product={product} handleIsComment={setIsSeeReview} />
            }
            <div className="flex items-center w-full h-16 px-2 py-1 gap-x-2 hover:bg-slate-200">
                <img src={`https://val-shops.vercel.app/${img}`} className="w-10 h-10 rounded-full" />
                <div className="w-2/5 h-auto mx-2">
                    <p className="w-full text-lg font-bold cursor-pointer h-3/5" onClick={() => {
                        navigate(`/${params.uid}/${PId}/detail`);
                    }}>{PName}</p>
                    <p className="w-full text-sm h-2/5">Rp{amount * price} for {amount} pcs</p>
                </div>
                {!commentAdded && 
                    <Button buttonName={'Add review'} type={'button'} addSize={'w-1/5 h-8'} onClick={() => {
                        setIsAddReview(true);
                    }} />
                }
                {commentAdded &&
                    <Button buttonName={'See review'} type={'button'} addSize={'w-1/5 h-8'} onClick={() => {
                        setIsSeeReview(true);
                    }} />
                }
                <div className="w-2/5 h-full leading-[64px] text-end">
                    <p>Bought at {date}</p>
                </div>
            </div>
        </>
    )
}
