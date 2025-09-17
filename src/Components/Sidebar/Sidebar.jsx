import React from 'react'
import { IoMdHome } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaComments , FaClipboardList  } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { Link } from 'react-router-dom';


export default function Sidebar() {
    return (
        <div className=' fixed top-0 w-[20%] h-screen bg-primary text-2xl rounded-l-[15px]'>
            <div className='flex flex-col items-center gap-1.5 justify-center p-2.5 text-white'>
                <img src="/images/userIcon.jpg" className='size-30 rounded-[50%]' alt="profile" />
                <p>مهدی مرامی</p>
                <p>Mahdi-M</p>
            </div>
            <ul className='mt-5 mr-5 text-white text-[20px]'>
                <Link to="/" className='flex gap-x-2 p-3.5 active'>
                    <IoMdHome />
                    صفحه اصلی
                </Link>
                <Link to="/" className='flex gap-x-2 p-3.5 '>
                    <BiSolidCategory/>
                    دسته بندی ها
                </Link>
                <Link to="/" className='flex gap-x-2 p-3.5 '>
                    <FaClipboardList />
                    محصولات
                </Link>
                <Link to="/" className='flex gap-x-2 p-3.5 '>
                    <FaUsers/>
                    کاربران
                </Link>
                <Link to="/" className='flex gap-x-2 p-3.5 '>
                    <FaComments/>
                    کامنت ها
                </Link>
                <Link to="/" className='flex gap-x-2 p-3.5 '>
                    <MdLocalOffer/>
                    تخفیفات
                </Link>
            </ul>
        </div>
    )
}
