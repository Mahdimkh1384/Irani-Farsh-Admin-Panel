import React, { useState } from 'react'
import swal from 'sweetalert'

export default function Categories() {

    const categories = [
        { id: 1, title: "فرش های ماشینی", href: "/kir" },
        { id: 2, title: "فرش های جدید", href: "/kir" },
        { id: 3, title: "فرش های دستبافت", href: "/kir" },
    ]

    const [allCategories, setAllCategories] = useState(categories)
    const [title, setTitle] = useState('')
    const [href, setHref] = useState('')

    const editCategory = (id , title , href) => {
        swal({
            icon : "warning",
            title : "مقادیر جدید را وارد کنید" ,
            content: {
                element: "div",
                attributes: {
                    innerHTML: `
            <input id="input1" class="swal-content__input" value = ${title} placeholder="عنوان جدید دسته بندی">
            <input id="input2" class="swal-content__input" value = ${href} placeholder="آدرس جدید دسته بندی">
            `
                }
            },
            buttons: ["انصراف", "ثبت"]
        }).then(value => {
            if(value){
                let categoryTitle = document.getElementById("input1").value;
                let categoryHref = document.getElementById("input2").value;

                console.log(categoryTitle);
                
            }
        })
    }

    const deleteCategory = (id) => {
        swal({
            title: "آیا از حذف دسته بندی اطمینان دارید ؟",
            icon: "warning",
            buttons: ["خیر", "بله"]
        }).then(result => {
            if (result) {
                setAllCategories(categories.filter(category => category.id !== id))
                swal({
                    title: "دسته بندی با موفقیت حذف شد",
                    icon: "success",
                    buttons: "باشه"
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
                                <button className='w-[80px] h-[35px] bg-purple-500 text-white rounded-[10px] hover:cursor-pointer hover:bg-purple-600 transition-colors' onClick={() => editCategory(category.id , category.title , category.href)}>ویرایش</button>
                                <button className='w-[80px] h-[35px] bg-white text-purple-500 border border-purple-500 rounded-[10px] hover:cursor-pointer hover:bg-purple-50 transition-colors' onClick={() => deleteCategory(category.id)}>حذف</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
