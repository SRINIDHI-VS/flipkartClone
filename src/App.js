import {useState,useEffect} from 'react';
import ProductListingPage from './Components/ProductListingPage';
import ShoppingCartPage from './Components/ShoppingCartPage';
function App() {
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      console.log(cartItems)
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div>
      <ProductListingPage />
      <ShoppingCartPage cartItems={cartItems} />
    </div>
  );
}

export default App;
