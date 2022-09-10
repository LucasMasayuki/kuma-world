import type { NextPage } from 'next'
import Head from 'next/head'
import AskToTheKuma from '../components/ask-to-the-kuma'
import Footer from '../components/footer'
import Header from '../components/header'
import Kuma from '../components/kuma'
import MintSection from '../components/mint-section'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kuma World</title>
        <meta name="description" content="Mint page kuma world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>
        <Kuma />
        <MintSection />
      </main>

      <AskToTheKuma />
      <Footer />
    </div>
  )
}

export default Home
