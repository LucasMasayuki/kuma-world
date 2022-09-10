/* eslint-disable import/no-cycle */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import authReducer from './auth-slice'
import kumaReducer from './kuma-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    kuma: kumaReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
