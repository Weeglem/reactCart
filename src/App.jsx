import { Routes,Route } from "react-router"
import { UserProvider } from "./contexts/UserContext"
import { AuthOnly } from "./routes/AuthOnly"

import Home from "./pages/Home"
import Login from "./pages/Login"
import WebNavbar from "./components/Navbar"
import { ProductsProvider } from "./contexts/ProductsContext"
import { CartProvider } from "./contexts/CartContext"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./css/MainCSS.css"

import { Container } from "react-bootstrap"
import UserCart from "./components/UserCart"
import Product from "./pages/Product"
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import Footer from "./components/Footer"
import Checkout from "./pages/Checkout"
import NotFoundpage from "./pages/NotFoundpage"
import ProductEditor from "./pages/ProductEditor"

function App() {
  return (
    <ProductsProvider>
      <UserProvider>
        <CartProvider>
          <WebNavbar />

          <Container className="bodyContainer">
            <UserCart/>
            <Routes>
              {/* Auth only routes. */}
              <Route element={<AuthOnly />}>
                <Route element={<Checkout/>} path="/checkout" />
              </Route>
              <Route element={<Home/>} path="/" />
              <Route element={<Login />} path="/login" />

              
              <Route element={<ProductEditor />} path="/product/editor/:id?" />
              <Route element={<Product/>} path="/product/:id" />
              
              <Route path="*" element={<NotFoundpage/>} /> 
            </Routes>
          </Container>
          
          <Footer />
        </CartProvider>
      </UserProvider>
    </ProductsProvider>
  )
}

export default App
