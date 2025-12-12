import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from 'axios';
import { ThreeDot } from 'react-loading-indicators'
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function Login() {
    const navigate = useNavigate()
    const admin = Cookies.get("adminName");
    if (admin) {
        navigate("/", { replace: true });
    }

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isPasswordShow, setIsPasswordShow] = useState(false)

    const loginHandler = async (e) => {
        e.preventDefault()

        if (!username.trim() || !password.trim()) {
            Swal.fire({
                title: "ورود",
                text: "لطفا تمامی مقادیر را وارد کنید",
                icon: "warning",
                confirmButtonText: "باشه",
            })
            return
        }
        try {
            setLoading(true)
            const res = await axios.post("https://api.iranifarsh.ir/login", { username, password },
                {
                    withCredentials: true
                }
            )

            if (res.data.success) {
                setLoading(false)
                setUsername('')
                setPassword('')
                Swal.fire({
                    title: "ورود",
                    text: "شما با موفقیت وارد شدید",
                    icon: "success",
                    confirmButtonText: "باشه",
                })
                navigate("/", { replace: true });
            }
        } catch (err) {
            console.log("AXIOS ERROR: ", err.response?.status, err);

            if (err.response?.status === 400) {
                setLoading(false)
                Swal.fire({
                    title: "ورود",
                    text: "نام کاربری یا رمز عبور نامعتبر می باشد",
                    icon: "error",
                    confirmButtonText: "باشه",
                })
            }
        }
    }

    return (
        <form onSubmit={loginHandler} className='bg-neutral-100 h-screen flex justify-center items-center'>
            <div className='bg-white lg:w-[30%] sm:w-[90%] h-[50%] border-2 border-neutral-600 rounded-[20px] shadow shadow-purple-600 flex flex-col justify-around items-center'>
                <h1 className='text-3xl font-bold select-none'>ورود</h1>
                <div className='flex flex-col gap-y-3 w-[80%] ' dir='ltr'>
                    <input type="text" value={username} className='h-[45px] p-3 border border-neutral-500 rounded-[10px] outline-0 focus:outline focus:outline-purple-600' onChange={e => setUsername(e.target.value)} placeholder='نام کاربری' />
                    <div className=' relative'>
                        <input type={isPasswordShow ? "text" : "password"} value={password} className='h-[45px] w-full p-3 border border-neutral-500 rounded-[10px] outline-0 focus:outline focus:outline-purple-600' onChange={e => setPassword(e.target.value)} placeholder='رمز عبور' />
                        <div onClick={() => setIsPasswordShow(prev => !prev)} className=' absolute right-3 top-3 cursor-pointer transition-all duration-150 active:scale-95 text-xl text-neutral-600'>
                            {isPasswordShow ? <FaEye  /> : <FaEyeSlash  />}
                        </div>
                    </div>
                </div>
                <button type='submit' disabled={loading} className='bg-purple-500 hover:bg-purple-600 text-white w-[140px] h-[40px] rounded-[10px] cursor-pointer disabled:bg-purple-400 select-none'>
                    {loading ? <ThreeDot color="#ffffff" size="small" text="" textColor="" /> : "ورود"}
                </button>
            </div>
        </form>
    )
}
