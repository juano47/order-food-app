import styles from './Cart.module.css'
import CartItem from './CartItem'
import Modal from '../UI/Modal'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import useHttp from '../../hooks/use-http'

const BASE_URL =
  'https://orderfoodappreact-default-rtdb.europe-west1.firebasedatabase.app/orders.json'

const Cart = (props) => {
  const ctx = useContext(CartContext)
  const items = ctx.items
  const totalAmount = `$${Math.abs(ctx.totalAmount.toFixed(2))}`

  const { error, sendRequest: sendOrder } = useHttp()

  const meals = items.map((item) => (
    <CartItem meal={item.meal} key={item.meal.id} amount={item.amount} />
  ))

  const sendOrderHandler = () => {
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

    sendOrder({
      url: BASE_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: order,
    });

    if (error !== null) {
      //show alert
      alert('Error sending order, sorry!');
    } else {
      ctx.clearCart()
      alert('Order sent successfully!');
      //close modal
      props.onHideCart()
    }
  }

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
        <button className={styles.button} onClick={sendOrderHandler}>
          Order
        </button>
      </div>
    </Modal>
  )
}

export default Cart
