import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Button, InputImage, InputTPEN, Textarea } from "../../atoms";
import { Star, YellowStar } from "../../../assets";

export default function ReviewForm({ PId, handleIsAddReview, isEdit, oldComment, oldRating }) {
    const params = useParams();
    const uid = params.uid;
    const [userName, setUserName] = useState('');
    const [image, setImage] = useState();
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    
    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${uid}`)
        .then(result => {
            setUserName(result.data.data.name);
        })
        .catch(err => {
            console.log(err);
        })

        if(isEdit) {
            setComment(oldComment);
            setRating(oldRating);
        }

    }, [params, isEdit, oldComment, oldRating, uid])

    function onSubmit(e) {
        e.preventDefault();
        if(!isEdit) {
            const data2 = new FormData();
            data2.append('username', userName);
            data2.append('uid', uid);
            data2.append('review_image', image);
            data2.append('rating', rating);
            data2.append('comment', comment);

            axios.patch(`https://val-shops.vercel.app/v1/product/addrev/${PId}`, data2, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(result => {
                handleIsAddReview(false);
            })
            .catch(err => {
                console.log(err);
            })
        } else if(isEdit) {
            const data3 = new FormData();
            data3.append('uid', uid);
            data3.append('review_image', image);
            data3.append('rating', rating);
            data3.append('comment', comment);

            axios.patch(`https://val-shops.vercel.app/v1/product/edirev/${PId}`, data3, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(result => {
                handleIsAddReview(false);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <div className="w-full">
            <div className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-600 opacity-20">
            </div>
            <div className="fixed z-50 w-1/2 p-2 rounded-md bg-cyan-100 top-1/4 h-84 left-1/4 right-1/4">
                <p className="mb-3 text-2xl font-bold">Give your testimony about the product!</p>
                <form onSubmit={onSubmit} className="w-full">
                    <InputImage label={'Post the product you received!'} name={'review-image'} onChange={(e) => {
                        setImage(e.target.files[0]);
                    }} />
                    <InputTPEN type={'number'} name={'rating'} addSize={'hidden'} value={rating} />
                    <p className="mt-2 text-base">Rate the product!</p>
                    <div className="flex mb-2 gap-x-1">
                        <img src={rating < 1 ? Star : YellowStar} className="w-5 h-5" onClick={() => {
                            setRating(1);
                        }} />
                        <img src={rating < 2 ? Star : YellowStar} className="w-5 h-5" onClick={() => {
                            setRating(2);
                        }} />
                        <img src={rating < 3 ? Star : YellowStar} className="w-5 h-5" onClick={() => {
                            setRating(3);
                        }} />
                        <img src={rating < 4 ? Star : YellowStar} className="w-5 h-5" onClick={() => {
                            setRating(4);
                        }} />
                        <img src={rating < 5 ? Star : YellowStar} className="w-5 h-5" onClick={() => {
                            setRating(5);
                        }} />
                    </div>
                    <Textarea handleChange={setComment} value={comment} placeholder={'Type your comment here...'} name={'comment'} label={'Add your comment!(optional)'} addSize={'w-full'} />
                    <div className="flex mt-2 gap-x-2">
                        <Button buttonName={'Cancel'} type={'button'} addSize={'w-1/5 h-8'} onClick={() => {
                            handleIsAddReview(false);
                        }} />
                        <Button buttonName={'Submit'} type={'submit'} addSize={'w-1/5 h-8'} />
                    </div>
                </form>
            </div>
        </div>
    )
}
