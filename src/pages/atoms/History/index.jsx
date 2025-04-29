import { useEffect, useState } from "react";
import { HistoryList } from "../../../components/atoms";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Next } from "../../../assets";

export default function History() {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${params.uid}`)
        .then(result => {
            setProducts(result.data.data.bought);
        })
        .catch(err => {
            console.log(err);
        })
    })
    
    if(products.length !== 0) {
        return (
            <div className="w-full h-auto bg-slate-100">
                <div className="w-3/5 h-auto p-2 m-auto bg-white">
                    <img src={Next} className="w-5 h-5 rotate-180" onClick={() => {
                        navigate(-1);
                    }} />
                </div>
                <div className="w-3/5 h-screen m-auto overflow-y-scroll bg-white">
                {products.map((product, i) => {
                    return <HistoryList key={i} PId={product.product_id} img={product.image} PName={product.product_name} amount={product.amount} price={product.price} date={product.date} />
                })
                }
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-auto bg-slate-100">
                <div className="w-3/5 h-auto p-2 m-auto bg-white">
                    <img src={Next} className="w-5 h-5 rotate-180" onClick={() => {
                        navigate(-1);
                    }} />
                </div>
                <div className="flex flex-wrap items-center justify-center w-3/5 h-auto min-h-screen m-auto bg-white">
                    <p className="text-2xl font-bold">You haven&#39;t bought any product</p>
                </div>
            </div>
        )
    }
}
