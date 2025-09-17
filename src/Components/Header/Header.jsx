import React, { useState, useEffect } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { IoMoonOutline, IoPowerOutline } from "react-icons/io5";


export default function Header() {

    const [isDarkTheme, setIsDarkTheme] = useState(false)

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "true") setIsDarkTheme(true);
    }, []);

    useEffect(() => {
        if (isDarkTheme) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkTheme]);

    return (
        <div className='mt-4 font-bold text-2xl flex justify-between items-center'>
            <div>
                <p>ایرانی فرش</p>
            </div>
            {/* ========================= left section ========================== */}
            <div className='flex gap-x-5'>
                <button className='btn hover:bg-neutral-200 transition-colors'>
                    <IoMdNotificationsOutline />
                </button>
                <button className='btn hover:bg-neutral-200 transition-colors' onClick={() => {
                    setIsDarkTheme(prev => !prev)
                    localStorage.setItem("theme", !isDarkTheme)
                }}>
                    {isDarkTheme ? <IoMoonOutline /> : <CiLight />}
                </button>
                <button className='btn hover:bg-red-500 transition-colors hover:text-white'>
                    <IoPowerOutline />
                </button>
            </div>
        </div>
    )
}
