import React from 'react'

export default function InformationBox({ title, icon, value }) {
    return (
        <div className='lg:w-[230px] sm:w-[175px] h-[120px] flex flex-col items-center justify-center gap-y-3.5 rounded-[20px] bg-bg-secondary border-2 border-accent transition-colors'>
            <div className='text-text-sub text-[20px]'>
                {icon}
            </div>
            <p className='text-text-sub text-[15px]'>{title}</p>
            <h3 className='lg:text-[20px] sm:text-[17px] font-bold text-text-main'>{value}</h3>
        </div>
    )
}
