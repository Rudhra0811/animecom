import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { LinearProgress } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import WishlistPage from './pages/WishlistPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4081',
    },
    secondary: {
      main: '#00BCD4',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <Router>
              <AppContent loading={loading} setLoading={setLoading} />
            </Router>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

function AppContent({ loading, setLoading }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('search') || '';

  return (
    <div className="App">
      <Header />
      {loading && <LinearProgress />}
      <main>
        <Routes>
          <Route path="/" element={<Home setLoading={setLoading} />} />
          <Route path="/products" element={<ProductList initialSearch={searchTerm} setLoading={setLoading} />} />
          <Route path="/product/:id" element={<ProductDetail setLoading={setLoading} />} />
          <Route path="/cart" element={<Cart setLoading={setLoading} />} />
          <Route path="/login" element={<Login setLoading={setLoading} />} />
          <Route path="/register" element={<Registration setLoading={setLoading} />} />
          <Route path="/profile" element={<UserProfile setLoading={setLoading} />} />
          <Route path="/wishlist" element={<WishlistPage setLoading={setLoading} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;