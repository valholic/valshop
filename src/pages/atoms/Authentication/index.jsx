import { useEffect, useState } from "react"
import { Button, Gap, InputTPEN, Link } from "../../../components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Authentication() {
    const navigate = useNavigate();
    const [active, setActive] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    
    function Toggle() {
        if(!active) {
            setActive(true);
            Reset();
            return;
        } else {
            setActive(false);
            Reset();
            return;
        }
    }

    function Reset() {
        setName('');
        setEmail('');
        setPassword('');
    }

    function onRegister(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('password', password);

        axios.post(`https://val-shops.vercel.app/v1/auth/add`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
        .then(result => {
            setActive(false);
            Reset();
            
        })
        .catch(err => {
            console.log(err);
        })
    }

    function onLogin(e) {
        e.preventDefault();
        axios.get(`https://val-shops.vercel.app/v1/auth/geteandpw/${email}/${password}`)
        .then(result => {
            navigate(`/${result.data.data[0]._id}/home`);
        })
        .catch(err => {
            setError(true);
            console.log(err);
        })
    }
    
    return (
        <>
            <div className="flex items-center justify-center w-screen h-screen bg-slate-300">
                <div className="box-border relative flex w-4/5 rounded-lg shadow-2xl bg-slate-200 h-4/5">
                    <div className={`relative flex z-0 items-center justify-center w-1/2 h-full transition-all duration-500 rounded-lg  bg-slate-200 ${active ? 'opacity-100' : 'opacity-0'}`}>
                        <form className="w-full" onSubmit={onRegister}>
                            <fieldset className="flex flex-wrap items-center justify-center gap-y-3">
                                <legend className="mb-4 text-2xl font-bold text-center">Sign In</legend>
                                <InputTPEN type={'text'} required={true} name={'name-register'} label={'Full name'} placeholder={'Your name'} handleChange={setName} value={name} />
                                <InputTPEN type={'email'} required={true} name={'email-register'} label={'Email'} placeholder={'Your email'} handleChange={setEmail} value={email} />
                                <InputTPEN type={'password'} required={true} name={'password-register'} label={'Password'} placeholder={'Your password'} handleChange={setPassword} value={password} />
                            </fieldset>
                            <div className="flex flex-wrap items-center justify-center mt-4 gap-y-8">
                                <Button type={'submit'} buttonName={'Submit'} />
                            </div>
                        </form>
                    </div>
                    <div className={`absolute z-50 w-1/2 h-full transition-all ease-in-out duration-[600ms] bg-cyan-300 rounded-lg flex justify-center items-center ${active ? 'translate-x-full' : ''}`}>
                        {!active && 
                        <div>
                            <p className="text-5xl font-bold text-center text-white max-md:text-2xl">
                                Welcome back!
                            </p>
                            <p className="mt-8 text-xl text-center text-white max-md:text-sm">
                                Please log in to continue.
                            </p>
                            <Gap height={'32px'} />
                            <Link addClass={'text-white max-md:text-sm'} linkName={"Don't have account? Sign in here!"} onClick={() => {
                                Toggle();
                            }} />
                        </div>
                        }
                        {active &&
                        <div>
                            <p className="text-5xl font-bold text-center text-white max-md:text-2xl">
                                Hello there!
                            </p>
                            <p className="mt-8 text-xl text-center text-white max-md:text-sm">
                                Please sign in to continue.
                            </p>
                            <Gap height={'32px'} />
                            <Link addClass={'text-white max-md:text-sm'} linkName={"Already have an account? Log in here!"} onClick={() => {
                                Toggle();
                            }} />
                        </div>
                        }
                    </div>
                    <div className={`relative z-0 items-center justify-center w-1/2 h-full rounded-lg transition-all duration-500 bg-slate-200 flex  ${active ? 'opacity-0' : 'opacity-100'} flex-wrap`}>
                        <form className="w-full" onSubmit={onLogin}>
                            <fieldset className="flex flex-wrap items-center justify-center gap-y-3">
                                <legend className="mb-4 text-2xl font-bold text-center">Log In</legend>
                                {error && 
                                    <div className="w-3/5 h-10 bg-red-300 border border-red-400 rounded-md">
                                        <p className="p-2 m-auto text-base text-center">Account not found</p>
                                    </div>
                                }
                                <InputTPEN required={true} type={'email'} name={'email-login'} label={'Email'} placeholder={'Your email'} handleChange={setEmail} value={email} />
                                <InputTPEN required={true} type={'password'} name={'password-login'} label={'Password'} placeholder={'Your password'} handleChange={setPassword} value={password} />
                            </fieldset>
                            <div className="flex flex-wrap items-center justify-center mt-4 gap-y-8">
                                <Button type={'submit'} buttonName={'Submit'} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
