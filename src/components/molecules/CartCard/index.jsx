import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { ConfirmAlert, Button } from "../../atoms";
import Payment from "../Payment";

export default function CardCart({price, amount, name, img, pid, cosId, cosName}) {
    const params = useParams();
    const [isCancel, setIsCancel] = useState(false);
    const [isPay, setIsPay] = useState(false);

    function deleteFromCart() {
        axios.delete(`https://val-shops.vercel.app/v1/auth/delitem/${params.uid}/${pid}`)
        .then(result => {
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${pid}`)
        .then(result => {
            if(result.data.data === null) {
                axios.delete(`https://val-shops.vercel.app/v1/auth/delitem/${params.uid}/${pid}`)
                .then(result => {
                })
            }
        })
        .catch(err => {
            console.log(err);
        })

    }, [pid, params, amount, cosId, cosName])

    function checkOut() {
        const data2 = new FormData();
        data2.append('uid', params.uid);
        data2.append('pid', pid);
        data2.append('pname', name);
        data2.append('price', price);
        data2.append('image', img);
        data2.append('amount', amount);

        axios.post(`https://val-shops.vercel.app/v1/auth/cheout`, data2, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            deleteFromCart();
        })
        .catch(err => {
            console.log(err);
        })

        axios.patch(`https://val-shops.vercel.app/v1/product/stock/${pid}/${amount}`)
        .then(result => {
            
        })
        .catch(err => {
            console.log(err);
        })

        const data3 = new FormData();
        data3.append('pid', pid);
        data3.append('customer_name', cosName);
        data3.append('customer_id', cosId);
        data3.append('amount', amount);

        axios.post(`https://val-shops.vercel.app/v1/product/addprocus`, data3, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {

        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <>
        {isCancel && 
            <ConfirmAlert handleYes={deleteFromCart} title={'Are you sure want to delete this product from your cart?'} handleNo={setIsCancel} />
        }
        {isPay &&
            <Payment handleIsPayment={setIsPay} price={amount * price} handlePayment={checkOut} />
        }
        <div className="flex flex-wrap rounded-md shadow-2xl bg-cyan-50 w-52 h-72">
            <div className="w-full h-3/5">
                <img src={`https://val-shops.vercel.app/${img}`} className="w-full h-full rounded-t-md" />
            </div>
            <div className="w-full p-2 h-1/5">
                <p className="text-lg font-bold">{name}</p>
                <div className="flex justify-between">
                    <p className="text-sm">Rp{price * amount}</p>
                    <p className="text-sm">{amount} pcs</p>
                </div>
            </div>  
            <div className="flex items-end w-full gap-2 p-2 h-1/5">
                <Button buttonName={'Cancel'} type={'button'} addSize={'w-1/2 h-8'} onClick={() => {
                    setIsCancel(true);
                }} />
                <Button buttonName={'Check-out'} type={'button'} addSize={'w-1/2 h-8'} onClick={() => {
                    setIsPay(true);
                }} />
            </div>
        </div>
        </>
    )
}
