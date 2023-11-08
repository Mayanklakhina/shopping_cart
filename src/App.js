import "./styles.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductList from "./ProductList";
import Cart from "./Cart";
import Login from "./Login";
import OrderHistory from "./OrderHistory";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
