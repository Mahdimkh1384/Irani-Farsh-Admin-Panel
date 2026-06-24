import React from 'react'

export default function OffDataBox({ id, product, amount, days, removeHandler, editHandler, isDataLoad }) {
    return (
        <div className='w-full flex justify-between items-center border border-border-main bg-bg-surface p-2.5 rounded-[8px]'>
            <h3 className='w-[25%] text-text-main'>{product.title}</h3>
            <p className='text-text-sub'>{amount}%</p>
            <p className='text-text-sub'>{days} روز</p>
            <div className='flex gap-x-2.5'>
                <button disabled={isDataLoad}
                    className='lg:w-[80px] sm:w-[60px] h-[35px] bg-accent text-white rounded-[10px] hover:cursor-pointer hover:bg-accent-hover transition-colors disabled:bg-accent-muted'
                    onClick={() => editHandler(id, amount, days)}>ویرایش</button>
                <button disabled={isDataLoad}
                    className='lg:w-[80px] sm:w-[60px] h-[35px] bg-bg-surface text-accent border border-accent rounded-[10px] hover:cursor-pointer hover:bg-accent-light transition-colors disabled:bg-accent-light disabled:text-accent-muted'
                    onClick={() => removeHandler(id)}>حذف</button>
            </div>
        </div>
    )
}
