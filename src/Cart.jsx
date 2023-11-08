// Cart.js
import React, { useContext } from "react";
import { ProductContext } from "./context/ProductContext";
import { NavLink } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { state, dispatch } = useContext(ProductContext);

  const removeFromCart = (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const incrementQuantity = (product) => {
    dispatch({ type: "INCREMENT_QUANTITY", payload: product });
  };

  const decrementQuantity = (product) => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product });
  };

  // Calculate the total price
  const totalPrice = state.cart.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const calculateTotalOrderValue = () => {
    return state.cart.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  const handleOrder = (product) => {
    // Place the order using the context and reducer
    dispatch({ type: "ORDER", payload: product });
    alert("Order has been placed!");
  };

  return (
    <div>
      <div className="cart-nav">
        <NavLink style={{ textDecoration: "none" }} to="/">
          <h2 style={{ color: "white" }}>Shopping Cart</h2>
        </NavLink>

        <p style={{ color: "white" }}>Total Price: ${totalPrice.toFixed(2)}</p>
        <NavLink
          style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
          to="/orders"
        >
          <p className="link-s">Your Orders</p>
        </NavLink>
      </div>
      {state.cart.length === 0 ? (
        <h2 style={{ textAlign: "center", marginTop: "15rem" }}>
          Your Cart is Empty!!
        </h2>
      ) : (
        <div className="cart-main">
          {state.cart.map((item) => (
            <div key={item.id} className="cart-list">
              <img
                style={{ height: "200px", width: "200px" }}
                src={item.image}
                alt={item.title}
              />
              <p
                style={{
                  fontSize: "16px",
                  fontWeight: "500"
                }}
              >
                {item.title}
              </p>
              <br />
              <br />

              <button className="incre" onClick={() => incrementQuantity(item)}>
                +
              </button>
              <span style={{ fontWeight: "bold", marginLeft: "0.5rem" }}>
                {item.quantity}
              </span>
              <button className="decre" onClick={() => decrementQuantity(item)}>
                -
              </button>
              <br />
              <br />

              <button className="order-btn" onClick={() => handleOrder(item)}>
                Order Now
              </button>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
