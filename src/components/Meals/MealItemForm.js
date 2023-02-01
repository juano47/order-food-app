import styles from './MealItemForm.module.css'
import Input from '../UI/Input'
import { useContext, useRef } from 'react'
import CartContext from '../../store/cart-context'

const MealItemForm = (props) => {
  const ctx = useContext(CartContext)
  const amountInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    //always is a string even if you set the type to number in the input
    const enteredAmount = amountInputRef.current.value
    ctx.addItem({
      meal: props.meal,
      amount: Number(enteredAmount),
    })
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: `amount_${props.meal.id}`,
          type: 'number',
          min: '1',
          max: '5',
          step: '1',
        }}
      />
      <button type="submit">+ Add</button>
    </form>
  )
}

export default MealItemForm
