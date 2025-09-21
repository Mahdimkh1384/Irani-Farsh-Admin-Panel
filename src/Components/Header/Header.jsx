import React, { useState, useEffect , useRef } from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiLight } from "react-icons/ci";
import { IoMoonOutline, IoPowerOutline, IoMenuOutline } from "react-icons/io5";
import MobileSidebar from "../MobileSidebar/MobileSidebar"

export default function Header() {

    const [isDarkTheme, setIsDarkTheme] = useState(false)
    const [isShowMobileSidebar, setIsShowMobileSidebar] = useState(false)
    const menuRef = useRef(null);

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

    // close mobile menu to click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isShowMobileSidebar &&
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setIsShowMobileSidebar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShowMobileSidebar]);

    return (
        <>
            {isShowMobileSidebar && <div className='fixed z-50' ref={menuRef}><MobileSidebar /></div>}
            <div className='mt-4 font-bold text-2xl flex justify-between items-center'>
                <div className='flex items-center gap-x-3'>
                    <button className='btn lg:hidden sm:inline' onClick={() => setIsShowMobileSidebar(prev => !prev)}>
                        <IoMenuOutline />
                    </button>
                    <p>ایرانی فرش</p>
                </div>
                {/* ========================= left section ========================== */}
                <div className='flex gap-x-5'>
                    <button className='btn hover:bg-neutral-200 transition-colors'>
                        <IoMdNotificationsOutline />
                    </button>
                    <button className='btn hover:bg-neutral-200 transition-all' onClick={() => {
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
        </>
    )
}
