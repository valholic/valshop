import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { CardCart } from "../../../components";

export default function Cart() {
    const params = useParams();
    const uid = params.uid;
    const [cart, setCart] = useState([]);
    const [cosName, setCosName] = useState('');
    const [cosId, setCosId] = useState('');

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${uid}`)
        .then(result => {
            setCart(result.data.data.cart);
            setCosId(result.data.data._id);
            setCosName(result.data.data.name);
        })
        .catch(err => {
            console.log(err);
        })

    }, [uid, cart])

    return (
        <div className="w-full h-auto min-h-screen bg-slate-100">
            <div className="w-4/5 m-auto text-3xl font-bold text-center bg-slate-200">Your Cart</div>
            {cart.length !== 0 &&
                <div className="flex flex-wrap items-center w-4/5 h-auto min-h-screen gap-3 py-5 m-auto bg-white justify-evenly">
                    {cart.map(product => {
                        if(product) {
                            return <CardCart key={product.product_id} img={product.image} pid={product.product_id} amount={product.amount} name={product.product_name} price={product.price} cosName={cosName} cosId={cosId} />
                        }
                    })}
                </div>
            }
            {cart.length === 0 &&
                <div className="flex flex-wrap items-center w-4/5 h-auto min-h-screen gap-3 m-auto bg-white justify-evenly">
                    <p className="text-2xl font-bold">You haven&#39;t added anything to your cart</p>
                </div>
            }
        </div>
    )
}
