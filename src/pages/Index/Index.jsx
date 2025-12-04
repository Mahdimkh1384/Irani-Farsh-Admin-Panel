import React from 'react'
import InformationBox from '../../Components/InformationBox/InformationBox'
import { BiDollar } from "react-icons/bi";
import { HiUsers } from "react-icons/hi2";
import { FaCartShopping, FaListOl } from "react-icons/fa6";
import Chart from '../../Components/Chart/Chart';
import XAxisData from '../../Data';

export default function Index() {

    const information = [
        { id: 1, title: "کل درآمد", icon: <BiDollar />, value: "20000000 ریال" },
        { id: 1, title: "تعداد فروش", icon: <FaCartShopping />, value: 3 },
        { id: 1, title: "تعداد کاربران", icon: <HiUsers />, value: 105 },
        { id: 1, title: "تعداد کالا ها", icon: <FaListOl />, value: 54 },
    ]

    return (
        <>
            <div className='flex items-center flex-wrap lg:gap-0 sm:gap-y-3.5 justify-between'>
                {information.map((info,i) => (
                    <InformationBox key={i} {...info} />
                ))}
            </div>
            <Chart grid title ="نمودار درآمد های یک سال گذشته" data={XAxisData} dataKey="sale" />
        </>
    )
}
