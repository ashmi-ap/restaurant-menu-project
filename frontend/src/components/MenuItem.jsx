function MenuItem({ item, addToCart }) {

  return (
    <div className="col-md-4 mb-4">

      <div className="card bg-dark text-light p-3 shadow">

        <h5>{item.name}</h5>

        <p>₹ {item.sellingPrice}</p>

        <button
          className="btn btn-warning"
          onClick={() => addToCart(item)}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
}

export default MenuItem;