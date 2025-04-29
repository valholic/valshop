import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { data, useNavigate, useParams } from "react-router-dom"
import { CommentIcon, Edit, Favorite, Favorited, Next, Star, Statistic, Trash, YellowStar } from "../../../assets";
import { AddCart, Button, Comment, CommentArea, ConfirmAlert, StatisticArea } from "../../../components";

export default function DetailProduct() {
    const params = useParams();
    const navigate = useNavigate();
    const pid = params.pid;
    const uid = params.uid;
    const [product, setProduct] = useState({});
    const [index, setIndex] = useState(0);
    const [amount, setAmount] = useState(0);
    const [isSeller, setIsSeller] = useState(false);
    const [rating, setRating] = useState(0);
    const [isAddCart, setIsAddCart] = useState(false);
    const [cart, setCart] = useState([]);
    const [added, setAdded] = useState(false);
    const [isCommentArea, setIsCommentArea] = useState(false);
    const [isFav, setIsFav] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isStat, setIsStat] = useState(false);

    function addCart() {
        if(amount !== 0) {
            const data1 = new FormData();
            data1.append('uid', uid);
            data1.append('pid', pid);
            data1.append('pname', product.name);
            data1.append('price', product.price);
            data1.append('image', product.image[0]);
            data1.append('amount', amount);
            
            axios.post(`https://val-shops.vercel.app/v1/auth/addcart`, data1, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(result => {
                navigate(`/${uid}/cart`);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    function handleFavorites() {
        if(!isFav) {
            const data5 = new FormData();
            data5.append('product_id', pid);
            data5.append('product_name', product.name);
            data5.append('price', product.price);
            data5.append('image', product.image[0]);
            data5.append('stock', product.stock);
            
            axios.patch(`https://val-shops.vercel.app/v1/auth/addfav/${uid}`, data5, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(result => {
                setIsFav(true);
            })
            .catch(err => {
                console.log(err);
            })
        } else if(isFav) {
            axios.delete(`https://val-shops.vercel.app/v1/auth/delfav/${uid}/${pid}`)
            .then(result => {
                setIsFav(false);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    function changeAmount() {
        const data4 = new FormData();
        data4.append('pid', pid);
        data4.append('pname', product.name);
        data4.append('price', product.price);
        data4.append('image', product.image[0]);
        data4.append('amount', amount);

        axios.patch(`https://val-shops.vercel.app/v1/auth/chamon/${uid}`, data4, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            navigate(`/${uid}/cart`);
        })
        .catch(err => {
            console.log(err);
        })
    }

    function deleteProduct() {
        axios.delete(`https://val-shops.vercel.app/v1/product/delepro/${pid}`)
        .then(result => {
            navigate(-1);
        })  
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${pid}`)
        .then(result => {
            setProduct(result.data.data);
            const ratingArray = result.data.data.review.map(rev => {
                return parseInt(rev.rating);
            })

            const productRating = ratingArray.reduce((a, b, i) => {
                if(i === (ratingArray.length - 1)) {
                    return (a + b)/2;
                } else {
                    return a + b;
                }
            }, 0)

            setRating(productRating);
            
            if(params.uid === result.data.data.seller.seller_id) {
                setIsSeller(true);
            }
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${uid}`)
        .then(result => {
            setCart(result.data.data.cart);
            result.data.data.favorites.forEach(product => {
                if(product.product_id === pid) {
                    setIsFav(true);
                }
            })
        })
        .catch(err => {
            console.log(err);
        })

        cart.forEach(product => {
            if(product.product_id === pid) {
                setAdded(true);
            }
        })
    }, [pid, params, uid, cart, rating])

    if(product.image) {
        return (
            <div className="w-full h-auto bg-slate-100">
                <div className="flex flex-wrap w-4/5 h-auto m-auto bg-cyan-50">
                    {isAddCart && !added &&
                        <AddCart amount={amount} handleAmount={setAmount} stock={product.stock} price={product.price} handleIsCart={setIsAddCart} handleAddCart={addCart} title={'Set the amount and add the product to your cart!'} />
                    }
                    {isAddCart && added && 
                        <AddCart amount={amount} handleAmount={setAmount} stock={product.stock} price={product.price} handleIsCart={setIsAddCart} handleAddCart={changeAmount} title={'Change the amount!'} />
                    }
                    {isCommentArea && 
                        <CommentArea product={product} handleIsComment={setIsCommentArea} />
                    }
                    {isDelete &&
                        <ConfirmAlert handleNo={setIsDelete} handleYes={deleteProduct} title={'Are you sure want to delete this product from your shop?'} />
                    }
                    {isStat &&
                        <StatisticArea handleIsStat={setIsStat} pid={pid} />
                    }
                    <div className="flex w-full p-2 mt-5 border-b border-b-black">
                        <img src={Next} className="w-8 h-8 rotate-180" onClick={() => {
                            navigate(-1);
                        }} />
                        <div className="flex justify-end flex-1 gap-x-2">
                            {!isFav && !isSeller && 
                                <img src={Favorite} className="w-8 h-8 cursor-pointer" onClick={handleFavorites} />
                            }
                            {isFav && !isSeller &&
                                <img src={Favorited} className="w-8 h-8 cursor-pointer" onClick={handleFavorites} />
                            }
                            <img src={CommentIcon} className="cursor-pointer w-9 h-9" onClick={() => {
                                setIsCommentArea(true);
                            }} />
                            {isSeller &&
                                <>
                                    <img src={Statistic} className="w-8 h-8 cursor-pointer" onClick={() => {
                                        setIsStat(true);
                                    }} />
                                    <img src={Edit} className="w-8 h-8 scale-90 cursor-pointer" onClick={() => {
                                        navigate(`/${uid}/${pid}/edit-product`);
                                    }} />
                                    <img src={Trash} className="w-8 h-8 cursor-pointer" onClick={() => {
                                        setIsDelete(true);
                                    }} />
                                </>
                            }
                        </div>
                    </div>
                    <div className="flex w-full h-auto">
                        <div className="flex flex-wrap justify-center w-2/5 mt-5">
                            <div className="flex items-center justify-center w-full h-fit">
                                <img src={Next} className="w-5 h-5 mx-2 -rotate-180 cursor-pointer" onClick={index <= 0 ? () => setIndex(0) : () => setIndex(index - 1)} />
                                <div className="w-4/5">
                                    <img src={`https://val-shops.vercel.app/${product.image[index]}`} className="shadow-lg" />
                                </div>
                                <img src={Next} className="w-5 h-5 mx-2 cursor-pointer" onClick={index >= (product.image.length - 1) ? () => setIndex(product.image.length - 1) : () => setIndex(index + 1)} />
                            </div>
                            <div className="flex justify-center w-full h-6 py-1 gap-x-2">
                                {product.image.map((dot, i) => {
                                    if(index === i) {
                                        return <div className="w-3 h-3 bg-black rounded-full" key={dot}></div>
                                    } else {
                                        return <div className="w-3 h-3 border border-black rounded-full" key={dot}></div>
                                    }
                                })}
                            </div>
                            {!isSeller && 
                                <div className="flex flex-wrap items-center justify-center w-full h-auto my-5 gap-y-3">
                                    {!added && product.stock !== 0 && 
                                        <Button buttonName={'Add to cart!'} type={'button'} onClick={() => {
                                            setIsAddCart(true);
                                        }} />
                                    }
                                    {added &&
                                        <>
                                            <p className="px-10 text-base text-justify">This product has been added to your cart. You still can change the amount of the products you want to buy and chat the the seller.</p>
                                            <Button buttonName={'Change amount'} type={'button'} onClick={() => {
                                                setIsAddCart(true);
                                            }} />
                                        </>
                                    }
                                    <Button buttonName={'Chat the seller!'} type={'button'} onClick={() => navigate(`/${uid}/${pid}/chat/${product.seller.seller_name}`)} />
                                </div>
                            }
                        </div>
                        <div className="w-3/5 h-auto p-5 bg-white rounded-md">
                            <p className="my-2 text-2xl font-bold text-center">{product.name}</p>
                            <p className="my-2 text-xl font-bold">Product&#39;s Description</p>
                            <p>{product.description}</p>
                            <p className="my-2 text-xl font-bold">Price per Product</p>
                            <p>Rp{product.price}</p>
                            <p className="my-2 text-xl font-bold">Available Stock</p>
                            <p>{product.stock !== 0 ? `${product.stock} pcs` : "Out of stock"}</p>
                            <p className="my-2 text-xl font-bold">Product rating</p>
                            <div className="flex gap-x-1">
                                <img src={rating < 1 ? Star : YellowStar} className="w-5 h-5" />
                                <img src={rating < 2 ? Star : YellowStar} className="w-5 h-5" />
                                <img src={rating < 3 ? Star : YellowStar} className="w-5 h-5" />
                                <img src={rating < 4 ? Star : YellowStar} className="w-5 h-5" />
                                <img src={rating < 5 ? Star : YellowStar} className="w-5 h-5" />
                            </div>
                            <p className="mt-4 font-bold text-md">Seller information</p>
                            <p>{product.seller.seller_name}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
