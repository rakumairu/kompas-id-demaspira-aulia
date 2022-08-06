import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import expensesSlice from 'features/expenses/expensesSlice'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = () => configureStore({
    reducer: {
        [expensesSlice.name]: expensesSlice.reducer,
    },
    devTools: true,
})

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(makeStore)