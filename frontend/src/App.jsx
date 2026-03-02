import { BrowserRouter, Routes, Route } from "react-router-dom";

function Home() {
  return <h2>Home Page</h2>;
}

function Cart() {
  return <h2>Cart Page</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;