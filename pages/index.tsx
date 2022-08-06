import React, { useMemo, useState } from "react"
import Button from "components/forms/Button"
import ExpenseCard from "components/ui/ExpenseCard"
import TambahEntriModal from "components/modal/TambahEntriModal"
import { expensesAPI } from "features/expenses/expensesAPI"
import { Expenses, hydrateExpenses } from "features/expenses/expensesSlice"
import { useAppSelector } from "lib/hooks"
import { wrapper } from "lib/store"
import { convertNumber } from "utils/helper"

const Home = () => {
    const expenses = useAppSelector(state => state.expenses)

    const [isAddFormOpen, setIsAddFormOpen] = useState(false)

    const thisMonthExpenses = useMemo(() => convertNumber(expenses.items.reduce((total, perDay) => total += perDay.list.reduce((totalItem, item) => totalItem += item.pengeluaraan, 0), 0).toString(), 'Rp. '), [expenses.items])

    return (
        <>
            <TambahEntriModal
                isOpen={isAddFormOpen}
                onClose={() => setIsAddFormOpen(false)}
            />
            <div className="container w-full px-4 md:px-0 py-8">
                <h1 className="text-center text-2xl font-medium">
                    Diari Jajan Februari 2021
                </h1>
                <p className="text-center text-lg font-medium mb-3">
                    Pengeluaran Bulan Ini { thisMonthExpenses }
                </p>
                <div className="flex items-center justify-center mb-6">
                    <Button onClick={() => setIsAddFormOpen(true)}>
                        TAMBAH ITEM
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4">
                    {
                        expenses.items.map((item, index) => <ExpenseCard key={index} index={index} {...item} />)
                    }
                </div>
            </div>
        </>
    )
}

export const getStaticProps = wrapper.getStaticProps(
    store => async () => {
        const apiRes = await expensesAPI()

        let expenses: Expenses[] = []

        apiRes.forEach(item => {
            if (expenses.some(expense => expense.tanggal === item.tanggal)) {
                expenses = expenses.map(expense => expense.tanggal === item.tanggal ? ({
                    ...expense,
                    list: expense.list.concat({
                        jam: item.jam,
                        nama: item.nama,
                        pengeluaraan: item.pengeluaraan,
                    }),
                }) : expense)
            } else {
                expenses.push({
                    tanggal: item.tanggal,
                    list: [{
                        jam: item.jam,
                        nama: item.nama,
                        pengeluaraan: item.pengeluaraan,
                    }]
                })
            }
        })
        
        store.dispatch(hydrateExpenses(expenses))

        return {
            props: {},
        }
    }
)

export default Home