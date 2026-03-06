import { useEffect, useState, useContext } from "react";
import API from "../api";
import MenuItem from "../components/MenuItem";
import { CartContext } from "../context/CartContext";

function Menu() {

  const [menu, setMenu] = useState([]);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {

    API.get("/menu")
      .then(res => setMenu(res.data))
      .catch(err => console.log(err));

  }, []);

  return (
    <div>

      <h2 className="mb-4">Menu</h2>

      <div className="row">

        {menu.map(item => (
          <MenuItem
            key={item._id}
            item={item}
            addToCart={addToCart}
          />
        ))}

      </div>

    </div>
  );
}

export default Menu;