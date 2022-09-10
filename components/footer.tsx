
import Image from 'next/image'
import styles from '../styles/Footer.module.css'

const Footer = (): JSX.Element => {
  return (
    <footer className={styles.footer}>
      <span>
        Powered by{' '}
        <span className={styles.logo}>
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
      </span>
    </footer>
  )
}

export default Footer
