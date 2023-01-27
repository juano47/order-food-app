import { Fragment } from 'react'
import styles from './Header.module.css'
import mainImage from '../../../assets/images/meal.jpg'
import HeaderCartButton from '../../Cart/HeaderCartButton'
import MealSummary from './MealSummary'

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCart}/>
      </header>
      <div className={styles['main-image']}>
        <img src={mainImage} />
      </div>
      <MealSummary />
    </Fragment>
  )
}
export default Header
