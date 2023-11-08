// OrderHistory.js
import React, { useContext } from "react";
import { ProductContext } from "./context/ProductContext";
import "./cart.css";
import { NavLink } from "react-router-dom";

const OrderHistory = () => {
  const { state } = useContext(ProductContext);

  return (
    <div>
      <div className="cart-nav">
        <NavLink style={{ textDecoration: "none" }} to="/">
          <h2 style={{ color: "white" }}>Shopping Cart</h2>
        </NavLink>

        <NavLink
          className="link-s"
          style={{ textDecoration: "none", color: "white", fontWeight: "bold" }}
          to="/cart"
        >
          <p className="link-s">Favourites</p>
        </NavLink>

        <p style={{ color: "white" }}>Orders History</p>
      </div>
      {state.orderHistory.length === 0 ? (
        <h2 style={{ textAlign: "center", marginTop: "15rem" }}>
          No order has been placed yet !{" "}
        </h2>
      ) : (
        <ul>
          {state.orderHistory.map((order, index) => {
            return (
              <li key={index}>
                <strong>Order {index + 1}:</strong>
                <ul>
                  {order.map((product) => {
                    return (
                      <li key={product.id}>
                        {product.title}
                        <br />
                        <strong>
                          Quantity: {product.quantity} - Total Price: $
                          {(product.quantity * product.price).toFixed(2)}
                        </strong>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;
