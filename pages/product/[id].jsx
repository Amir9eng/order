import Image from 'next/image'
import styles from '../../styles/Product.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { addProduct } from '../../redux/cartSlice'
const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0])
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [extras, setExtras] = useState([])
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, extras, price, quantity }))
  }

  const changePrice = number => {
    setPrice(price + number)
  }

  const handleSize = sizeIndex => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked
    if (checked) {
      changePrice(option.price)
      setExtras(prev => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter(extra => extra._id !== option._id))
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image alt='' src={pizza.img} layout='fill' objectFit='contain' />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose your size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => handleSize(0)}>
            <Image src='/images/size.png' layout='fill' alt='' />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(1)}>
            <Image src='/images/size.png' layout='fill' alt='' />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => handleSize(2)}>
            <Image src='/images/size.png' layout='fill' alt='' />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose Additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map(option => (
            <div className={styles.option} key={option._id}>
              <input
                type='checkbox'
                name={option.text}
                id={option.text}
                onChange={e => handleChange(e, option)}
                className={styles.checkbox}
              />
              <label htmlFor='double'>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type='number'
            onChange={e => setQuantity(e.target.value)}
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Product

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/products/${params.id}`)
  return {
    props: {
      pizza: res.data
    }
  }
}
