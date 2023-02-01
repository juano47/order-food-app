import styles from './HeaderCartButton.module.css'
import CartIcon from './CartIcon'
import CartContext from '../../store/cart-context'
import { useContext } from 'react'

function HeaderCartButton(props) {
  const ctx = useContext(CartContext)
  const numberOfCartItems = ctx.items.length

  return (
    <button className={styles.button} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
