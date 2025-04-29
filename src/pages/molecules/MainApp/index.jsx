import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { Footer, HamburgerList, Header } from "../../../components";
import ListRoute from "../ListRoute";
import { Cart, Chat, DetailProduct, EditProduct, Favorite, History, Profile, SearchResult, SellProduct, YourProduct } from "../../atoms";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainApp() {
    const [isBurger, setIsBurger] = useState(false);
    const params = useParams();
    const uid = params.uid;
    const navigate = useNavigate();

    useEffect(() => {
        if(!uid) {
            navigate(`/auth`);
        } else {
            axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${uid}`)
            .then(result => {
                
            })
            .catch(err => {
                navigate(`/not-found`);
                console.log(err);
            })
        }
    }, [uid, navigate])

    return (
        <div className="w-full h-full">
            <Header handleBurger={setIsBurger} />
            <HamburgerList handleBurger={setIsBurger} burger={isBurger} />
            <Routes>
                <Route path="/*" Component={ListRoute} />
                <Route path="/cart" Component={Cart} />
                <Route path="/favorite" Component={Favorite} />
                <Route path="/profile" Component={Profile} />
                <Route path="/:pid?/chat/:iname?" Component={Chat} />
                <Route path="/your-product" Component={YourProduct} />
                <Route path="/sell-product" Component={SellProduct} />
                <Route path="/:pid?/edit-product" Component={EditProduct} />
                <Route path="/history" Component={History} />
                <Route path="/:pid?/detail" Component={DetailProduct} />
                <Route path="/search/:input" Component={SearchResult} />
            </Routes>
            <Footer />
        </div>
    )
}