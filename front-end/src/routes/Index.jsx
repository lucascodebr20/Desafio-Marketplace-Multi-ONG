
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import LoginPage from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx'; 
import DashBoard from '../pages/dashboard/DashBoard.jsx';
import RegisterProduct from '../pages/dashboard/RegisterProduct.jsx';
import ListProduct from '../pages/dashboard/ListProduct.jsx';
import UpdateProduct from '../pages/dashboard/UpdateProduct.jsx';
import PageProduct from '../pages/product/PageProduct.jsx';
import Cart from '../pages/cart/Cart.jsx';
import OrderUser from '../pages/dashboard/OrderUser.jsx';
import Configuration from '../pages/dashboard/Configuration.jsx';
import RegisterCategory from '../pages/dashboard/RegisterCategory.jsx';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:productId" element={<PageProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/dashboard" element={<DashBoard />}>
        <Route path="register-product" element={<RegisterProduct />} />
        <Route path="list-product" element={<ListProduct />} />
        <Route path="update-product/:productId" element={<UpdateProduct />} />
        <Route path="order" element={<OrderUser />} />
        <Route path="configuration" element={<Configuration />} />
        <Route path="register-category" element={<RegisterCategory />} />
      </Route>
    </Routes>
  );
}

export default Index;