import { Cart, Chat, Cross, Favorite, Home, LogOut, Profile } from "../../../assets";
import { useNavigate } from "react-router-dom";
import { ConfirmAlert, NavListHam } from "../../atoms";
import { useState } from "react";


export default function HamburgerList({ burger, handleBurger }) {
    const navigate = useNavigate();
    const [isLogOut, setIsLogOut] = useState(false);

    return (
        <>
            {isLogOut &&
                <ConfirmAlert handleYes={() => {
                    navigate(`/auth`);
                }} handleNo={setIsLogOut} title={'Are you sure want to log out from this account?'} />
            }
            <div className={`fixed h-full z-20 right-0 top-0 w-80 bg-cyan-400 transition-all duration-700  ${burger ? '-translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end w-full h-10">
                    <img src={Cross} className="w-10 h-10" onClick={() => {
                        handleBurger(false);
                    }} />
                </div>
                <div className="w-full h-full bg-cyan-50">
                    <NavListHam img={Home} path={'home'} name={'Home'} handleBurger={handleBurger} />
                    <NavListHam img={Chat} path={'chat'} name={'Chat'} handleBurger={handleBurger} />
                    <NavListHam img={Cart} path={'cart'} name={'Cart'} handleBurger={handleBurger} />
                    <NavListHam img={Favorite} path={'favorite'} name={'Favorite'} handleBurger={handleBurger} />
                    <NavListHam img={Profile} path={'profile'} name={'Profile'} handleBurger={handleBurger} />
                    <div className="flex flex-wrap items-center w-full h-8 gap-3 px-5 my-5 cursor-pointer hover:bg-cyan-100">
                        <img src={LogOut} className="h-4" />
                        <p className="text-lg" onClick={() => {
                            setIsLogOut(true);
                        }}>Log Out</p>
                    </div>
                </div>
            </div>
        </>
    )
}
