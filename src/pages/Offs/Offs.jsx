import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import OffDataBox from '../../Components/OffDataBox/OffDataBox'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { ThreeDot } from 'react-loading-indicators'

export default function Offs() {

    const [productID, setProductID] = useState("-1")
    const [allProducts, setAllProducts] = useState([])
    const [offs, setOffs] = useState([])
    const [offCount, setOffCount] = useState(0)
    const [offLimit, setOffLimit] = useState(0)
    const [isOffAdd, setIsOffAdd] = useState(false)
    const [loading, setLoading] = useState(true)

    const getProducts = async () => {
        try {
            const res = await fetch("https://backend.sajlab.ir/api/products")
            const data = await res.json()

            setAllProducts(data.data)
        } catch (err) {
            console.log(err);
        }
    }

    const getOffs = async () => {
        try {
            const res = await fetch("https://backend.sajlab.ir/api/discounts")
            const data = await res.json()

            setOffs(data.data.reverse())
            setLoading(false)

        } catch (err) {
            console.log(err);
        }
    }

    const emptyInputs = () => {
        setProductID("-1")
        setOffLimit(0)
        setOffCount(0)
    }

    useEffect(() => {
        getProducts()
        getOffs()
    }, [])

    const setOffer = () => {

        if (!productID || !offCount || !offLimit) {
            Swal.fire({
                title: "افزودن تخفیف",
                text: "لطفا تمامی مقادیر را وارد کنید",
                icon: "warning",
                confirmButtonText: "باشه",
            })
        } else {
            Swal.fire({
                title: "افزودن تخفیف",
                text: "آیا از افزودن تخفیف اطمینان دارید ؟",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "بله",
                cancelButtonText: "انصراف",
                confirmButtonColor: "#9333ea",
            }).then(async result => {
                if (result.isConfirmed) {
                    try {

                        if (!Number(offCount) || !Number(offLimit) || !Number(productID > 0)) {
                            Swal.fire({
                                title: "افزودن تخفیف",
                                text: "لطفا تمامی مقادیر را به درستی وارد کنید",
                                icon: "warning",
                                confirmButtonText: "باشه",
                            })

                            emptyInputs()
                            return;
                        }

                        setIsOffAdd(true)
                        const res = await fetch("https://backend.sajlab.ir/api/discounts", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                productId: Number(productID),
                                days: Number(offLimit),
                                amount: Number(offCount)
                            })
                        })
                        const data = await res.json()

                        if (data.success) {
                            setIsOffAdd(false)
                            emptyInputs()
                            getOffs()
                            Swal.fire({
                                title: "افزودن تخفیف",
                                text: "تخفیف مورد نظر با موفقیت افزوده شد",
                                icon: "success",
                                confirmButtonText: "باشه",
                            })
                        }
                    } catch (err) {
                        console.log(err);
                    }
                }
            })
        }
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
        }).then(async result => {
            if (result.isConfirmed) {

                const res = await fetch(`https://backend.sajlab.ir/api/discounts/${id}`, {
                    method: "DELETE"
                })
                const data = await res.json()

                if (data.success) {
                    getOffs()
                    Swal.fire({
                        title: "حذف تخفیف",
                        text: "تخفیف مورد نظر با موفقیت حذف شد",
                        icon: "success",
                        confirmButtonText: "باشه",
                    })
                }
            }
        })
    }

    const editOff = (id, amount, days) => {

        Swal.fire({
            title: 'ویرایش تخفیف',
            html: `
    <input id="swal-input1" value = "${amount}" class="swal2-input" placeholder="مقدار جدید تخفیف(درصد)" />
    <input id="swal-input2" value = "${days}" class="swal2-input" placeholder="حداکثر زمان جدید (روز)" />
    `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'ثبت',
            cancelButtonText: 'انصراف',
            preConfirm: () => {
                const val1 = document.getElementById('swal-input1').value;
                const val2 = document.getElementById('swal-input2').value;

                if (!val1 || !val2) {
                    Swal.showValidationMessage('هر دو ورودی را پر کنید');
                    return false;
                }

                return { val1, val2 };
            }
        }).then(async result => {
            if (result.isConfirmed) {
                const { val1, val2 } = result.value;

                if (Number(val1) === amount && Number(val2) === days) {
                    return
                }

                const res = await fetch(`https://backend.sajlab.ir/api/discounts/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        amount: Number(val1),
                        days: Number(val2)
                    })
                })

                const data = await res.json()

                if (data.success) {
                    getOffs()
                    Swal.fire({
                        title: "ویرایش تخفیف",
                        text: "تخفیف مورد نظر با موفقیت ویرایش شد",
                        icon: "success",
                        confirmButtonText: "باشه",
                    })
                }
            }
        })
    }

    return (
        <>
            {/* ==================================== add offer ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>افزودن تخفیف</h1>
                <div className='w-full flex gap-2.5 flex-wrap'>
                    <select onChange={e => setProductID(e.target.value)} className='lg:w-[49%] sm:w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500'>
                        <option value="-1">محصول مورد نظر را انتخاب کنید</option>
                        {allProducts.map(product => (
                            <option key={product.id} value={product.id}>
                                {product.title}
                            </option>
                        ))}
                    </select>
                    <input type="number" min={1} value={offCount === 0 ? "" : offCount} className='lg:w-[49%] sm:w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setOffCount(e.target.value)} placeholder='مقدار تخفیف (درصد)' />
                    <input type="number" min={1} value={offLimit === 0 ? "" : offLimit} className='lg:w-[49%] sm:w-full h-[45px] border-2 rounded-[10px] p-2 outline-0 focus:outline focus:outline-purple-500' onChange={e => setOffLimit(e.target.value)} placeholder='حداکثر زمان تخفیف (روز)' />
                    <div className='flex lg:justify-end sm:justify-center lg:w-[49%] sm:w-full mt-2.5'>
                        <button disabled={isOffAdd} onClick={setOffer} className=' text-white bg-purple-500 hover:bg-purple-600 lg:w-[100px] sm:w-full h-[40px] rounded-[10px] cursor-pointer transition-colors'>{
                            isOffAdd ? <ThreeDot color="#ffffff" size="small" text="" textColor="" /> : "افزودن"
                        }</button>
                    </div>
                </div>
            </div>
            {/* ==================================== offs list ===================================== */}
            <div className='flex flex-col gap-y-5'>
                <h1 className='text-2xl text-purple-500'>لیست تخفیفات</h1>
                <div className='flex flex-wrap gap-4'>
                    {/* map 👇 */}
                    {loading ? (
                        Array(4).fill(0).map((item, index) => (
                            <div className='w-full h-[50px] flex justify-between items-center border border-neutral-700 p-2.5 rounded-[8px]'>
                                <Skeleton width={250} height={35}/>
                                <Skeleton width={40} height={35}/>
                                <Skeleton width={50} height={35}/>
                                <div className='flex gap-x-2.5'>
                                    <Skeleton width={80} height={35}/>
                                    <Skeleton width={80} height={35}/>
                                </div>
                            </div>
                        ))
                    ) : (
                        offs.length > 0 ? (
                            offs.map(off => (
                                <OffDataBox key={off.id} {...off} removeHandler={deleteOff} editHandler={editOff} />
                            ))
                        ) : (
                            <div className='flex w-full h-[30vh] justify-center items-center'>
                                <h1 className='text-2xl text-red-600'>هیچ تخفیفی وجود ندارد</h1>
                            </div>
                        )
                    )}
                </div>
            </div>
        </>
    )
}