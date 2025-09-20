import { IoMdHome } from "react-icons/io";
import { BiSolidCategory } from "react-icons/bi";
import { FaUsers, FaComments, FaClipboardList } from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";
import { NavLink } from 'react-router-dom';


export default function Sidebar() {
    return (
        <div className=' fixed top-0 right-0 w-[70%] h-screen bg-primary text-2xl rounded-l-[15px] z-50'>
            <div className='flex flex-col items-center gap-1.5 justify-center p-2.5 text-white'>
                <img src="/images/userIcon.jpg" className='size-30 rounded-[50%]' alt="profile" />
                <p>مهدی مرامی</p>
                <p>Mahdi-M</p>
            </div>
            <ul className='mt-5 mr-5 flex flex-col gap-y-1.5 text-white text-[20px]'>
                <NavLink to="/" className='flex gap-x-2 p-3.5 '>
                    <IoMdHome />
                    صفحه اصلی
                </NavLink>
                <NavLink to="/categories" className='flex gap-x-2 p-3.5 '>
                    <BiSolidCategory />
                    دسته بندی ها
                </NavLink>
                <NavLink to="/products" className='flex gap-x-2 p-3.5 '>
                    <FaClipboardList />
                    محصولات
                </NavLink>
                <NavLink to="/users" className='flex gap-x-2 p-3.5 '>
                    <FaUsers />
                    کاربران
                </NavLink>
                <NavLink to="/comments" className='flex gap-x-2 p-3.5 '>
                    <FaComments />
                    کامنت ها
                </NavLink>
                <NavLink to="/offs" className='flex gap-x-2 p-3.5 '>
                    <MdLocalOffer />
                    تخفیفات
                </NavLink>
            </ul>
        </div>
    )
}
