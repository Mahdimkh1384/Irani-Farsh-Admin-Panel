import React, { useState } from 'react'

export default function Login() {

    const [userName , setUserName] = useState('')
    const [password , setPassword] = useState('')

    return (
        <div className='bg-neutral-100 h-screen flex justify-center items-center'>
            <div className='bg-white w-[30%] h-[50%] border-2 border-neutral-600 rounded-[20px] shadow shadow-purple-600 flex flex-col justify-around items-center'>
                <h1 className='text-3xl font-bold'>ورود</h1>
                <div className='flex flex-col gap-y-3 w-[80%] '>
                    <input type="text" value={userName} className='h-[45px] p-3 border border-neutral-500 rounded-[10px] outline-0 focus:outline focus:outline-purple-600' onChange={e => setUserName(e.target.value)} placeholder='نام کاربری' />
                    <input type="text" value={password} className='h-[45px] p-3 border border-neutral-500 rounded-[10px] outline-0 focus:outline focus:outline-purple-600' onChange={e => setPassword(e.target.value)} placeholder='رمز عبور' />
                </div>
                <button className='bg-purple-500 hover:bg-purple-600 text-white w-[140px] h-[40px] rounded-[10px] cursor-pointer'>ورود</button>
            </div>
        </div>
    )
}
