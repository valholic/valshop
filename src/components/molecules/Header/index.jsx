import { useState } from "react";
import { HamburgerMenu, ValShop } from "../../../assets";
import { InputTPEN } from "../../atoms";
import Button from "../../atoms/Button";
import { useNavigate, useParams } from "react-router-dom";

export default function Header({ handleBurger }) {
    const navigate = useNavigate();
    const params = useParams();
    const [input, setInput] = useState('');

    function onSearch(e) {
        e.preventDefault();
        if(input !== '') {
            navigate(`/${params.uid}/search/${input}`);
            setInput('');
        }
    }

    return (
        <div className="flex w-full h-24 px-10 bg-cyan-300">
            <div className="flex items-center w-32 h-24 mr-60">
                <img src={ValShop} className="h-24 ml-8" alt="ValShop" />
            </div>
            <form className="flex items-center min-w-[300px] w-[600px] h-full" onSubmit={onSearch}>
                <InputTPEN type={'text'} required={true} placeholder={'Search'} handleChange={setInput} value={input} addSize={'min-w-[250px] w-[500px]'} />
                <Button type={'submit'} buttonName={'Enter'} addSize={'h-8 min-w-[40px] w-[80px]'} />
            </form>
            <div className="flex items-center justify-end flex-1 cursor-pointer">
                <img src={HamburgerMenu} onClick={() => {
                        handleBurger(true);
                    }} />
            </div>
        </div>
    )
}
