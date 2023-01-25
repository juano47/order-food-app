import styles from './MealItem.module.css'
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {
  const meal = props.item
  return (
    <li className={styles.meal}>
      <div>
        <h3>{meal.name}</h3>
        <div className={styles.description}>{meal.description}</div>
        <div className={styles.price}>{meal.price}</div>
      </div>
      <div>
        <MealItemForm id={meal.id}/>
      </div>
    </li>
  )
}

export default MealItem
