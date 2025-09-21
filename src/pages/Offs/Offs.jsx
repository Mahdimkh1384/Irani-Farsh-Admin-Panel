import React, { useState } from 'react'
import Swal from 'sweetalert2'

export default function Offs() {

    const products = [
        { id: 1, title: "فرش ماهساره", off: 0 },
        { id: 2, title: "فرش گلیم", off: 0 },
        { id: 3, title: "فرش ماشینی", off: 0 },
        { id: 4, title: "فرش کص", off: 0 },
        { id: 5, title: "فرش کیری", off: 0 },
    ]

    const [productID, setProductID] = useState("-1")
    const [allProducts, setAllProducts] = useState(products)
    const [offCount, setOffCount] = useState('')
    const [offLimit, setLimit] = useState('')

    const setOffer = () => {
        Swal.fire({
            title: "افزودن تخفیف",
            text: "آیا از افزودن تخفیف اطمینان دارید ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "انصراف",
            confirmButtonColor: "#9333ea",
        }).then(result => {
            if (result.isConfirmed) {
                //codes
                Swal.fire({
                    title: "افزودن تخفیف",
                    text: "تخفیف مورد نظر با موفقیت افزوده شد",
                    icon: "success",
                    confirmButtonText: "باشه",
                })
            }
        })
    }

    const deleteOff = (id) => { 
        Swal.fire({
            title: "حذف تخفیف",
            text: "آیا از حذف تخفیف اطمینان دارید ؟",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "بله",
            cancelButtonText: "انصراف",
            confirmButtonColor: "#e11d48",
        }).then(result => {
            if (result.isConfirmed) {
                //codes
                Swal.fire({
                    title: "حذف تخفیف",
                    text: "تخفیف مورد نظر با موفقیت حذف شد",
                    icon: "success",
                    confirmButtonText: "باشه",
                })
            }
        })
    }

    return (
        <>
            {/* ==================================== add offer ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>افزودن تخفیف</h1>
                <div className='w-full flex gap-2.5 flex-wrap'>
                    <select onChange={e => setProductID(e.target.value)} className='w-[49%] h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500'>
                        <option value="-1">محصول مورد نظر را انتخاب کنید</option>
                        {allProducts.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.title}
                            </option>
                        ))}
                    </select>
                    <input type="text" value={offCount} className='w-[49%] h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setOffCount(e.target.value)} placeholder='مقدار تخفیف (درصد)' />
                    <input type="number" value={offLimit} className='w-[49%] h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setLimit(e.target.value)} placeholder='حداکثر زمان تخفیف (روز)' />
                    <div className='flex justify-end w-[49%] mt-2.5'>
                        <button onClick={setOffer} className='text-white bg-purple-500 hover:bg-purple-600 w-[100px] h-[40px] rounded-[10px] cursor-pointer transition-colors'>افزودن</button>
                    </div>
                </div>
            </div>
            {/* ==================================== category list ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>لیست تخفیفات</h1>
                <div className='flex flex-wrap gap-4'>
                    {/* map 👇 */}
                    <div className='w-full h-[50px] flex justify-between items-center border border-neutral-700 p-2.5 rounded-[8px]'>
                        <h3>فرش ماشینی</h3>
                        <p>30%</p>
                        <p>2 روز</p>
                        <div className='flex gap-x-2.5'>
                            <button className='w-[80px] h-[35px] bg-purple-500 text-white rounded-[10px] hover:cursor-pointer hover:bg-purple-600 transition-colors' >ویرایش</button>
                            <button className='w-[80px] h-[35px] bg-white text-purple-500 border border-purple-500 rounded-[10px] hover:cursor-pointer hover:bg-purple-50 transition-colors' onClick={deleteOff}>حذف</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
