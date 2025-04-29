import { useEffect, useState } from "react";
import { History, Shop, ValShop } from "../../../assets";
import { Button, InputImage, NavListHam } from "../../../components";
import { data, useParams } from "react-router-dom";
import axios from "axios";

export default function Profile() {
    const params = useParams();
    const uid = params.uid;
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [imageShow, setImageShow] = useState('');
    const [isAddProfile, setIsAddProfile] = useState(false);

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${uid}`)
        .then(result => {
            if(result.data.data.profile_picture) {
                setImageShow(result.data.data.profile_picture);
                setName(result.data.data.name);
            } else {
                return;
            }
        })
        .catch(err => {
            console.log(err);
        })
    }, [uid])

    function handleSubmitImage(e) {
        e.preventDefault();
        const data2 = new FormData();
        data2.append('profile_picture', image);

        axios.patch(`https://val-shops.vercel.app/v1/auth/addpp/${uid}`, data2, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            setImageShow(result.data.data.profile_picture);
            setIsAddProfile(false);
        })
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="w-full h-auto bg-slate-100">
            {isAddProfile &&
                <>
                    <div className="fixed top-0 bottom-0 z-30 flex items-center justify-center w-screen h-screen bg-white opacity-50">
                    </div>
                    <div className="fixed z-50 w-1/2 p-2 rounded-md bg-slate-200 left-1/4 right-1/4 h-[180px]">
                        <p className="mb-5 text-xl font-bold">Add your profile picture!</p>
                        <form onSubmit={handleSubmitImage} className="flex flex-wrap w-full gap-y-4">
                            <InputImage name={'profile-picture'} label={'Attach here!'} onChange={(e) => {
                                setImage(e.target.files[0]);
                            }} />
                            <div className="flex w-full gap-x-2">
                                <Button type={'button'} buttonName={'Cancel'} addSize={'w-1/6 h-8'} onClick={() => {
                                    setIsAddProfile(false);
                                }} />
                                <Button type={'submit'} buttonName={'Save profiles'} addSize={'w-1/6 h-8'} />
                            </div>
                        </form>
                    </div>
                </>
            }
            <div className="w-3/5 h-screen m-auto bg-white">
                <div className="w-full p-5 h-2/5 bg-cyan-200">
                    <img src={ValShop} className="w-4/5 m-auto h-4/5" />
                </div>
                <div className="w-40 h-40 m-auto -mt-20 rounded-full bg-slate-100">
                    {imageShow !== '' &&
                        <img src={`https://val-shops.vercel.app/${imageShow}`} className="w-40 h-40 rounded-full" />
                    }

                    {imageShow === '' &&
                        <p className="text-sm text-center leading-[160px] cursor-pointer" onClick={() => {
                            setIsAddProfile(true);
                        }}>Add your profile</p>
                    }
                </div>
                <p className="w-full h-10 p-2 text-2xl font-bold text-center">{name}</p>
                <div className="w-full h-auto">
                    <NavListHam img={Shop} path={'your-product'} name={'My Shop'} />
                    <NavListHam img={History} path={'history'} name={'History'} />
                </div>
            </div>
        </div>
    )
}
