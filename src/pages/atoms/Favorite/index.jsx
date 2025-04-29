import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../../components";

export default function Favorite() {
    const params = useParams();
    const uid = params.uid;
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${uid}`)
        .then(result => {
            setFavorites(result.data.data.favorites);
        })
        .catch(err => {
            console.log(err);
        })

    }, [uid, favorites])

    return (
        <div className="w-full h-auto min-h-screen bg-slate-100">
            <div className="w-4/5 m-auto text-3xl font-bold text-center bg-slate-200">Your Favorite</div>
            {favorites.length !== 0 &&
                <div className="flex flex-wrap items-center w-4/5 h-auto min-h-screen gap-3 py-5 m-auto bg-white justify-evenly">
                    {favorites.map(product => {
                        if(product) {
                            return <Card key={product.product_id} stock={product.stock} img={product.image} pid={product.product_id} name={product.product_name} price={product.price} />
                        }
                    })}
                </div>
            }
            {favorites.length === 0 &&
                <div className="flex flex-wrap items-center w-4/5 h-auto min-h-screen gap-3 m-auto bg-white justify-evenly">
                    <p className="text-2xl font-bold">You haven&#39;t added anything to your favorite</p>
                </div>
            }
        </div>
    )
}
