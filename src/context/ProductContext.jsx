import React, { createContext, useReducer, useEffect } from "react";

export const ProductContext = createContext();

const initialState = {
  products: [],
  cart: [],
  orderHistory: []
};

const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "ADD_TO_CART":
      // Check if the product is already in the cart
      const existingProductIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingProductIndex !== -1) {
        // If the product is in the cart, update the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += 1;
        return { ...state, cart: updatedCart };
      } else {
        // If the product is not in the cart, add it
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }]
        };
      }
    case "REMOVE_FROM_CART":
      const updatedCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      return { ...state, cart: updatedCart };
    case "INCREMENT_QUANTITY":
      const updatedCartInc = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      return { ...state, cart: updatedCartInc };

    case "DECREMENT_QUANTITY":
      const updatedCartDec = state.cart.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      return { ...state, cart: updatedCartDec };
    case "ORDER":
      // Handle the 'ORDER' action with the product payload
      const orderedProduct = action.payload;

      const updatedCarts = state.cart.filter(
        (item) => item.id !== orderedProduct.id
      );

      return {
        ...state,
        orderHistory: [...state.orderHistory, [orderedProduct]], // Wrap orderedProduct in an array to represent an order
        cart: updatedCarts // Remove the ordered product from the cart
      };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
