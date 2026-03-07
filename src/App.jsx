import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import SplashScreen from "./components/SplashScreen";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Analytics from "./pages/Analytics";
import { CartProvider } from "./context/CartContext";

// Keyed wrapper — remounts on route change, triggering the CSS entrance animation
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
}

function App() {
  const [splashDone, setSplashDone] = useState(false);

  if (!splashDone) {
    return <SplashScreen onFinish={() => setSplashDone(true)} />;
  }

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
          <AnimatedRoutes />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;