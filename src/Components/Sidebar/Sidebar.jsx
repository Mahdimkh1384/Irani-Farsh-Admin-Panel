import React from 'react'
import { IoMdHome } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaComments, FaClipboardList } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { NavLink } from 'react-router-dom';
import Cookies from "js-cookie";


export default function Sidebar() {
    const admin = Cookies.get("adminName")?.split('.')?.[0];
    const name = decodeURIComponent(admin || "نفوذی خارکصه");
    return (
        <div className=' fixed top-0 w-[18%] h-screen bg-primary text-2xl rounded-l-[15px] lg:inline sm:hidden'>
            <div className='flex flex-col items-center gap-1.5 justify-center p-2.5 text-white'>
                <img src="/images/userIcon.jpg" className='size-30 rounded-[50%]' alt="profile" />
                <p>{name}</p>
            </div>
            <ul className='mt-5 mr-5 flex flex-col gap-y-1.5 text-white text-[20px]'>
                <NavLink to="/" className='flex gap-x-2 p-3.5 menu'>
                    <IoMdHome />
                    صفحه اصلی
                </NavLink>
                <NavLink to="/categories" className='flex gap-x-2 p-3.5 menu '>
                    <BiSolidCategory />
                    دسته بندی ها
                </NavLink>
                <NavLink to="/products" className='flex gap-x-2 p-3.5 menu '>
                    <FaClipboardList />
                    محصولات
                </NavLink>
                <NavLink to="/users" className='flex gap-x-2 p-3.5 menu '>
                    <FaUsers />
                    کاربران
                </NavLink>
                <NavLink to="/comments" className='flex gap-x-2 p-3.5 menu '>
                    <FaComments />
                    کامنت ها
                </NavLink>
                <NavLink to="/offs" className='flex gap-x-2 p-3.5 menu '>
                    <MdLocalOffer />
                    تخفیفات
                </NavLink>
            </ul>
        </div>
    )
}
