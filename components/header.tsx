
import { Box,  Grid, IconButton } from '@mui/material'
import Link from 'next/link'
import { FaTwitter } from 'react-icons/fa'
import styles from '../styles/Header.module.css'
import AccountButton from './account-button'
import { useRouter } from 'next/router'

const Header = (): JSX.Element => {
  const router = useRouter()

  return (
    <Box width="100%" sx={{ p: "2% 0"  }}>
      <Grid container alignItems="center" justifyItems="center">
        <Grid item xs={2} md={2}>
          <IconButton sx={{ background: 'white', mr: 2 }} onClick={() => {
            window.open('https://twitter.com/TheKumaWorld', '_blank')
          }}>
            <FaTwitter color="#1DA1F2"/>
          </IconButton>
          <IconButton sx={{ background: 'white', mr: 2 }} onClick={() => {
            window.open('https://opensea.io/collection/kuma-world', '_blank')
          }}>
            <img src={'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png'} alt="opensea-logo" height={27} width={27} />
          </IconButton>
          <IconButton sx={{ background: 'white', mr: 2 }} onClick={() => {
            window.open('https://etherscan.io/address/0x1569f5D2114dafbD35D7C756f58510703B04d35d', '_blank')
          }}>
            <img src={'https://etherscan.io/images/brandassets/etherscan-logo-circle.png'} alt="opensea-logo" height={27} width={27} />
          </IconButton>
        </Grid>
        <Grid item xs={0} md={4} sx={{display: { xs: 'none', md: 'block' }}}/>
        <Grid item xs={3} md={2} textAlign="center"  className={`${styles.tab} ${!router.pathname.includes('history') ? styles.active : ''}`}>
          <Link href="/">
            <p className={styles.link}>Mint</p>
          </Link>
        </Grid>
        <Grid item xs={4} md={2} textAlign="center"  className={`${styles.tab} ${router.pathname.includes('history') ? styles.active : ''}`}>
          <Link href="/history" className={styles.link}>
            <p className={styles.link}>History</p>
          </Link>
        </Grid>
        <Grid item xs={3} md={2} textAlign="center">
          <AccountButton />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Header
