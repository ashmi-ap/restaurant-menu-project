import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../src/context/CartContext";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const subtotal = cart.reduce((sum, item) => sum + item.sellingPrice, 0);
  const tax      = Math.round(subtotal * 0.05);
  const total    = subtotal + tax;

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Your Cart</h1>
        <p className="page-subtitle">
          {cart.length === 0
            ? "Nothing here yet"
            : `${cart.length} item${cart.length !== 1 ? "s" : ""} ready to order`}
        </p>
      </div>

      <div className="cart-container">
        {cart.length === 0 ? (
          /* Empty state */
          <div className="empty-cart">
            <span className="empty-cart-emoji">🛒</span>
            <div className="empty-cart-title">Your cart is empty</div>
            <div className="empty-cart-sub">
              Browse our menu and find something you'll love
            </div>
            <Link to="/">
              <button className="btn-browse">Browse Menu →</button>
            </Link>
          </div>
        ) : (
          <>
            {/* Cart items */}
            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <div className="cart-item-icon">🍽</div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">₹ {item.sellingPrice}</div>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Order summary */}
            <div className="cart-summary">
              <div className="summary-title">Order Summary</div>

              <div className="summary-row">
                <span>Subtotal ({cart.length} items)</span>
                <span>₹ {subtotal}</span>
              </div>
              <div className="summary-row">
                <span>GST &amp; charges (5%)</span>
                <span>₹ {tax}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span style={{ color: "var(--success)", fontWeight: 600 }}>FREE</span>
              </div>

              <div className="summary-total-row">
                <span className="summary-total-label">Total Amount</span>
                <span className="summary-total-value">₹ {total}</span>
              </div>

              <button className="btn-checkout">Proceed to Checkout →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;