import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const loginHandler = async (e) => {
        e.preventDefault()

        if (!username.trim() || !password.trim) {
            Swal.fire({
                title: "ورود",
                text: "لطفا تمامی مقادیر را وارد کنید",
                icon: "warning",
                confirmButtonText: "باشه",
            })
            return
        }

        const res = await fetch("https://backend.sajlab.ir/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })

        const data = await res.json()

        console.log(data);
        

        if (data.statusCode === 400) {
            Swal.fire({
                title: "ورود",
                text: "نام کاربری یا رمز عبور نامعتبر می باشد",
                icon: "error",
                confirmButtonText: "باشه",
            })
        } else {
            setUsername('')
            setPassword('')
            Swal.fire({
                title: "ورود",
                text: "شما با موفقیت وارد شدید",
                icon: "success",
                confirmButtonText: "باشه",
            })
        }
    }

    return (
        <form onSubmit={loginHandler} className='bg-neutral-100 h-screen flex justify-center items-center'>
            <div className='bg-white w-[30%] h-[50%] border-2 border-neutral-600 rounded-[20px] shadow shadow-purple-600 flex flex-col justify-around items-center'>
                <h1 className='text-3xl font-bold'>ورود</h1>
                <div className='flex flex-col gap-y-3 w-[80%] '>
                    <input type="text" value={username} className='h-[45px] p-3 border border-neutral-500 rounded-[10px] outline-0 focus:outline focus:outline-purple-600' onChange={e => setUsername(e.target.value)} placeholder='نام کاربری' />
                    <input type="text" value={password} className='h-[45px] p-3 border border-neutral-500 rounded-[10px] outline-0 focus:outline focus:outline-purple-600' onChange={e => setPassword(e.target.value)} placeholder='رمز عبور' />
                </div>
                <button type='submit' className='bg-purple-500 hover:bg-purple-600 text-white w-[140px] h-[40px] rounded-[10px] cursor-pointer'>ورود</button>
            </div>
        </form>
    )
}
