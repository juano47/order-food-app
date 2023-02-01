import styles from './HeaderCartButton.module.css'
import CartIcon from './CartIcon'
import CartContext from '../../store/cart-context'
import { useContext, useEffect, useState } from 'react'

function HeaderCartButton(props) {
  const ctx = useContext(CartContext)
  const numberOfCartItems = ctx.items.length

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)

  useEffect(() => {
    if (numberOfCartItems === 0) {
      return
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [ctx.items])

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton
