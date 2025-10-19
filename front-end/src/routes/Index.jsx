
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import LoginPage from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx'; 
import DashBoard from '../pages/dashboard/DashBoard.jsx';
import RegisterProduct from '../pages/dashboard/RegisterProduct.jsx';
import ListProduct from '../pages/dashboard/ListProduct.jsx';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashBoard />}>
        <Route path="register-product" element={<RegisterProduct />} />
        <Route path="list-product" element={<ListProduct />} />
      </Route>
    </Routes>
  );
}

export default Index;