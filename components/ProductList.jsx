import styles from '../styles/ProductList.module.css'
import Image from 'next/image'
import ProductCard from './ProductCard'

const ProductList = ({ pizzalist }) => {
  return (
    <div id='Menu' className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>
      <div className={styles.wrapper}>
        {pizzalist.map(pizza => (
          <ProductCard key={pizza._id} pizza={pizza} />
        ))}
      </div>
    </div>
  )
}

export default ProductList
