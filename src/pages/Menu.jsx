import { useEffect, useState, useContext, useRef } from "react";
import API from "../api";
import MenuItem from "../components/MenuItem";
import { CartContext } from "../context/CartContext";

// 10 rich sample items shown when API has no data
const SAMPLE_ITEMS = [
  {
    _id: "s1",
    name: "Paneer Tikka Royale",
    sellingPrice: 320,
    category: "Starter",
    description: "Smoky cottage cheese cubes marinated in spiced yoghurt, charcoal-grilled to perfection.",
    image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=600&q=80"
  },
  {
    _id: "s2",
    name: "Butter Chicken Masala",
    sellingPrice: 440,
    category: "Main Course",
    description: "Tender chicken simmered in a velvety tomato-cream sauce with aromatic spices.",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=600&q=80"
  },
  {
    _id: "s3",
    name: "Truffle Mushroom Pizza",
    sellingPrice: 580,
    category: "Special",
    description: "Wood-fired thin crust topped with wild mushrooms, truffle oil and aged parmesan.",
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80"
  },
  {
    _id: "s4",
    name: "Spicy Lamb Rogan Josh",
    sellingPrice: 560,
    category: "Main Course",
    description: "Kashmiri-style braised lamb in a deep, spiced gravy — slow-cooked for 4 hours.",
    image: "https://images.unsplash.com/photo-1545247181-516773cae754?w=600&q=80"
  },
  {
    _id: "s5",
    name: "Mango Lassi Cheesecake",
    sellingPrice: 240,
    category: "Dessert",
    description: "No-bake cheesecake swirled with alphonso mango pulp on a buttery biscuit base.",
    image: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=600&q=80"
  },
  {
    _id: "s6",
    name: "Saffron Biryani",
    sellingPrice: 480,
    category: "Main Course",
    description: "Long-grain basmati layered with caramelised onions, whole spices and kesar.",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80"
  },
  {
    _id: "s7",
    name: "Crispy Calamari",
    sellingPrice: 380,
    category: "Starter",
    description: "Golden-fried squid rings served with sriracha aioli and fresh lime wedges.",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&q=80"
  },
  {
    _id: "s8",
    name: "Chocolate Lava Fondant",
    sellingPrice: 280,
    category: "Dessert",
    description: "Warm dark-chocolate cake with a molten core, served with vanilla bean ice cream.",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80"
  },
  {
    _id: "s9",
    name: "Iced Rose Lemonade",
    sellingPrice: 140,
    category: "Beverage",
    description: "House-pressed lemons, rose syrup and mint over crushed ice — Instagram-worthy.",
    image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&q=80"
  },
  {
    _id: "s10",
    name: "Dal Makhani Black",
    sellingPrice: 290,
    category: "Main Course",
    description: "Black lentils slow-simmered overnight in butter and cream, a timeless classic.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&q=80"
  },
];

function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
        <div className="skeleton" style={{ height: 22, width: "38%", borderRadius: 20 }} />
        <div className="skeleton" style={{ height: 22, width: "18%", borderRadius: 20 }} />
      </div>
      <div className="skeleton" style={{ height: 26, marginBottom: 10 }} />
      <div className="skeleton" style={{ height: 14, marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 14, width: "75%", marginBottom: 22 }} />
      <div className="skeleton" style={{ height: 1, marginBottom: 20 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div className="skeleton" style={{ height: 34, width: 80 }} />
        <div className="skeleton" style={{ height: 42, width: 130, borderRadius: 14 }} />
      </div>
    </div>
  );
}

function Menu() {
  const [menu, setMenu]               = useState([]);
  const [search, setSearch]           = useState("");
  const [debouncedSearch, setDbSearch]= useState("");
  const [isTyping, setIsTyping]       = useState(false);
  const [gridKey, setGridKey]         = useState(0);
  const [loading, setLoading]         = useState(true);
  const [flyParticles, setFlyParticles] = useState([]);
  const debounceRef = useRef(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get("/menu")
      .then(res => {
        const data = res.data && res.data.length > 0 ? res.data : SAMPLE_ITEMS;
        setMenu(data);
        setLoading(false);
      })
      .catch(() => {
        setMenu(SAMPLE_ITEMS);
        setLoading(false);
      });
  }, []);

  const handleSearch = (val) => {
    setSearch(val);
    setIsTyping(true);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDbSearch(val);
      setGridKey(k => k + 1);
      setIsTyping(false);
    }, 360);
  };

  const clearSearch = () => {
    setSearch("");
    setIsTyping(false);
    clearTimeout(debounceRef.current);
    setDbSearch("");
    setGridKey(k => k + 1);
  };

  const handleAddToCart = (item, btnEl) => {
    addToCart(item);
    if (btnEl) {
      const rect = btnEl.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      // Spawn 5 staggered particles in a fan
      const angles = [-40, -20, 0, 20, 40];
      angles.forEach((angle, i) => {
        const id = Date.now() + i;
        setFlyParticles(prev => [...prev, { id, x: cx, y: cy, angle }]);
        setTimeout(() => setFlyParticles(prev => prev.filter(p => p.id !== id)), 1000);
      });
    }
  };

  const filtered = menu.filter(item =>
    item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div className="page-header">
        <h1 className="page-title">Our Menu</h1>
        <p className="page-subtitle">
          {loading ? "Loading dishes…" : `${menu.length} handcrafted dishes, served with passion`}
        </p>
      </div>

      {/* Search */}
      <div className={`search-bar${isTyping ? " search-bar--typing" : ""}`}>
        {/* SVG search icon — swaps to animated dots while typing */}
        <span className={`search-icon${isTyping ? " search-icon--spin" : ""}`}>
          {isTyping ? (
            <span className="search-dots">
              <span /><span /><span />
            </span>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          )}
        </span>
        <input
          className="search-input"
          type="text"
          placeholder="Search dishes, cuisines…"
          value={search}
          onChange={e => handleSearch(e.target.value)}
        />
        {debouncedSearch && !isTyping && (
          <span className="search-result-count">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
        {search && (
          <button className="search-clear" onClick={clearSearch}>×</button>
        )}
      </div>

      {/* Fly-to-cart particles — fan burst */}
      {flyParticles.map(p => (
        <div
          key={p.id}
          className="fly-particle"
          style={{
            left: p.x,
            top:  p.y,
            '--fly-angle': `${p.angle}deg`,
            animationDelay: `${Math.abs(p.angle) * 4}ms`,
          }}
        />
      ))}

      {/* Grid */}
      {loading ? (
        <div className="menu-grid">
          {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <div className="menu-grid" key={gridKey}>
          {filtered.map((item, idx) => (
            <div key={item._id} style={{ "--i": idx }}>
              <MenuItem item={item} addToCart={handleAddToCart} />
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="empty-state">
              <span className="empty-icon">🍽</span>
              <div className="empty-title">No dishes found</div>
              <div className="empty-sub">Try a different search term</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Menu;