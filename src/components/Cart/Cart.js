import styles from './Cart.module.css'
import CartItem from './CartItem'
import Modal from '../UI/Modal'
import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false)
  const [order, setOrder] = useState({})
  const ctx = useContext(CartContext)
  const items = ctx.items
  const totalAmount = `$${Math.abs(ctx.totalAmount.toFixed(2))}`

  const meals = items.map((item) => (
    <CartItem meal={item.meal} key={item.meal.id} amount={item.amount} />
  ))

  const confirmOrderHandler = () => {
    const order = {
      meals: items.map((item) => ({
        id: item.meal.id,
        name: item.meal.name,
        amount: item.amount,
        price: item.meal.price,
      })),
      totalAmount: totalAmount,
      date: new Date(),
    }
    setOrder(order)
    setIsCheckout(true)
  }

  const actions = (
    <div className={styles.actions}>
      <button className={styles['button--alt']} onClick={props.onHideCart}>
        Close
      </button>
      <button className={styles.button} onClick={confirmOrderHandler}>
        Order
      </button>
    </div>
  )

  return (
    <Modal>
      <h2>Your Shopping Cart</h2>
      <ul className={styles['cart-items']}>{meals}</ul>
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {!isCheckout && actions}
      {isCheckout && <Checkout onCancel={props.onHideCart} order={order} />}
    </Modal>
  )
}

export default Cart
