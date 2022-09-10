/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export type AuthState = {
  account: string
  isCorrectNetwork: boolean
}

const initialState: AuthState = {
  account: '',
  isCorrectNetwork: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccount: (state, { payload }) => {
      state.account = payload
    },
    setIsCorrectNetwork: (state, { payload }) => {
      state.isCorrectNetwork = payload
    },
  },
})

export const { setAccount, setIsCorrectNetwork } = authSlice.actions

export const selectAuth = (state: RootState): AuthState =>
  state.auth

export default authSlice.reducer
