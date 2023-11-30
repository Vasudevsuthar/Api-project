import { useContext } from "react";
import CartContext from "./store/Cartcontext";
import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";



const HeaderCartButton = (props) => {
    const cartCtx = useContext(CartContext);

    const CartItems =  cartCtx.items.reduce((curNumber, item) => {
        return curNumber + item.quantity;
      }, 0);

    return(
        <Button onClick={props.onClick}>
            <span>Your Cart</span>
            <Badge>{CartItems}</Badge>
        </Button>
    );
};

export default HeaderCartButton;