import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export default function ChatBox({msg, speaker_id, last, time }) {
    const params = useParams();
    const [name, setName] = useState('');
    const [isUserSide, setIsUserSide] = useState(true);

    useEffect(() => {
        if(speaker_id) {
            axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${speaker_id}`)
            .then(result => {
                setName(result.data.data.name);
            })
            .catch(err => {
                console.log(err);
            })
        }

        if(params.uid === speaker_id) {
            setIsUserSide(true);
        } else if(params.uid !== speaker_id) {
            setIsUserSide(false);
        }

    }, [params, speaker_id, last, time])

    if(name !== '' && msg !== '') {
        return (
            <div className={`w-full h-auto flex ${isUserSide ? 'justify-end' : 'justify-start'}`}>
                {isUserSide && <p className="flex self-end text-[10px] my-[5px] mx-2">{time}</p>}
                <div className={`px-2 py-1 max-w-[60%] h-auto my-2 rounded-md bg-slate-100`}>
                    <p className={`text-sm text-blue-300 ${isUserSide ? 'text-blue-300 text-end' : 'text-yellow-300 text-start'}`}>{name}</p>
                    <p className="h-auto break-words text-md text-start">{msg}</p>
                </div>
                {!isUserSide && <p className="flex self-end text-[10px] my-[5px] mx-2">{time}</p>}
            </div>
        )
    }
}
