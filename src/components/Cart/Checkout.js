import styles from './Checkout.module.css'
import useHttp from "../../hooks/use-http";
import {useContext} from "react";
import CartContext from "../../store/cart-context";
import {useRef} from "react";

const BASE_URL =
    'https://orderfoodappreact-default-rtdb.europe-west1.firebasedatabase.app/orders.json'

const Checkout = (props) => {
    const ctx = useContext(CartContext);
    const { error, sendRequest: sendOrder } = useHttp();

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    const sendOrderHandler = (event) => {
        event.preventDefault();

        sendOrder({
            url: BASE_URL,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: props.order,
        });

        if (error !== null) {
            //show alert
            alert('Error sending order, sorry!');
        } else {
            ctx.clearCart()
            alert('Order sent successfully!');
            //close modal
            props.onHideCart()
        }
    }

    return (
        <form className={styles.form} onSubmit={sendOrderHandler}>
            <h3>Enter your contact data:</h3>
            <div className={styles.control}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
            </div>
            <div className={styles.control}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
            </div>
            <div className={styles.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
            </div>
            <div className={styles.control}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef}/>
            </div>
            <div className={styles.actions}>
                <button type='button' onClick={props.onCancel}>Cancel</button>
                <button className={styles.submit}>Confirm</button>
            </div>
        </form>
        );
}

export default Checkout
