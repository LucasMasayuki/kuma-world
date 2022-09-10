
import { Grid, IconButton, OutlinedInput, TextField } from '@mui/material'
import { FaMinus, FaPaw, FaPlus } from 'react-icons/fa'
import LoadingButton from '@mui/lab/LoadingButton';
import styles from '../styles/MintSection.module.css'
import { useState } from 'react';
import { selectAuth } from '../stores/auth-slice';
import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { ethers } from 'ethers';
import KumaWorld from '../utils/KumaWorld.json'
import { selectKuma, setIsAdopting, setTexts } from '../stores/kuma-slice';
import { CONTRACT_ADDRESS } from '../utils/constants';

const MintSection = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { account } = useAppSelector(selectAuth)
  const { isAdopting } = useAppSelector(selectKuma)
  const [qty, setQty] = useState(1)

  const onClickIncrease = () => {
    const increment = qty + 1 
    if (increment > 10) {
      return
    }

    setQty(increment)
  }

  const onClickDecrement = () => {
    const decrement = qty - 1 
    if (decrement < 1) {
      return
    }

    setQty(decrement)
  }

  const onClickMint = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        dispatch(setIsAdopting(true))
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner()
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer)
      
        const price = await connectedContract.PRICE()
        const totalMinted = await connectedContract.totalSupply()
        const freeMints = await connectedContract.MAX_FREE_KUMAS_SUPPLY()

        const qtyFreeMinted = await connectedContract.qtyFreeMinted(account)

        let count = qty
        if (parseInt(totalMinted._hex, 16) < parseInt(freeMints._hex, 16) && parseInt(qtyFreeMinted._hex, 16) <= 0) {
          count = qty - 1
        }

        let mintPrice = count * parseFloat(ethers.utils.formatEther(price))
      
        const nftTxn = await connectedContract.adoptKumas(qty, { value: ethers.utils.parseEther(mintPrice.toString()) })

        dispatch(setTexts(['Adopting bears...', 'Waiting...', 'Generating kumas...']))
        await nftTxn.wait()
        console.log(nftTxn)
        dispatch(setTexts([`Mined, see transaction in you wallet`]))
        dispatch(setIsAdopting(false))
      } else {
        console.log("Ethereum object doesn't exist")
        dispatch(setTexts(['First install Metamask', 'Why are you taking so long ?']))
      }
    } catch (error) {
      dispatch(setTexts(['Error !!!!, try again']))
      console.log(error)
      dispatch(setIsAdopting(false))
    }
  }

  return (
    <div className={styles.mintSection}>
      <Grid className={styles.qtyMint} container textAlign="center" alignItems="center">
        <Grid item xs={4}>
          <IconButton className={styles.actionIcon} onClick={onClickDecrement} sx={{
            background: 'white',
            fontWeight: 'bold',
            "&:hover": {
              backgroundColor: 'lightgray',
            }
          }}>
            <FaMinus />
          </IconButton>
        </Grid>
        <Grid item xs={4}>
          <TextField className={styles.input} value={qty} disabled/>
        </Grid>
        <Grid item xs={4}>
          <IconButton className={styles.actionIcon} onClick={onClickIncrease} sx={{
            background: 'white',
            fontWeight: 'bold',
            "&:hover": {
              backgroundColor: 'lightgray',
            }
          }}>
            <FaPlus />
          </IconButton>
        </Grid>
      </Grid>
      <Grid container alignItems="center" textAlign="center">
        <Grid item xs={3} />
        <Grid item xs={6}>
          <LoadingButton
           sx={{
            fontWeight: 'bold',
            borderRadius: '100px',
            backgroundColor: 'tomato',
            "&:hover": {
              backgroundColor: '#af321c',
            }
           }}
           loading={isAdopting}
           className={styles.mintButton}
           color="primary"
           disabled={account.length <= 0}
           variant="contained"
           onClick={onClickMint}
           startIcon={<FaPaw />}>
            {isAdopting ? 'Adopting Kumas' : 'Adopt kuma'}
          </LoadingButton>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  )
}

export default MintSection
