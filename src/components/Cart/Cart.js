import styles from './Cart.module.css'
import CartItem from './CartItem'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'

const Cart = (props) => {
  const ctx = useContext(CartContext)
  const items = ctx.items
  const totalAmount = `$${Math.abs(ctx.totalAmount.toFixed(2))}`

    const meals = items.map((item) => (
        <CartItem
            meal={item.meal}
            key={item.meal.id}
            amount={item.amount}

        />
    ))
  return (
    <Modal>
      <h2>Your Shopping Cart</h2>
      <ul className={styles['cart-items']}>{meals}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onHideCart}>
          Close
        </button>
        <button className={styles.button}>Order</button>
      </div>
    </Modal>
  )
}

export default Cart
