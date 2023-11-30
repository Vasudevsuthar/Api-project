import CartContext from "./Cartcontext";
import React, { useState, useEffect } from "react";
import axios from "axios";

const CartContextProvider = (props) => {

  const [items, setItems] = useState([]);
  console.log(items);

  const addToCart = async (product) => {
    try {
      const updatedItemsArray = [...items];
      console.log(items);
      const existingItemIndex = updatedItemsArray.findIndex(
        (existingItem) => existingItem.title === product.title
    );

      if (existingItemIndex !== -1) {
        updatedItemsArray[existingItemIndex].quantity += Number(
          product.quantity
        );
        try {
          const itemIdToUpdate = updatedItemsArray[existingItemIndex]._id; 
          const updatedItem = {
            title: product.title,
            price: product.price,
            quantity: updatedItemsArray[existingItemIndex].quantity, 
          };
          await axios.put(
            `https://crudcrud.com/api/be469d30d1a045dbb0c171797d63dab9/cart/${itemIdToUpdate}`,
            updatedItem
          );
          fetchCartData();
        } catch (error) {
          console.error("Error updating item:", error);
        }
      } else {
        const response = await fetch(
          `https://crudcrud.com/api/be469d30d1a045dbb0c171797d63dab9/cart`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(product),
          }
        );
        if (!response.ok) {
          throw new Error("Failed to add product to cart.");
        }
        fetchCartData();
      }
      await fetchCartData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCartData = async () => {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/be469d30d1a045dbb0c171797d63dab9/cart`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cart data.");
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  const removeToCart = async (item) => {
    try {
      const updatedItemsArray = [...items];
      const existingItemIndex = updatedItemsArray.findIndex(
        (existingItem) => existingItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        if (updatedItemsArray[existingItemIndex].quantity > 1) {
          updatedItemsArray[existingItemIndex].quantity -= 1;

          const itemIdToUpdate = updatedItemsArray[existingItemIndex]._id;
          const updatedItem = {
            title: item.title,
            price: item.price,
            quantity: updatedItemsArray[existingItemIndex].quantity,
          };
          await axios.put(
            `https://crudcrud.com/api/be469d30d1a045dbb0c171797d63dab9/cart/${itemIdToUpdate}`,
            updatedItem
          );

          fetchCartData();
        } else {
          const response = await fetch(
            `https://crudcrud.com/api/be469d30d1a045dbb0c171797d63dab9/cart/${item._id}`,
            {
              method: "DELETE",
            }
          );
          if (!response.ok) {
            throw new Error("Failed to remove item from the cart.");
          }
          fetchCartData();
        }
      }
    } catch (error) {
      console.error(error);
    }
  };


  
  const CartContextValue = {
    items: items,
    addToCart: addToCart,
    removeItem: removeToCart,
    
  };
  return (
    <CartContext.Provider value={CartContextValue}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
