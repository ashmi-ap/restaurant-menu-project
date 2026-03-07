import { useRef, useState } from "react";

function MenuItem({ item, addToCart }) {
  const btnRef   = useRef(null);
  const cardRef  = useRef(null);
  const [phase, setPhase] = useState("idle"); // idle | burst | success | reset
  const [ripples, setRipples] = useState([]);

  const categories = ["Main Course", "Starter", "Dessert", "Beverage", "Special"];
  const category = item.category || categories[Math.floor(item.sellingPrice % categories.length)];

  const handleAdd = (e) => {
    if (phase !== "idle") return; // prevent double-click during animation

    // --- ripple origin from click position ---
    const btn  = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const rx   = e.clientX - rect.left;
    const ry   = e.clientY - rect.top;
    const id   = Date.now();
    setRipples(prev => [...prev, { id, x: rx, y: ry }]);
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 700);

    // --- phase sequence ---
    setPhase("burst");
    setTimeout(() => setPhase("success"), 320);
    setTimeout(() => setPhase("reset"),   1400);
    setTimeout(() => setPhase("idle"),    1750);

    // --- notify parent (fly-particle + cart update) ---
    addToCart(item, btn);
  };

  return (
    <div className="menu-card-3d-wrapper">
      <div className="menu-card">
        {/* Lightning top bar */}
        <div className="lightning-top" />

        {/* Food image */}
        {item.image && (
          <div className="card-image-wrap">
            <img
              src={item.image}
              alt={item.name}
              className="card-image"
              loading="lazy"
            />
            <div className="card-image-overlay" />
          </div>
        )}

        {/* Card meta row */}
        <div className="card-meta">
          <span className="card-badge">🍴 {category}</span>
          <span className="card-rating">⭐ {(4 + (item.sellingPrice % 10) / 10).toFixed(1)}</span>
        </div>

        {/* Name */}
        <div className="card-name">{item.name}</div>

        {/* Description */}
        <div className="card-description">
          {item.description || "A delightful culinary creation crafted by our expert chefs using the finest ingredients."}
        </div>

        <div className="card-divider" />

        {/* Footer: price + CTA */}
        <div className="card-footer">
          <div className="card-price-group">
            <span className="card-price-label">Price</span>
            <span className="card-price">
              <span className="currency">₹</span>
              {item.sellingPrice}
            </span>
          </div>

          {/* Button wrapper — hosts the floating +1 label */}
          <div className="btn-cart-wrapper">
            {/* Floating +1 badge */}
            {phase === "burst" || phase === "success" ? (
              <span className="btn-float-label">+1</span>
            ) : null}

            {/* Particle ring burst */}
            {phase === "burst" && (
              <span className="btn-ring-burst" />
            )}

            <button
              ref={btnRef}
              className={`btn-add-cart btn-cart-${phase}`}
              onClick={handleAdd}
            >
              {/* Ripple layers */}
              {ripples.map(r => (
                <span
                  key={r.id}
                  className="btn-ripple"
                  style={{ left: r.x, top: r.y }}
                />
              ))}

              {/* Button label morphs */}
              <span className="btn-label-default">+ Add to Cart</span>
              <span className="btn-label-success">✓ Added!</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;