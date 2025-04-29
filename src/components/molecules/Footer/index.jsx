import { Dana, Doku, Facebook, Gopay, Instagram, LinkAja, LinkedIn, Ovo, PayPal, Tiktok } from "../../../assets";

export default function Footer() {
    return (
        <div className="w-full">
        <div className="flex w-full h-32 px-5 bg-cyan-300">
            <div className="w-2/5 h-full">
                <p className="mt-3 h-2/5">Payment Method</p>
                <div className="flex items-center gap-5 h-2/5">
                    <div className="w-[50px] h-[50px]"><img src={Dana} alt="Dana" /></div>
                    <div className="w-[50px] h-[50px]"><img src={Gopay} alt="Gopay" /></div>
                    <div className="w-[50px] h-[50px]"><img src={Ovo} alt="Ovo" /></div>
                    <div className="w-[50px] h-[50px]"><img src={PayPal} alt="Paypal" /></div>
                    <div className="w-[40px] h-[40px]"><img src={LinkAja} alt="LinkAja" /></div>
                    <div className="w-[50px] h-[50px]"><img src={Doku} alt="Doku" /></div>
                </div>
            </div>
            <div className="w-1/5 h-full">
                <p className="mt-3 h-2/5">Follow us!</p>
                <div className="flex flex-wrap w-full h-12">
                    <div className="flex items-center w-1/2 h-4 gap-1">
                        <img src={Instagram} className="h-full" />
                        <a href="#" className="text-sm">Valshop_id</a>
                    </div>
                    <div className="flex items-center w-1/2 h-4 gap-1">
                        <img src={Facebook} className="h-full" />
                        <a href="#" className="text-sm">Valshop_id</a>
                    </div>
                    <div className="flex items-center w-1/2 h-4 gap-1">
                        <img src={LinkedIn} className="h-full" />
                        <a href="#" className="text-sm">Valshop_id</a>
                    </div>
                    <div className="flex items-center w-1/2 h-4 gap-1">
                        <img src={Tiktok} className="h-full" />
                        <a href="#" className="text-sm">Valshop_id</a>
                    </div>
                </div>
            </div>
            <div className="flex justify-end flex-1 mt-3">
                <ul>
                    <li>
                        <a href="">Terms of Use</a>
                    </li>
                    <li>
                        <a href="">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="">Licensing</a>
                    </li>
                    <li>
                        <a href="" >Contact</a>
                    </li>
                </ul>
            </div>
        </div>
        <div className="w-full h-6 text-center bg-cyan-400">
            Copyright 2024
        </div>
        </div>
    )
}
