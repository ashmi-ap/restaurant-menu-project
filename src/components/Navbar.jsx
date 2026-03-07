import { Link, useLocation } from "react-router-dom";
import { useContext, useRef, useEffect, useState } from "react";
import { CartContext } from "../context/CartContext";

const LINKS = [
  { path: "/",          label: "Menu"      },
  { path: "/cart",      label: "Cart"      },
  { path: "/analytics", label: "Analytics" },
];

function Navbar() {
  const location = useLocation();
  const { cart } = useContext(CartContext);
  const linkRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, ready: false });
  const [ripple, setRipple]       = useState(null);

  // Slide indicator to active link
  useEffect(() => {
    const idx = LINKS.findIndex(l => l.path === location.pathname);
    const el  = linkRefs.current[idx];
    if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth, ready: true });
  }, [location.pathname]);

  const handleClick = (e, path) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id   = Date.now();
    setRipple({ id, x: e.clientX - rect.left, y: e.clientY - rect.top, path });
    setTimeout(() => setRipple(r => r?.id === id ? null : r), 700);
  };

  return (
    <nav className="navbar-premium">
      <Link className="navbar-brand-premium" to="/">
        <div className="brand-icon">🍽</div>
        <div className="brand-text-group">
          <span className="brand-name">FoodHub</span>
          <span className="brand-tagline">Premium Dining</span>
        </div>
      </Link>

      <div className="nav-links">
        {/* Sliding active-tab indicator */}
        {indicator.ready && (
          <div
            className="nav-indicator"
            style={{ left: indicator.left, width: indicator.width }}
          />
        )}

        {LINKS.map((link, i) => (
          <span
            key={link.path}
            ref={el => linkRefs.current[i] = el}
            style={{ position: "relative", display: "inline-block" }}
          >
            <Link
              className={`nav-link-premium ${location.pathname === link.path ? "active-link" : ""}`}
              to={link.path}
              onClick={e => handleClick(e, link.path)}
            >
              {ripple?.path === link.path && (
                <span key={ripple.id} className="nav-ripple" style={{ left: ripple.x, top: ripple.y }} />
              )}
              {link.label}
              {link.path === "/cart" && cart.length > 0 && (
                <span className="cart-badge">{cart.length}</span>
              )}
            </Link>
          </span>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;