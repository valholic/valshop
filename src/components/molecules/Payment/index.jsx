import { useState } from "react";
import { Dana, Doku, Gopay, LinkAja, Ovo, PayPal } from "../../../assets";
import { Button } from "../../atoms";

export default function Payment({price, handleIsPayment, handlePayment}) {
    const [isChose, setIsChose] = useState('');

    return (
        <>
            <div className="fixed top-0 bottom-0 left-0 right-0 z-30 opacity-20 bg-slate-600">
            </div>
            <div className="fixed z-50 w-1/2 p-2 rounded-md top-1/4 h-52 bg-slate-100 left-1/4 right-1/4">
                <p className="text-lg font-bold">Total price:</p>
                <p className="text-base">Rp{price}</p>
                <p className="text-lg font-bold">Choose your payment method:</p>
                <div className="flex mt-2 gap-x-2">
                    <div className={`w-[50px] h-[50px] hover:border-[2px] hover:border-black rounded-md ${isChose === 'Dana' ? 'border-[2px] border-red-300' : ''}`} onClick={() => {
                        setIsChose('Dana');
                    }}><img src={Dana} alt="Dana" /></div>
                    <div className={`w-[50px] h-[50px] hover:border-[2px] hover:border-black rounded-md ${isChose === 'Gopay' ? 'border-[2px] border-red-300' : ''}`} onClick={() => {
                        setIsChose('Gopay');
                    }}><img src={Gopay} alt="Gopay" /></div>
                    <div className={`w-[50px] h-[50px] hover:border-[2px] hover:border-black rounded-md ${isChose === 'Ovo' ? 'border-[2px] border-red-300' : ''}`} onClick={() => {
                        setIsChose('Ovo');
                    }}><img src={Ovo} alt="Ovo" /></div>
                    <div className={`w-[50px] h-[50px] hover:border-[2px] hover:border-black rounded-md ${isChose === 'Paypal' ? 'border-[2px] border-red-300' : ''}`} onClick={() => {
                        setIsChose('Paypal');
                    }}><img src={PayPal} alt="Paypal" /></div>
                    <div className={`w-[40px] h-[40px] hover:border-[2px] hover:border-black rounded-md ${isChose === 'LinkAja' ? 'border-[2px] border-red-300' : ''}`} onClick={() => {
                        setIsChose('LinkAja');
                    }}><img src={LinkAja} alt="LinkAja" /></div>
                    <div className={`w-[50px] h-[50px] hover:border-[2px] hover:border-black rounded-md ${isChose === 'Doku' ? 'border-[2px] border-red-300' : ''}`} onClick={() => {
                        setIsChose('Doku');
                    }}><img src={Doku} alt="Doku" /></div>
                </div>
                <div className="flex mt-5 gap-x-2">
                    <Button buttonName={'Cancel'} type={'button'} addSize={'w-1/5 h-8'} onClick={() => {
                        handleIsPayment(false)
                    }} />
                    <Button buttonName={'Pay'} type={'button'} addSize={'w-1/5 h-8'} onClick={handlePayment} />
                </div>
            </div>
        </>
    )
}
