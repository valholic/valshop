import { useParams } from "react-router-dom";
import { Next, Star, YellowStar } from "../../../assets";
import { useEffect, useState } from "react";
import { ReviewForm } from "../../molecules";
import ConfirmAlert from "../ConfirmAlert";
import axios from "axios";

export default function Comment({name, image, comment, rating, uid, PId}) {
    const params = useParams();
    const [isUserCommment, setIsUserComment] = useState(false);
    const [isClick, setIsClick] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isDelete, setIsDelete] = useState(false);

    function deleteReview() {
        axios.delete(`https://val-shops.vercel.app/v1/product/delerev/${params.uid}/${PId}`)
        .then(result => {
            setIsDelete(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        if(uid === params.uid) {
            setIsUserComment(true);
        }
    }, [params, uid])

    return (
        <>
            {isEdit && 
                <ReviewForm PId={PId} handleIsAddReview={setIsEdit} isEdit={true} oldComment={comment} oldRating={rating} />
            }
            {isDelete && 
                <ConfirmAlert title={'Do you want to delete your review?'} handleYes={deleteReview} handleNo={setIsDelete} />
            }
            <div className="h-auto p-2 rounded-md max-w-[60%] w-fit my-2 bg-white shadow-lg ">
                {!isUserCommment && 
                    <p className="w-full text-lg font-bold">{name}</p>
                }
                {isUserCommment && 
                    <>
                        <div className="flex items-center justify-between w-full h-auto">
                            <p className="text-lg font-bold">{name}</p>
                            <img src={Next} className="w-5 h-5 rotate-90 cursor-pointer" onClick={() => {
                                if(!isClick) {
                                    setIsClick(true);
                                } else {
                                    setIsClick(false);
                                }
                            }} />
                        </div>
                        {isClick &&
                            <div className="relative w-full">
                                <div className="absolute z-30 h-auto right-2 w-fit bg-slate-200">
                                    <div className="w-full h-8 px-2 py-1 cursor-pointer hover:bg-slate-300" onClick={() => {
                                        setIsEdit(true);
                                    }}>
                                        <p className="text-base">Edit</p>
                                    </div>
                                    <div className="w-full h-8 px-2 py-1 cursor-pointer hover:bg-slate-300" onClick={() => {
                                        setIsDelete(true);
                                    }}>
                                        <p className="text-base">Delete</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }
                <div className="flex w-full gap-x-1">
                    <img src={rating < 1 ? Star : YellowStar} className="w-3 h-3" />
                    <img src={rating < 2 ? Star : YellowStar} className="w-3 h-3" />
                    <img src={rating < 3 ? Star : YellowStar} className="w-3 h-3" />
                    <img src={rating < 4 ? Star : YellowStar} className="w-3 h-3" />
                    <img src={rating < 5 ? Star : YellowStar} className="w-3 h-3" />
                </div>
                <img src={`https://val-shops.vercel.app/${image}`} className="w-40 h-40 my-2 border border-black rounded-md" />
                <p className="w-full h-auto text-base break-words text-start">{comment}</p>
            </div>
        </>
    )
}
