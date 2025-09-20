import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Categories() {

    const categories = [
        { id: 1, title: "فرش های ماشینی", href: "/kir" },
        { id: 2, title: "فرش های جدید", href: "/kir" },
        { id: 3, title: "فرش های دستبافت", href: "/kir" },
    ]

    const [allCategories, setAllCategories] = useState(categories)
    const [title, setTitle] = useState('')
    const [href, setHref] = useState('')

    const editCategory = (id, title, href) => {
        Swal.fire({
            icon : "info",
            title: "مقادیر جدید را وارد کنید",
            html: `
        <input id="swal-input1" class="swal2-input" value = ${title} placeholder="عنوان جدید دسته بندی">
        <input id="swal-input2" class="swal2-input" value = ${href} placeholder="آدرس جدید دسته بندی">
    `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ثبت',
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                const input1 = document.getElementById('swal-input1').value
                const input2 = document.getElementById('swal-input2').value
                if (!input1 || !input2) {
                    Swal.showValidationMessage('هر دو ورودی لازم است')
                }
                return { input1, input2 }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('ورودی اول:', result.value.input1)
                console.log('ورودی دوم:', result.value.input2)
            }
        })
    }

    const deleteCategory = (id) => {
        Swal.fire({
            title: "حذف دسته بندی",
            text: "آیا از حذف دسته بندی اطمینان دارید ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "انصراف",
            confirmButtonColor: "#e11d48",
        }).then(result => {
            if (result.isConfirmed) {
                setAllCategories(categories.filter(category => category.id !== id))
                Swal.fire({
                    title: "حذف دسته بندی",
                    text: "دسته ببندی با موفقیت حذف شد",
                    icon: "success",
                    confirmButtonText: "باشه",
                })
            }
        })
    }

    return (
        <>
            {/* ==================================== add category ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>افزودن دسته بندی</h1>
                <div className='w-full flex gap-2.5'>
                    <input type="text" value={title} className='w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setTitle(e.target.value)} placeholder='عنوان دسته بندی' />
                    <input type="text" value={href} className='w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setHref(e.target.value)} placeholder='آدرس دسته بندی' />
                </div>
                <div className='flex justify-end'>
                    <button className='text-white bg-purple-500 hover:bg-purple-600 w-[100px] h-[40px] rounded-[10px] cursor-pointer transition-colors'>افزودن</button>
                </div>
            </div>
            {/* ==================================== category list ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>لیست دسته بندی ها</h1>
                <div className='flex flex-wrap gap-4'>
                    {/* map 👇 */}
                    {allCategories.map(category => (
                        <div key={category.id} className='lg:w-[49%] sm:w-full h-[50px] flex justify-between items-center border border-neutral-700 p-2.5 rounded-[8px]'>
                            <h3>{category.title}</h3>
                            <div className='flex gap-x-2.5'>
                                <button className='w-[80px] h-[35px] bg-purple-500 text-white rounded-[10px] hover:cursor-pointer hover:bg-purple-600 transition-colors' onClick={() => editCategory(category.id, category.title, category.href)}>ویرایش</button>
                                <button className='w-[80px] h-[35px] bg-white text-purple-500 border border-purple-500 rounded-[10px] hover:cursor-pointer hover:bg-purple-50 transition-colors' onClick={() => deleteCategory(category.id)}>حذف</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
