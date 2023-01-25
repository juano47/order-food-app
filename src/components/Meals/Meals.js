import styles from './Meals.module.css'
import DUMMY_MEALS from '../../dummy-meals'
import Card from '../UI/Card'
import MealItem from './MealItem'

const Meals = () => {
  return (
    <section className={styles.meals}>
      <Card>
        {DUMMY_MEALS.map((meal) => (
          <MealItem item={meal} key={meal.id} />
        ))}
      </Card>
    </section>
  )
}

export default Meals
