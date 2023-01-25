import styles from './Cart.module.css'
import CartItem from './CartItem'
import { Fragment } from 'react'
import Modal from "../UI/Modal";

const Cart = (props) => {
  return (
    <Modal>
      <h2>Your Shopping Cart</h2>
      <ul className={styles['cart-items']}>
        {[
          <CartItem key={1} text={'Sushi'} price={12.99} amount={2} />,
          <CartItem key={2} text={'Sushi'} price={12.99} amount={2} />,
        ]}
      </ul>
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>35.62</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']}>Close</button>
            <button className={styles.button}>Order</button>
        </div>
    </Modal>
  )
}

export default Cart