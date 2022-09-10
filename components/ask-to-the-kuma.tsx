
import {  useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import { selectKuma, setTexts } from '../stores/kuma-slice'
import { selectAuth } from '../stores/auth-slice';
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, ListItemText, Typography } from '@mui/material';
import { ethers } from 'ethers';
import { CONTRACT_ADDRESS } from '../utils/constants';
import KumaWorld from '../utils/KumaWorld.json'

import styles from '../styles/AskToTheKuma.module.css'

const AskToTheKuma = () => {
  const dispatch = useAppDispatch()
  const { texts } = useAppSelector(selectKuma)
  const [question, setQuestion] = useState('')
  const { account } = useAppSelector(selectAuth)

  useEffect(() => {
    const getTotalSupply = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer);
      
      let count = await connectedContract.MAX_KUMAS();

      dispatch(setTexts([`There are a total of ${parseInt(count._hex, 16)} Kumas`]))
    }
    
    const getPrice = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer);
      
      let count = await connectedContract.PRICE()

      dispatch(setTexts([`The price of each kuma after taking the free one is ${ethers.utils.formatEther(count)} ethers`]))
    }
    const getQtyFreeMint = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer);
      
      let count = await connectedContract.MAX_FREE_PER_WALLET()

      dispatch(setTexts([`It is ${parseInt(count._hex, 16)} kumas for free per wallet`]))
    }
    const getPerWallet = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer);
      
      let count = await connectedContract.MAX_KUMAS_PER_WALLET()

      dispatch(setTexts([`It is ${parseInt(count._hex, 16)} kumas per wallet`]))
    }
    const getTotalMinted = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer);
      
      let minted = await connectedContract.totalSupply()
      let total = await connectedContract.MAX_KUMAS();

      dispatch(setTexts([`Has already been adopted ${parseInt(minted._hex, 16)}/${parseInt(total._hex, 16)} kumas` ]))
    }
    const getHasStillFree = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer);
      
      let freeKumas = await connectedContract.MAX_FREE_KUMAS_SUPPLY()
      let minted = await connectedContract.totalSupply()

      const stillHasFree = parseInt(minted._hex, 16) < parseInt(freeKumas._hex, 16)
      let texts = ['No more free kumas']

      if (stillHasFree) {
        texts = [`Still have ${parseInt(freeKumas._hex, 16) - parseInt(minted._hex, 16)} more free kumas to be adopted`] 
      }

      dispatch(setTexts(texts))
    }

    if (question === '') {
      return
    }

    if (!window.ethereum || account === '') {
      dispatch(setTexts(['Kuma needs you to be logged in to answer his question']))
      return
    }

    if (question === 'totalSupply') {
      getTotalSupply()
    }
    if (question === 'price') {
      getPrice()
    }
    if (question === 'maxFreeMint') {
      getQtyFreeMint()
    }
    if (question === 'maxPerWallet') {
      getPerWallet()
    }
    if (question === 'qtyMinted') {
      getTotalMinted()
    }
    if (question === 'freeMints') {
      getHasStillFree()
    }
  }, [question])

  const questions = [
    {
      label: 'Total supply ?',
      value: 'totalSupply'
    },
    {
      label: 'Qty minted ?',
      value: 'qtyMinted'
    },
    {
      label: 'Price after a free ?',
      value: 'price'
    },
    {
      label: 'Max per wallet ?',
      value: 'maxPerWallet'
    },
    {
      label: 'Max free mint per wallet ?',
      value: 'maxFreeMint'
    },
    {
      label: 'Still have free kumas ?',
      value: 'freeMints'
    },
  ]

  return (
    <div className={`${styles.ballon} ${styles.visible}`}>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="ask-to-the-kuma">Question</InputLabel>
        <Select
          labelId="ask-to-the-kuma"
          id="ask-to-the-kuma-select"
          value={question}
          onChange={(e) => {
            setQuestion(e.target.value)
          }}
          input={<OutlinedInput label="Tag" />}
        >
          {questions.map((question) => (
            <MenuItem key={question.value} value={question.value}>
              <Typography>{question.label}</Typography>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}

export default AskToTheKuma
