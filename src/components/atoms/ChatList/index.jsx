import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export default function ChatList({lastConversation, product_id, username_id, speaker_id, conversation_id, handleIsFromCustomer, handleSId, handleGetChat}) {
    const navigate = useNavigate();
    const [iName, setIName] = useState('');
    const [profile, setProfile] = useState('');
    const interlocutors_id = speaker_id.filter(id => {
        return id !== username_id;
    });

    useEffect(() => {
        axios.get(`https://val-shops.vercel.app/v1/auth/fabid/${interlocutors_id}`)
        .then(result => {
            setIName(result.data.data.name);
            setProfile(result.data.data.profile_picture);
        })
        .catch(err => {
            console.log(err);
        })
    }, [interlocutors_id])

    return (
        <div className="flex items-center w-full h-auto px-2 py-1 cursor-pointer gap-x-2 hover:bg-slate-200" onClick={() => {
                navigate(`/${username_id}/${product_id}/chat/${iName}`);
                handleIsFromCustomer(false);
                handleSId(interlocutors_id);
                handleGetChat(conversation_id);
            }}>
            <img src={`https://val-shops.vercel.app/${profile}`} className="w-10 h-10 rounded-full" />
            <div className="w-4/5 h-auto">
                <p className="w-full text-lg font-bold h-3/5">{iName}</p>
                <p className="w-full text-sm h-2/5">{lastConversation.msg}</p>
            </div>
        </div>
    )
}
