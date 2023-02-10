import styles from './Cart.module.css'
import CartItem from './CartItem'
import Modal from '../UI/Modal'
import { useContext, useState } from 'react'
import CartContext from '../../store/cart-context'
import Checkout from './Checkout'
import useHttp from '../../hooks/use-http'

const BASE_URL =
  'https://orderfoodappreact-default-rtdb.europe-west1.firebasedatabase.app/orders.json'

const Cart = (props) => {
  const { error, sendRequest: sendOrder } = useHttp()
  const [isCheckout, setIsCheckout] = useState(false)
  const ctx = useContext(CartContext)
  const items = ctx.items
  const totalAmount = `$${Math.abs(ctx.totalAmount.toFixed(2))}`

  const meals = items.map((item) => (
    <CartItem meal={item.meal} key={item.meal.id} amount={item.amount} />
  ))

  const confirmOrderHandler = () => {
    if (ctx.items.length === 0) {
        alert('Your cart is empty. Please add some items to your cart.');
        return;
    }
    setIsCheckout(true)
  }

  const onSendOrderHandler = (userData) => {
    if (ctx.items.length === 0) {
      alert('Your cart is empty. Please add some items to your cart.');
      return;
    }
    const order = {
      name: userData.name,
      street: userData.street,
      postalCode: userData.postalCode,
      city: userData.city,
      items: items,
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
    })

    if (error !== null) {
      //show alert
      alert('Error sending order, sorry!')
    } else {
      ctx.clearCart()
      alert('Order sent successfully!')
      //close modal
      props.onHideCart()
    }
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
      {isCheckout && (
        <Checkout
          onConfirm={onSendOrderHandler}
          onCancel={props.onHideCart}
        />
      )}
    </Modal>
  )
}

export default Cart
