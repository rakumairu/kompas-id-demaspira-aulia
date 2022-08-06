import React from 'react'
import { Expenses } from 'features/expenses/expensesSlice'
import { convertNumber } from 'utils/helper'

interface ExpenseCardProps {
    index: number
}

const ExpenseCard = (props: ExpenseCardProps & Expenses) => {
    return (
        <div className="py-4 px-2 w-full shadow-md hover:shadow-lg shadow-transition rounded-sm border border-gray-200">
            <p className='font-bold mb-1'>
                {props.tanggal}
            </p>
            <div className="grid grid-cols-1 border-b border-gray-400 mb-2">
                {
                    props.list.map((item, index) =>
                        <div key={index} className="flex items-center w-full px-1 text-xs font-semibold py-2 border-t border-gray-200 tracking-wide">
                            <p className='mr-3'>
                                {item.jam}
                            </p>
                            <p className='mr-auto'>
                                {item.nama}
                            </p>
                            <p>
                                {convertNumber(item.pengeluaraan.toString(), 'Rp ')}
                            </p>
                        </div>
                    )
                }
            </div>
            <div className="flex items-center justify-end text-xs font-bold">
                <p className='mr-4'>
                    Total
                </p>
                <p>
                    {convertNumber(props.list.reduce((total, item) => total += item.pengeluaraan, 0).toString(), 'Rp ')}
                </p>
            </div>
        </div>
    )
}

export default ExpenseCard
