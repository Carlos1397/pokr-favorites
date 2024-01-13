'use client'
import React from 'react'
import { SimpleWidget } from './SimpleWidget'
import { IoCartOutline } from 'react-icons/io5'
import { useAppSelector } from '@/src/store'

export const WidegtsGrid = () => {
    const isCart = useAppSelector(state => state.counter.count);
    return (
        <div className="flex flex-wrap p-2 items-center justify-center">
            <SimpleWidget
                subTitle='Productos agregados'
                title={`${isCart}`}
                label='Contador'
                icon={<IoCartOutline size={70} className='text-blue-600' />}
                href='/dashboard/counter'
            />

        </div>
    )
}
