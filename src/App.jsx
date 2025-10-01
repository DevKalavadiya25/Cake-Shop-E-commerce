import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import { cakes as initialCakes } from './data/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialCakes);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(cart.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleAddProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1
    };
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
      setCart(cart.filter(item => item.id !== productId));
    }
  };

  const handleUpdateProduct = (productId, updatedData) => {
    setProducts(products.map(p =>
      p.id === productId ? { ...p, ...updatedData } : p
    ));

    setCart(cart.map(item =>
      item.id === productId ? { ...item, ...updatedData } : item
    ));
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="app">
        <NavigationBar cartCount={cartCount} />
        <Routes>
          <Route
            path="/"
            element={<Home products={products} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/products"
            element={<Products products={products} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={handleUpdateQuantity}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/admin"
            element={
              <AdminPanel
                products={products}
                onAddProduct={handleAddProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateProduct={handleUpdateProduct}
              />
            }
          />
        </Routes>

        <footer className="bg-light text-center py-4 mt-5">
          <p className="mb-0 text-muted">
            &copy; 2025 Sweet Delights Bakery. Made with love.
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
