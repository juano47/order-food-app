import styles from './Meals.module.css'
import Card from '../UI/Card'
import MealItem from './MealItem'
import useHttp from '../../hooks/use-http'
import { useEffect, useState } from 'react'

const BASE_URL =
  'https://orderfoodappreact-default-rtdb.europe-west1.firebasedatabase.app/meals.json'

const Meals = () => {
  const [meals, setMeals] = useState([])
  const { isLoading, error, sendRequest: getMeals } = useHttp()

  useEffect(() => {
    const transformMeals = (meals) => {
      const loadedMeals = []
      for (const key in meals) {
        loadedMeals.push({
          id: key,
          name: meals[key].name,
          description: meals[key].description,
          price: meals[key].price,
        })
      }
      setMeals(loadedMeals)
    }

    getMeals({ url: BASE_URL }, transformMeals)
  }, [getMeals])

  return (
    <section className={styles.meals}>
      <Card>
        {isLoading && <p>Loading...</p>}
        {error && <p>{error}</p>}
        {meals.map((meal) => (
            <MealItem item={meal} key={meal.id} />
        ))}
      </Card>
    </section>
  )
}

export default Meals
