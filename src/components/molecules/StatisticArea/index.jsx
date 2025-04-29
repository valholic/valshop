import { useEffect, useState } from "react";
import { Next } from "../../../assets";
import axios from "axios";
import { CustomerList } from "../../atoms";

export default function StatisticArea({ handleIsStat, pid }) {
    const [soldAmount, setSoldAmount] = useState(0);
    const [customerList, setCustomerList] = useState([]);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${pid}`)
        .then(result => {
            setCustomerList(result.data.data.customer);
        })
        .catch(err => {
            console.log(err);
        })

        if(customerList.length !== 0 && !isDone) {
            const boughtAmount = customerList.map(cus => {
                return parseInt(cus.boughtAmount);
            })

            setSoldAmount(boughtAmount.reduce((a, b) => {
                return a + b
            }, 0));
            setIsDone(true);
        }
    }, [customerList, pid, soldAmount, isDone])

    return (
        <>
        <div className="fixed top-0 bottom-0 left-0 right-0 z-30 bg-slate-600 opacity-20">
        </div>
        <div className="fixed z-50 w-1/2 h-auto p-2 overflow-y-scroll bg-white rounded-md top-2 bottom-2 left-1/4 right-1/4">
            <div className="flex items-center w-full h-10 border-b border-b-black">
                <img src={Next} className="w-5 h-5 rotate-180 cursor-pointer" onClick={() => {
                    handleIsStat(false);
                }} />
                <p className="flex-1 text-lg font-bold text-center">Statistic</p>
            </div>
            <div className="w-full h-auto p-2">
                <p className="text-2xl font-bold">Sold product:</p>
                <p className="text-xl font-bold">{soldAmount}</p>
                <p className="mt-5 text-2xl font-bold">Customer List:</p>
                <div className="flex flex-wrap overflow-hidden rounded-md">
                    <div className="flex w-full h-10 p-2 bg-slate-100">
                        <p className="w-1/3 font-bold">Customer&#39;s name</p>
                        <p className="w-1/3 font-bold">Amount</p>
                        <p className="w-1/3 font-bold">Time</p>
                    </div>
                    {customerList.length !== 0 &&
                        customerList.map((cus, i) => {
                            return <CustomerList key={i} name={cus.customer_name} date={cus.date} boughtAmount={cus.boughtAmount} />
                        })
                    }
                </div>
            </div>
        </div>
        </>
    )
}
