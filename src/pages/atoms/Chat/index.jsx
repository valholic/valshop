import { useParams } from "react-router-dom"
import { Button, ChatBox, ChatList, Textarea } from "../../../components";
import { useRef, useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Send } from "../../../assets";

export default function Chat() {
    const params = useParams();
    const uid = params.uid;
    const pid = params.pid;
    const iname = params.iname;
    const latest = useRef(null);
    const [iId, setIId] = useState(''); 
    const [cId, setCId] = useState('');
    const [message, setMessage] = useState('');
    const [conversation, setConversation] = useState([]);
    const [chatList, setChatList] = useState([]);
    const [isFromCustomer, setIsFromCustomer] = useState(true);
    const [PName, setPName] = useState('');

    // Abbrievation
    // uid stands for username_id
    // pid stands for product_id
    // cid stands for conversation_id
    // iid stands for interlocutors_id
    // iname stands for interlocutor_name
    // Conversation only contain one conversation between tow speakers

    useEffect(() => {
        // this feature for chat from costumer
        if(pid !== undefined && iId === ''){
            axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${pid}`)
            .then(result => {
                setIId(result.data.data.seller.seller_id);
                setPName(result.data.data.name);
            })
            .catch(err => {
                console.log(err)
            })
        }

        // Data6 is for find all the chat that appearing in user chat list
        axios.get(`https://val-shops.vercel.app/v1/chat/fincha/${uid}`)
        .then(result => {
            setChatList(result.data.data);
        })
        .catch(err => {
            console.log(err);
        })

        // Data5 is to find the chat even when the send chat button not clicked, this feature just available for the exist conversation data
        if(pid !== undefined && iId !== '') {
            if(iId === uid) {
                axios.get(`https://val-shops.vercel.app/v1/product/getbyid/${pid}`)
                .then(result => {
                    setIId(result.data.data.seller.seller_id);
                    setPName(result.data.data.name);
                })
                .catch(err => {
                    console.log(err)
                })
            }
        }

    }, [pid, iId, uid, conversation])
    
    function onSend(e) {
        e.preventDefault();
        // When the customer chat first from the product
        // Data2 is for check if there is the conversation created or not,
        if(uid !== iId && isFromCustomer) {
            axios.get(`https://val-shops.vercel.app/v1/chat/fincon/${cId}`)
            .then(result => {
                if(result.data.data.length !== 0 && iId !== uid) {
                    const data4 = new FormData();
                    data4.append('msg', message);
                    data4.append('uid', uid);
    
                    axios.patch(`https://val-shops.vercel.app/v1/chat/docon/${cId}`, data4, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(result => {
                        setConversation(result.data.data.conversation);
                        setMessage('');
                        setCId(result.data.data._id);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
            .catch(err => {
                // if not we create it
                if(iId !== uid) {
                    const data3 = new FormData();
                    data3.append('speaker_id', uid);
                    data3.append('speaker_id', iId);
                    data3.append('product_id', pid);
                    data3.append('username_id', uid);
                    data3.append('msg', message);
                    
                    axios.post(`https://val-shops.vercel.app/v1/chat/addcon`, data3, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                    .then(result => {
                        setConversation(result.data.data.conversation);
                        setMessage('');
                        setCId(result.data.data._id);
                    })
                    .catch(err => {
                        console.log(err);
                    })
                }
            })
        }

        if(uid !== iId && !isFromCustomer) {
            const data7 = new FormData();
            data7.append('msg', message);
            data7.append('uid', uid);

            axios.patch(`https://val-shops.vercel.app/v1/chat/docon/${cId}`, data7, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(result => {
                setConversation(result.data.data.conversation);
                setMessage('');
                setCId(result.data.data._id);
            })
            .catch(err => {
                console.log(err);
            })
        }
    }

    function getChatById(cid) {
        axios.get(`https://val-shops.vercel.app/v1/chat/fincon/${cid}`)
        .then(result => {
        // If the conversation found
        if(result.data.data.length !== 0 && iId !== uid) {
            setConversation(result.data.data.conversation);
            setCId(result.data.data._id);
        } else {
            return;
        }})
        .catch(err => {
            console.log(err);
        })
    }

    return (
        <div className="flex w-full h-screen bg-slate-100">
            <div className="w-2/5 overflow-y-scroll">
                <div className="h-auto min-h-screen bg-white">
                    {chatList.length !== 0 &&
                        chatList.map(chat => {
                            return <ChatList key={chat._id} lastConversation={chat.conversation[chat.conversation.length - 1]} name={'Customer'} handleIsFromCustomer={setIsFromCustomer} handleSId={setIId} speaker_id={chat.speaker_id} username_id={uid} product_id={chat.product_id} conversation_id={chat._id} handleGetChat={getChatById} />
                        })
                    }
                </div>
            </div>
            <div className="flex flex-wrap w-3/5 h-screen">
                {(conversation.length !== 0 || iId !== '') &&
                <>
                    <div className="relative w-full h-[10%] bg-slate-200">
                        <p className="text-xl font-bold leading-8 text-center">{iname}</p>
                        <p className="text-sm text-center">Buying {PName}</p>
                    </div>
                    <div className="relative flex flex-wrap w-full py-4 bg-white h-[90%]">
                        <div className="w-full px-2 mb-8 overflow-y-scroll h-[90%]" ref={latest}>
                            {conversation.length !== 0 &&
                                conversation.map((con, i) => {
                                    if (con) {
                                        return <ChatBox msg={con.msg} key={i} last={i === (conversation.length - 1) ? true : false} speaker_id={con.uid} time={con.time} />
                                    }
                                })
                            }
                        </div>
                        <form className="absolute bottom-0 flex justify-center w-full my-2 h-[10%] gap-x-2" onSubmit={onSend}>
                            <Textarea name={'message'} placeholder={'Message...'} handleChange={setMessage} value={message} addSize={'w-4/5 mx-0'} addInputSize={'h-9 bg-slate-200'} />
                            <Button buttonName={<img src={Send} className="w-5 h-5 scale-150" />} addColor={'bg-white'} type={'submit'} addSize={'w-fit px-2'} />
                        </form>
                    </div>
                </>
                }
                {((conversation.length === 0 && iId === undefined) || iId === uid) &&
                    <div className="flex items-center justify-center w-full">
                        <p className="text-3xl font-bold text-center">Start to chat</p>
                    </div>
                }
            </div>
        </div>
    )
}