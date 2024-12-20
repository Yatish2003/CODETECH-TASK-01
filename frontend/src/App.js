import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './Navbar'
import Home from "./Home";
import ProductsHome from "./Products/ProductsHome";
import Description from "./Products/Description";
import Mens from "./Products/Mens";
import Womens from "./Products/Womens";
import Cart from "./Products/Cart";
import Login from "./Login-signup/Login";
import SignUp from "./Login-signup/SignUp";
import Kids from "./Products/Kids";
import Admin from "./Admin";
import BuyNow from "./Products/BuyNow";
function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/products" element={<ProductsHome/>}/>
          <Route path="/products/mens" element={<Mens/>}/>
          <Route path="/products/womens" element={<Womens/>}/>
          <Route path="/products/kids" element={<Kids/>}/>

          <Route path="/products/description" element={<Description/>}/>

          <Route path="/buynow" element={<BuyNow/>}/>
          <Route path="/carts" element={<Cart/>}/>
          <Route path="/wishlist" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
