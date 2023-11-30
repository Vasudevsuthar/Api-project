import { useContext, useEffect, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../store/Cartcontext";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const cartItem = cartCtx.items;

  
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (item) => {
    cartCtx.removeItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.title}
          price={item.price}
          qty={item.quantity}
          item={item}
          onRemove={(item) => cartItemRemoveHandler(item)}
          
        />
      ))}
    </ul>
  );

  const [total, setTotal] = useState(0);
  useEffect(() => {
    let newTotal = 0;
    cartItem.forEach((item) => {
      newTotal += item.quantity * item.price;
    });
    setTotal(newTotal);
  },[cartItem]);


  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹ {total}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
