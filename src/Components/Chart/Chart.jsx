import React from 'react'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from 'recharts'

export default function Chart({ title, data, dataKey, grid }) {
    return (
        <div className="w-full h-[200px] sm:h-[250px] lg:mt-10 sm:mt-6">
            <h3 className='text-center mb-6 font-bold text-[20px]'>{title}</h3>
            <ResponsiveContainer width="100%" height="100%" >
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke='#6b559a' />
                    <Line type="monotone" dataKey={dataKey} stroke='#6b559a' />
                    <Tooltip />
                    {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="8" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
