import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

export type Expenses = {
    tanggal: string
    list: {
        jam: string
        nama: string
        pengeluaraan: number
    }[]
}

type NewExpenses = {
    tanggal: string
    jam: string
    nama: string
    pengeluaraan: number
}

// Define a type for the slice state
interface ExpensesState {
    items: Expenses[]
}

// Define the initial state using that type
const initialState: ExpensesState = {
    items: [],
}

const expensesSlice = createSlice({
    name: 'expenses',
    initialState,
    reducers: {
        hydrateExpenses: (state, action: PayloadAction<Expenses[]>) => {
            state.items = action.payload
        },
        addExpenses: (state, action: PayloadAction<NewExpenses>) => {
            const { jam, nama, pengeluaraan, tanggal } = action.payload

            if (state.items.some(expense => expense.tanggal === tanggal)) {
                state.items = state.items.map(expense => expense.tanggal === tanggal ? ({
                    ...expense,
                    list: expense.list.concat({
                        jam: jam,
                        nama: nama,
                        pengeluaraan: pengeluaraan,
                    }),
                }) : expense)
            } else {
                state.items.unshift({
                    tanggal: tanggal,
                    list: [{
                        jam: jam,
                        nama: nama,
                        pengeluaraan: pengeluaraan,
                    }]
                })
            }
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => ({
            ...state,
            ...action.payload.expenses,
        })
    },
})

export const { hydrateExpenses, addExpenses } = expensesSlice.actions
export default expensesSlice