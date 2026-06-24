import React, { useEffect, useState } from 'react'
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'

export default function Chart({ title, data, dataKey, grid }) {
    const [colors, setColors] = useState({ accent: '#6b559a', grid: '#e0dfdf' })

    useEffect(() => {
        const root = document.documentElement
        const style = getComputedStyle(root)
        setColors({
            accent: style.getPropertyValue('--accent').trim() || '#6b559a',
            grid:   style.getPropertyValue('--border-primary').trim() || '#e0dfdf',
        })
    }, [])

    return (
        <div className="w-full h-[200px] sm:h-[250px] lg:mt-10 sm:mt-6">
            <h3 className='text-center mb-6 font-bold text-[20px] text-text-main'>{title}</h3>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <XAxis dataKey="name" stroke={colors.accent} />
                    <Line type="monotone" dataKey={dataKey} stroke={colors.accent} />
                    <Tooltip />
                    {grid && <CartesianGrid stroke={colors.grid} strokeDasharray="8" />}
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}