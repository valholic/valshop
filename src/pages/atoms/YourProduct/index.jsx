import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Card, Gap } from "../../../components";
import { Next } from "../../../assets";

export default function YourProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const uid = params.uid;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const perPage = 10;

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/product/getmine/${uid}?page=${currentPage}&perPage=${perPage}`)
        .then(result => {
            setTotalItems(result.data.total_items);
            setProducts(result.data.data);
        })
        .catch(err => {
            console.log(err);
        })

    }, [uid, currentPage])


    if(products.length !== 0) {
            return (
                <div className="w-full h-auto bg-slate-100">
                    <div className="w-4/5 h-auto p-2 m-auto bg-white">
                        <img src={Next} className="w-5 h-5 rotate-180" onClick={() => {
                            navigate(-1);
                        }} />
                    </div>
                    <div className="flex flex-wrap items-center w-4/5 h-auto min-h-screen gap-3 m-auto bg-white justify-evenly">
                        {products.map(product => {
                            return <Card key={product._id} name={product.name} price={product.price} img={product.image} pid={product._id} />
                        })}
                        <Gap height={'20px'} width={'100%'} />
                        <div className="flex justify-center w-full gap-x-5">
                            <img src={Next} className="w-8 h-8 rotate-180 cursor-pointer" onClick={currentPage !== 1 ? () => setCurrentPage(currentPage - 1) : () => setCurrentPage(currentPage)} />
                            <p className="text-2xl">{currentPage}</p>
                            <img src={Next} className="w-8 h-8 cursor-pointer" onClick={currentPage !== Math.ceil(totalItems / perPage) ? () => setCurrentPage(currentPage + 1) : () => setCurrentPage(currentPage)}  />
                        </div>
                        <Gap height={'20px'} width={'100%'} />
                    </div>
                    <p className="fixed w-44 cursor-pointer hover:border-[2px] hover:border-black h-10 rounded-2xl text-center leading-[40px] bg-cyan-100 right-2 bottom-5" onClick={() => {
                        navigate(`/${uid}/sell-product`)
                    }}>
                        Add new product ➕
                    </p>
                </div>
            )
    } else {
        return (
            <div className="w-full h-auto bg-slate-100">
                <div className="w-4/5 h-auto p-2 m-auto bg-white">
                        <img src={Next} className="w-5 h-5 rotate-180" onClick={() => {
                            navigate(-1);
                        }} />
                </div>
                <div className="flex flex-wrap items-center justify-center w-4/5 h-auto min-h-screen m-auto bg-white">
                    <div>
                        <p className="text-4xl font-bold text-center">You don&#39;t have product to sell</p>
                        <p className="text-base font-thin text-center">Start your shop by adding product and sell it!</p>
                    </div>
                    <p className="fixed w-44 cursor-pointer hover:border-[2px] hover:border-black h-10 rounded-2xl text-center leading-[40px] bg-cyan-100 right-2 bottom-5" onClick={() => {
                        navigate(`/${uid}/sell-product`)
                    }}>
                        Add new product ➕
                    </p>
                </div>
            </div>
        )
    }
}
