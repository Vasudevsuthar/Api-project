import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import HeaderCartButton from "./HeaderCartButton";
import CartContext from "./store/Cartcontext";

const Header = (props) => {
  const [candyData, setcandyData] = useState({
    name: "",
    description: "",
    price: 0,
  });

  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("candyItems")) || [];
    setItems(storedItems);
  }, []);

  const addItemHandler = () => {
    const existingItems = JSON.parse(localStorage.getItem("candyItems")) || [];
    const updatedItems = [...existingItems, candyData];
    localStorage.setItem("candyItems", JSON.stringify(updatedItems));

    setcandyData({
      name: "",
      description: "",
      price: 0,
    });

    setItems(updatedItems);
  };

  const inputChangeHandler = (event) => {
    const { id, value } = event.target;
    setcandyData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };


  const ctx = useContext(CartContext);

  const addToCartHandler = (index, quantity) => {
    const selectedItem = items[index];

      const updatedItems = [...items];
      updatedItems[index] = selectedItem;
      localStorage.setItem("candyItems", JSON.stringify(updatedItems));
      setItems(updatedItems);

    const apiItem = {
      title: selectedItem.name,
      price: selectedItem.price,
      quantity: Number(quantity),
    };
    ctx.addToCart(apiItem);
 
};

  return (
    <div className="itemContainer">
      <Table>
        <thead>
          <tr>
            <th>Candy Name</th>
            <th>Description</th>
            <th>Price</th>
            <td>
            <HeaderCartButton onClick={props.onShowCart} />
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                id="name"
                value={candyData.name}
                onChange={inputChangeHandler}
                required
              />
            </td>
            <td>
              <input
                type="text"
                id="description"
                value={candyData.description}
                onChange={inputChangeHandler}
                required
              />
            </td>
            <td>
              <input
                type="number"
                id="price"
                value={candyData.price}
                onChange={inputChangeHandler}
                required
              />
            </td>
            <td>
              <Button onClick={addItemHandler}>Add Item</Button>
            </td>
          </tr>
        </tbody>
      </Table>
      <div>
        <h2>Added Items</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              NAME -
              {`${item.name} DES-${item.description} PRICE-${item.price}`}
              <Button
                variant="light"
                size="sm"
                onClick={() => addToCartHandler(index, 1)}
              >
                BUY 1
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={() => addToCartHandler(index, 2)}
              >
                BUY 2
              </Button>
              <Button
                variant="light"
                size="sm"
                onClick={() => addToCartHandler(index, 3)}
              >
                BUY 3
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Header;
