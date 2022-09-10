/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

export type KumaState = {
  texts: string[]
  isAdopting: boolean
  soldOut: boolean
}

const initialState: KumaState = {
  texts: ['Welcome to the Kuma world', 'Connect wallet and adopt a kuma'],
  isAdopting: false,
  soldOut: false,
}

export const kumaSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTexts: (state, { payload }) => {
      state.texts = payload
    },
    setIsAdopting: (state, { payload }) => {
      state.isAdopting = payload
    },
    setSoldOut: (state, { payload }) => {
      state.soldOut = payload
    },
  },
})

export const {  setTexts, setIsAdopting, setSoldOut } = kumaSlice.actions

export const selectKuma = (state: RootState): KumaState =>
  state.kuma

export default kumaSlice.reducer
