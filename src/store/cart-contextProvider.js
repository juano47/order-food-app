import {useReducer} from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartAction = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
}

const cartReducer = (state, action) => {
    const updatedItems = [...state.items]
    let updatedTotalAmount = state.totalAmount

    switch (action.type) {
        case cartAction.ADD:
            const newMeal = action.item.meal
            const newAmount = action.item.amount
            let prevAmount = 0
            const updatedItemIndex = updatedItems.findIndex(
                (item) => item.meal.id === newMeal.id
            )
            if (updatedItemIndex >= 0) {
                prevAmount = updatedItems[updatedItemIndex].amount
                updatedItems[updatedItemIndex] = action.item
            } else {
                updatedItems.push(action.item)
            }
            updatedTotalAmount += newMeal.price * (newAmount - prevAmount)

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            }
        case cartAction.REMOVE:
            const itemIndex = updatedItems.findIndex(
                (item) => item.meal.id === action.id
            )
            let updatedItem = updatedItems[itemIndex]
            const updateAmount = updatedItem.amount - 1
            if (updateAmount === 0) {
                updatedItems.splice(itemIndex, 1)
            } else {
                updatedItem = {
                    ...updatedItem,
                    amount: updateAmount,
                }
                updatedItems[itemIndex] = updatedItem
            }
            updatedTotalAmount -= updatedItem.meal.price
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            }
        default:
            return defaultCartState
    }
}

const CartContextProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(
        cartReducer,
        defaultCartState
    )
    const addItemToCartHandler = (item) => {
        dispatchCartAction({ type: cartAction.ADD, item: item })
    }

    const removeOneItemCartHandler = (id) => {
        dispatchCartAction({ type: cartAction.REMOVE, id: id })
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeOneItem: removeOneItemCartHandler,
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContextProvider