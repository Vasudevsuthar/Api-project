import { useState } from "react";

import Header from "./component/Header";
import Cart from "./component/cart/Cart";
import CartContextProvider from "./component/store/CartProvider";

function App() {
  const [cartIsShow, setcartIsShow] = useState(false);

  const showCartHandler = () => {
    setcartIsShow(true);
  }

  const hideCartHandler = () => {
    setcartIsShow(false);
  }

  return (
    <CartContextProvider>
      {cartIsShow && <Cart onClose={hideCartHandler} />}
      <div className="App">
        <Header onShowCart={showCartHandler}/>
      </div>
    </CartContextProvider>
  );
}

export default App;
