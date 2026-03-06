import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {

  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.sellingPrice, 0);

  return (
    <div>

      <h2 className="mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>

          {cart.map((item, index) => (
            <div key={index} className="card bg-dark text-light p-3 mb-3">

              <div className="d-flex justify-content-between">

                <div>
                  <h5>{item.name}</h5>
                  <p>₹ {item.sellingPrice}</p>
                </div>

                <button
                  className="btn btn-danger"
                  onClick={() => removeFromCart(index)}
                >
                  Remove
                </button>

              </div>

            </div>
          ))}

          <h4 className="mt-3">Total: ₹ {total}</h4>

        </div>
      )}

    </div>
  );
}

export default Cart;