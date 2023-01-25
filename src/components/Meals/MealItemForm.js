import styles from './MealItemForm.module.css'
import Input from '../UI/Input'

const MealItemForm = (props) => {
  return (
    <form className={styles.form}>
      <Input
        label={`amount_${props.id}`}
        input={{
          id: 'amount',
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
        }}
      />
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm
