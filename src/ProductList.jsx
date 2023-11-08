import React, { useContext, useState } from "react";
import { ProductContext } from "./context/ProductContext";
import { NavLink } from "react-router-dom";
import "./productlist.css";

const ProductList = () => {
  const { state, dispatch } = useContext(ProductContext);
  const [search, setSearch] = useState("");

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    alert("Added the item to cart!");
  };

  function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  }

  return (
    <>
      <div className="navbar">
        <NavLink style={{ textDecoration: "none" }} to="/">
          <h2 style={{ color: "white", cursor: "pointer" }}>Shopping Cart</h2>
        </NavLink>
        <input
          style={{
            width: "30rem",
            height: "25px",
            fontSize: "18px",
            padding: "5px",
            fontWeight: "500",
            padding: "5px",
            border: "none",
            outline: "none",
            borderRadius: "5px"
          }}
          type="text"
          placeholder="Search a product.."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <NavLink className="links" to="/cart">
          Favourites
        </NavLink>

        <NavLink className="links" to="/orders">
          Your Orders
        </NavLink>
      </div>

      <div className="product-list">
        {state.products
          .filter((product) => {
            if (search === "") {
              return product;
            } else if (
              product.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return product;
            }
          })
          .map((product) => {
            return (
              <div className="product-card" key={product.id}>
                <img
                  className="product-image"
                  src={product.image}
                  alt={product.title}
                />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-description">
                  {truncateDescription(product.description, 100)}
                </p>
                <p className="product-price">Price: ${product.price}</p>
                <p className="product-rating">Rating: {product.rating.rate}</p>
                <button
                  className="add-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ProductList;
