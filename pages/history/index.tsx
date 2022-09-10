import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../../components/footer'
import Header from '../../components/header'
import styles from '../../styles/History.module.css'

const History: NextPage = () => {
  return (
    <div className={styles.container} suppressHydrationWarning={true}>
      <style>{`
        body {
          font-family: "Droid Sans", arial, verdana, sans-serif;
          font-weight: 700;
          color: #ff6;
          background: #000;
        }
      `}</style>
      <Head>
        <title>History</title>
        <meta name="description" content="History kuma world" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className={styles.main}>

      <div className={styles.playerContainer}>
        <div>
          <object width="420" height="315">
            <param name="movie" value="https://www.youtube.com/v/EjMNNpIksaI?version=3&amp;hl=en_US&autoplay=1&amp;autohide=2"></param>
            <param name="allowFullScreen" value="true"></param>
            <param name="allowscriptaccess" value="always"></param>
            <embed src="https://www.youtube.com/v/EjMNNpIksaI?version=3&amp;hl=en_US&autoplay=1&amp;autohide=2" type="application/x-shockwave-flash" width="420" height="315"></embed>
          </object>
        </div>
      </div>

      <p id={styles.start}>A short time ago in a block chain very, very close&hellip;</p>

      <h1 className={styles.h1}>KUMA WARS<sub>Free mint</sub></h1>

      <div id={styles.titles}>
        <div id={styles.titlecontent}>

          <p className={styles.center}>EPISODE IV<br />
            A NEW HOPE FOR KUMAS</p>

          <p>It is a period of Kuma war.</p>

          <p>Kuma world its a interactive NFT collection. Kumas goal is to bring a new experience to the nft space.</p>

          <p>In total there are 5555 different types of kumas with 17 different interactions.</p>

          <p>Kunas are not just JPEGS or GIFS, kumas are pure html/css/js, practically nothing is an image.</p>

          <p>The idea to create the kumas started when the founder of kuma was studying more about CSS animations, and about NFTs collections, it was then that he realized that a collection could be created that was not just a static thing, it was possible to create NFTs that react the user interaction</p>

          <p>How does it work ? it is quite simple to be honest, opensea provides an animation_url property, where it is possible for the developer to put a link to any web file, eg html, to be rotated on the NFT item page, and this link will be opened in a iframe, which is an html element that allows you to embed another web page (html) in the current page</p>

          <p>The kumas will use the money from royalties and sales to create new creative forms of NFTs collections, we have more ideas for new interactive collections.</p>

          <p className={styles.center}>Buy Kuma, Luke!</p>
        
          <p>Sorry. Could not resist it.</p>
        
          <p>You are welcome to mint one free. but run because it is a limited number for free</p>
      </div>
      </div>
      </main>

      <Footer />
    </div>
  )
}

export default History
