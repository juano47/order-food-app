import { Fragment, useContext } from 'react'
import styles from './Header.module.css'
import mainImage from '../../../assets/images/meal.jpg'
import HeaderCartButton from '../../Cart/HeaderCartButton'
import MealSummary from './MealSummary'
import CartContext from '../../../store/cart-context'

const Header = (props) => {
  const ctx = useContext(CartContext)
  const onClickHandler = () => {
    if (ctx.items.length === 0) {
      alert('Your cart is empty. Please add some items to your cart.')
      return
    }
    props.onShowCart()
  }

  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={onClickHandler} />
      </header>
      <div className={styles['main-image']}>
        <img src={mainImage} />
      </div>
      <MealSummary />
    </Fragment>
  )
}
export default Header
