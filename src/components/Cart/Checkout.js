import styles from './Checkout.module.css'
import { useContext, useRef, useState } from 'react'
import CartContext from '../../store/cart-context'

const isEmpty = (value) => value.trim() === ''
const isFiveChars = (value) => value.trim().length === 5

const Checkout = (props) => {
  useContext(CartContext)
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  })

  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const postalCodeInputRef = useRef()
  const cityInputRef = useRef()

  const onSubmitHandler = (event) => {
    event.preventDefault()

    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredPostalCode = postalCodeInputRef.current.value
    const enteredCity = cityInputRef.current.value

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode)
    const enteredCityIsValid = !isEmpty(enteredCity)

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      postalCode: enteredPostalCodeIsValid,
      city: enteredCityIsValid,
    })

    if(!enteredNameIsValid || !enteredStreetIsValid || !enteredPostalCodeIsValid || !enteredCityIsValid)  {
      return
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    })
  }

  const nameInputClasses = `${styles.control} ${
    formInputsValidity.name ? '' : styles.invalid
  }`
  const streetInputClasses = `${styles.control} ${
    formInputsValidity.street ? '' : styles.invalid
  }`
  const postalCodeInputClasses = `${styles.control} ${
    formInputsValidity.postalCode ? '' : styles.invalid
  }`
  const cityInputClasses = `${styles.control} ${
    formInputsValidity.city ? '' : styles.invalid
  }`

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <h3>Enter your contact data:</h3>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  )
}

export default Checkout
