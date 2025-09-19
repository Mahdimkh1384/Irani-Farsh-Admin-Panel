import React from 'react'

export default function InformationBox({title , icon , value}) {
    return (
        <div className='w-[230px] h-[120px] flex flex-col items-center justify-center gap-y-3.5 rounded-[20px] bg-neutral-100 dark:bg-secondary dark:text-white text-black border-2 border-secondary dark:border-primary transition-colors'>
            <div className='text-neutral-600 dark:text-white text-[20px]'>
                {icon}
            </div>
            <p className='text-neutral-600 dark:text-white'>{title}</p>
            <h3 className='text-[20px]'>{value}</h3>
        </div>
    )
}
