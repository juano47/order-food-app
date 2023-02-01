import styles from "./CartItem.module.css";
import {useContext} from "react";
import CartContext from "../../store/cart-context";

const CartItem = props => {
    const ctx = useContext(CartContext);
    const meal = props.meal;
    const decreaseAmountHandler = () => {
        ctx.removeOneItem(meal.id);
    }

    const increaseAmountHandler = () => {
        const updatedItem = {
            meal: props.meal,
            amount: props.amount + 1
        }

        ctx.addItem(updatedItem);
    }

    return (
          <li className={styles["cart-item"]}>
            <div>
                <h2>{meal.name}</h2>
                <div className={styles.summary}>
                    <span className={styles.price}>{`$${meal.price}`}</span>
                    <span className={styles.amount}>x {props.amount}</span>
                </div>
            </div>
            <div className={styles.actions}>
                <button onClick={decreaseAmountHandler}>−</button>
                <button onClick={increaseAmountHandler}>+</button>
            </div>
        </li>
    );
}

export default CartItem;