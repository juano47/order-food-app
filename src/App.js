import { useState } from 'react'
import Header from './components/Layout/Header/Header'
import Meals from './components/Meals/Meals'
import Cart from './components/Cart/Cart'
import CartContextProvider from './store/cart-contextProvider'

function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Meals />
    </CartContextProvider>
  )
}

export default App
