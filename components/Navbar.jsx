import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import Link from 'next/link'

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src='/images/telephone.png' alt='' width='32' height='32' />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 678</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href='/'>
            <li className={styles.listItem}>Home</li>
          </Link>
          <a href='product/21'>
            <li className={styles.listItem}>Products</li>
          </a>
          <Link href='/#Menu'>
            <li className={styles.listItem}>Menu</li>
          </Link>
          <Image src='/images/logo.png' alt='logo' width='160' height='96' />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href='/cart'>
        <div className={styles.item}>
          <div className={styles.cart}>
            <Image src='/images/cart.png' alt='logo' width='31' height='30' />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default Navbar
