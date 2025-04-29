import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { Card, Gap, NavList } from "../../../components";
import { Next } from "../../../assets";

export default function SearchResult() {
    const params = useParams();
    const input = params.input;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const perPage = 10;

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/product/seaname/${input}?page=${currentPage}&perPage=${perPage}`)
        .then(result => {
            setTotalItems(result.data.total_items);
            setProducts(result.data.data);
        })
        .catch(err => {
            console.log(err);
        })
        
        axios.get(`https://val-shops.vercel.app/v1/product/seatag/${input}?page=${currentPage}&perPage=${perPage}`)
        .then(result => {
            setTotalItems(result.data.total_items);
            setProducts(result.data.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [params, input, currentPage])

    if(products.length !== 0) {
        return (
            <div className="w-full h-auto bg-slate-100">
                <div className="flex flex-wrap items-center w-4/5 h-auto gap-3 m-auto bg-white justify-evenly">
                    <div className="flex justify-between w-full h-auto my-5 mt-2 gap-x-3 px-7">
                        <NavList list={'Cosmetic'} path={'cosmetic'} />
                        <NavList list={'Decor'} path={'decor'} />
                        <NavList list={'Drink'} path={'drink'} />
                        <NavList list={'Food'} path={'food'} />
                        <NavList list={'Furniture'} path={'furniture'} />
                        <NavList list={'Health'} path={'health'} />
                        <NavList list={'Electronic'} path={'electronic'} />
                        <NavList list={'Fashion'} path={'fashion'} />
                        <NavList list={'Sport'} path={'sport'} />
                        <NavList list={'All'} path={''} />
                    </div>
                    {products.map(product => {
                        return <Card key={product._id} stock={product.stock} name={product.name} price={product.price} img={product.image} pid={product._id} />
                    })}
                    <Gap height={'20px'} width={'100%'} />
                    <div className="flex justify-center w-full gap-x-5">
                        <img src={Next} className="w-8 h-8 rotate-180 cursor-pointer" onClick={currentPage !== 1 ? () => setCurrentPage(currentPage - 1) : () => setCurrentPage(currentPage)} />
                        <p className="text-2xl">{currentPage}</p>
                        <img src={Next} className="w-8 h-8 cursor-pointer" onClick={currentPage !== Math.ceil(totalItems / perPage) ? () => setCurrentPage(currentPage + 1) : () => setCurrentPage(currentPage)}  />
                    </div>
                    <Gap height={'20px'} width={'100%'} />
                </div>
            </div>
        )
    } else {
        return (
            <div className="w-full h-auto bg-slate-300">
                <div className="flex flex-wrap w-4/5 items-start h-auto min-h-[90vh] m-auto bg-white">
                    <div className="flex justify-between w-full h-20 mt-2 gap-x-3 px-7">
                        <NavList list={'Cosmetic'} path={'cosmetic'} />
                        <NavList list={'Decor'} path={'decor'} />
                        <NavList list={'Drink'} path={'drink'} />
                        <NavList list={'Food'} path={'food'} />
                        <NavList list={'Furniture'} path={'furniture'} />
                        <NavList list={'Health'} path={'health'} />
                        <NavList list={'Electronic'} path={'electronic'} />
                        <NavList list={'Fashion'} path={'fashion'} />
                        <NavList list={'Sport'} path={'sport'} />
                        <NavList list={'All'} path={''} />
                    </div> 
                    <div className="flex items-center justify-center w-full ">
                        <p className="text-2xl font-bold">There is no result for {`"${input}"`}</p>
                    </div>
                </div>
            </div>
        )
    } 
}
