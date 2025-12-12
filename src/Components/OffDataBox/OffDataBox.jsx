import React from 'react'

export default function OffDataBox({ id , product , amount , days , removeHandler , editHandler , isDataLoad}) {
    return (
        <div  className='w-full flex justify-between items-center border border-neutral-700 p-2.5 rounded-[8px]'>
            <h3 className='w-[25%]'>{product.title}</h3>
            <p>{amount}%</p>
            <p>{days} روز</p>
            <div className='flex gap-x-2.5'>
                <button disabled={isDataLoad} className='lg:w-[80px] sm:w-[60px] h-[35px] bg-purple-500 text-white rounded-[10px] hover:cursor-pointer hover:bg-purple-600 transition-colors disabled:bg-purple-400' onClick={() => editHandler(id , amount , days)}>ویرایش</button>
                <button disabled={isDataLoad} className='lg:w-[80px] sm:w-[60px] h-[35px] bg-white text-purple-500 border border-purple-500 rounded-[10px] hover:cursor-pointer hover:bg-purple-50 transition-colors disabled:bg-purple-50 disabled:text-purple-400' onClick={ () => removeHandler(id)}>حذف</button>
            </div>
        </div>
    )
}
