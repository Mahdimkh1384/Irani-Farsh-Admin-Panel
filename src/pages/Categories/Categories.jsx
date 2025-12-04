import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThreeDot } from 'react-loading-indicators'

export default function Categories() {

    const [allCategories, setAllCategories] = useState([])
    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [image, setImage] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isCategoryAdd, setIsCategoryAdd] = useState(false)
    const [isDataLoad, setIsDataLoad] = useState(false)


    const getCategories = async () => {
        try {
            setLoading(true)
            const res = await axios.get("https://backend.sajlab.ir/api/categories")
            setAllCategories(res.data.data)

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    const emptyInputs = () => {
        setTitle('')
        setSlug('/categories')
        setImage(null)
    }

    const addCategory = async () => {

        setIsCategoryAdd(true)

        const formData = new FormData()
        formData.append('title', title)
        formData.append('slug', slug)
        formData.append('image', image)

        try {
            const res = await axios.post("https://backend.sajlab.ir/api/categories", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true
            })
            if (res.status === 201) {
                setIsCategoryAdd(false)
                emptyInputs()
                Swal.fire({
                    title: "افزودن دسته بندی",
                    text: "دسته بندی با موفقیت افزوده شد",
                    icon: "success",
                    confirmButtonText: "باشه",
                })
                getCategories()
            }
        } catch (err) {
            setIsCategoryAdd(false)
            console.log(err);
            Swal.fire({
                title: "افزودن دسته بندی",
                text: "مقادیر را به درستی وارد کنید",
                icon: "warning",
                confirmButtonText: "باشه",
            })
        }
    }

    const editCategory = (id, title, slug, image) => {
        setIsDataLoad(true)

        Swal.fire({
            icon: "info",
            title: "مقادیر جدید را وارد کنید",
            html: `
        <input id="swal-input1" class="swal2-input" value = "${title}" placeholder="عنوان جدید دسته بندی">
        <input id="swal-input2" class="swal2-input" value = "${slug}" placeholder="آدرس جدید دسته بندی">
        <input id="swal-input3" type = "file" style = "width : 60% ; cursor : pointer" class="swal2-input" placeholder="عکس جدید دسته بندی">
    `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ثبت',
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                const input1 = document.getElementById('swal-input1').value
                const input2 = document.getElementById('swal-input2').value
                const input3 = document.getElementById('swal-input3').files[0] || image
                if (!input1 || !input2 || !input3) {
                    Swal.showValidationMessage('هر سه ورودی لازم است')
                }
                return { input1, input2, input3 }
            }
        }).then(async result => {
            if (result.isConfirmed) {
                const { input1, input2, input3 } = result.value;

                const formData = new FormData()
                formData.append("title", input1)
                formData.append("slug", input2)
                formData.append("image", input3)

                const res = await axios.put(`https://backend.sajlab.ir/api/categories/${id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                })
                if (res.status === 200) {
                    setIsDataLoad(false)
                    getCategories()
                    Swal.fire({
                        title: "ویرایش دسته بندی",
                        text: "دسته بندی با موفقیت ویرایش شد",
                        icon: "success",
                        confirmButtonText: "باشه",
                    })
                }
            }
            else {
                setIsDataLoad(false)
            }
        })
    }

    const deleteCategory = (id) => {
        setIsDataLoad(true)

        Swal.fire({
            title: "حذف دسته بندی",
            text: "آیا از حذف دسته بندی اطمینان دارید ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "انصراف",
            confirmButtonColor: "#e11d48",
        }).then(async result => {
            if (result.isConfirmed) {
                const res = await axios.delete(`https://backend.sajlab.ir/api/categories/${id}`)
                if (res.status === 200) {
                    setIsDataLoad(false)
                    getCategories()
                    Swal.fire({
                        title: "حذف دسته بندی",
                        text: "دسته بندی با موفقیت حذف شد",
                        icon: "success",
                        confirmButtonText: "باشه",
                    })
                }
            } else {
                setIsDataLoad(false)
            }
        })
    }

    return (
        <>
            {/* ==================================== add category ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>افزودن دسته بندی</h1>
                <div className='w-full flex flex-wrap gap-2.5'>
                    <input type="text" value={title} className='lg:w-[49%] sm:w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setTitle(e.target.value)} placeholder='عنوان دسته بندی' />
                    <input type="text" value={slug} className='lg:w-[49%] sm:w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setSlug(e.target.value)} placeholder='آدرس دسته بندی' />
                    <input type="file" accept="image/*" className='lg:w-[49%] sm:w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500 cursor-pointer' onChange={e => setImage(e.target.files[0])} placeholder='عکس دسته بندی' />
                    <div className='flex justify-end lg:w-[49%] sm:w-full mt-2.5'>
                        <button disabled={isCategoryAdd} onClick={addCategory} className=' text-white bg-purple-500 hover:bg-purple-600 lg:w-[100px] sm:w-full h-[40px] rounded-[10px] cursor-pointer transition-colors'>{
                            isCategoryAdd ? <ThreeDot color="#ffffff" size="small" text="" textColor="" /> : "افزودن"
                        }</button>
                    </div>
                </div>
            </div>
            {/* ==================================== category list ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>لیست دسته بندی ها</h1>
                <div className='flex flex-wrap gap-4'>
                    {/* map 👇 */}
                    {loading && Array(allCategories.length || 6).fill(0).map((item, index) => (
                        <div key={index} className='lg:w-[49%] sm:w-full h-[50px] flex justify-between items-center border border-neutral-700 p-2.5 rounded-[8px]'>
                            <Skeleton width={100} height={20} />
                            <div className='flex gap-x-2.5'>
                                <Skeleton width={80} height={35} />
                                <Skeleton width={80} height={35} />
                            </div>
                        </div>
                    ))}
                    {allCategories.map(category => (
                        <div key={category.id} className='lg:w-[49%] sm:w-full h-[50px] flex justify-between items-center border border-neutral-700 p-2.5 rounded-[8px]'>
                            <h3>{category.title}</h3>
                            <div className='flex gap-x-2.5'>
                                <button disabled={isDataLoad} className='w-[80px] h-[35px] bg-purple-500 text-white rounded-[10px] hover:cursor-pointer hover:bg-purple-600 transition-colors disabled:bg-purple-400' onClick={() => editCategory(category.id, category.title, category.slug, category.image)}>ویرایش</button>
                                <button disabled={isDataLoad} className='w-[80px] h-[35px] bg-white text-purple-500 border border-purple-500 rounded-[10px] hover:cursor-pointer hover:bg-purple-50 transition-colors disabled:bg-purple-50 disabled:text-purple-400' onClick={() => deleteCategory(category.id)}>حذف</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
