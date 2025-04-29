import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../atoms";
import { useEffect, useState } from "react";
import axios from "axios";
import AddCart from "../AddCart";

export default function Card({ img, name, price, pid, stock }) {
    const navigate = useNavigate();
    const params = useParams();
    const uid = params.uid;
    const [isAddCart, setIsAddCart] = useState(false);
    const [amount, setAmount] = useState(0);
    const [isSeller, setIsSeller] = useState(null);
    const [added, setAdded] = useState(false);
    
    function addCart() {
        if(amount !== 0) {
            const data1 = new FormData();
            data1.append('uid', uid);
            data1.append('pid', pid);
            data1.append('pname', name);
            data1.append('price', price);
            data1.append('image', typeof img === "string" ? img : img[0]);
            data1.append('amount', amount);
    
            axios.post(`https://val-shops.vercel.app/v1/auth/addcart`, data1, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(result => {
                navigate(`/${params.uid}/cart`);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${pid}`)
        .then(result => {
            if(result.data.data.seller.seller_id === uid) {
                setIsSeller(true);
            } else {
                setIsSeller(false);
            }
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${uid}`)
        .then(result => {
            result.data.data.cart.forEach(cart => {
                if(cart.product_id === pid) {
                    console.log('hello')
                    setAdded(true);
                }
            })
        })
        .catch(err => {
            console.log(err);
        })
    }, [pid, uid])

    if(isSeller !== null) {
        return (
            <>
            {isAddCart &&
                <AddCart amount={amount} handleAmount={setAmount} price={price} stock={stock} handleIsCart={setIsAddCart} handleAddCart={addCart} title={'Set the amount and add the product to your cart!'} />
            }
            {!isSeller &&
                <div className="flex flex-wrap rounded-md shadow-2xl bg-cyan-50 w-52 h-72">
                    <div className="w-full h-3/5">
                        {typeof img !== "string" && 
                            <img src={`https://val-shops.vercel.app/${img[0]}`} className="w-full h-full rounded-t-md" />
                        }
                        {typeof img === "string" &&
                            <img src={`https://val-shops.vercel.app/${img}`} className="w-full h-full rounded-t-md" />
                        }
                    </div>
                    <div className="w-full p-2 h-1/5">
                        <p className="text-lg font-bold">{name}</p>
                        <p className="text-sm">Rp{price}</p>
                    </div>  
                    <div className="flex items-end w-full gap-2 p-2 h-1/5">
                        <Button buttonName={'Details'} type={'button'} addSize={added ? 'w-full h-8' : 'w-1/2 h-8'} onClick={() => navigate(`/${params.uid}/${pid}/detail`)} />
                        {!added && 
                            <Button buttonName={'Add to cart'} type={'button'} addSize={'w-1/2 h-8'} onClick={() => {
                                setIsAddCart(true);
                            }} />
                        }
                    </div>
                </div>
            }
            {isSeller &&
                <div className="flex flex-wrap rounded-md shadow-2xl bg-cyan-50 w-52 h-72">
                    <div className="w-full h-3/5">
                        <img src={`https://val-shops.vercel.app/${img[0]}`} className="w-full h-full rounded-t-md" />
                    </div>
                    <div className="w-full p-2 h-1/5">
                        <p className="text-lg font-bold">{name}</p>
                        <p className="text-sm">Rp{price}</p>
                    </div>  
                    <div className="flex items-end w-full gap-2 p-2 h-1/5">
                        <Button buttonName={'Details'} type={'button'} addSize={'w-full h-8'} onClick={() => navigate(`/${params.uid}/${pid}/detail`)} />
                    </div>
                </div>
            }
            </>
        )
    }
}
