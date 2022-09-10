
import { useEffect, useState } from 'react'
import { useAppSelector, useAppDispatch } from '../stores/hooks'
import { selectKuma, setTexts, setSoldOut } from '../stores/kuma-slice'
import styles from '../styles/Kuma.module.css'
import Typewriter from 'typewriter-effect';
import { CONTRACT_ADDRESS } from '../utils/constants'
import KumaWorld from '../utils/KumaWorld.json'
import { ethers } from 'ethers'

const Kuma = () => {
  const dispatch = useAppDispatch()
  const { texts } = useAppSelector(selectKuma)
  const [ballonVisible, setBallonVisible] = useState(false)
  const [index, setIndex] = useState(0)
  const [check, setCheck] = useState(0)
  
  useEffect(() => {
      const watchSupplyFunction = async () => {
        const { ethereum } = window;
    
        if (!ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner()
          const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, KumaWorld.abi, signer)
          let minted = await connectedContract.totalSupply()
          let maxKumas = await connectedContract.MAX_KUMAS()
    
          if (minted === maxKumas) {
            dispatch(setSoldOut(true))
            dispatch(setTexts(['Sold out, buy kumas in opensea']))
          }
        }
      }

      const id = setInterval(async () => {
          await watchSupplyFunction()
          setCheck(check + 1)
      }, 3000);

      return () => clearInterval(id);
  }, [check])

  useEffect(() => {
    setIndex(index)
  }, [texts])

  return (
    <div className={styles.container}>
      <div className={`${styles.ballon} ${styles.visible}`}>
        <Typewriter
          options={{
            strings: texts,
            autoStart: true,
            loop: true,
          }}
        />
      </div>
      <div className={styles.bear}>
          <div className={styles.bear__ears}>
            <div className={`${styles.bear__ears__left} ${styles.ear}`}></div>
            <div className={`${styles.bear__ears__right} ${styles.ear}`}></div>
          </div>
          <div className={styles.bear__body}>
            <div className={styles.bear__eyes}>
                <div className={`${styles.bear__eyes__left} ${styles.eye}`}></div>
                <div className={`${styles.bear__eyes__right} ${styles.eye}`}></div>
            </div>
            <div className={styles.bear__nose}>
                <div className={styles.bear__nose__inner}></div>
            </div>
          </div>
      </div>
      <div className={styles.shadow}></div>
    </div>
  )
}

export default Kuma
