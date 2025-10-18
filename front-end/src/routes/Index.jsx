
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/home/Home.jsx';
import LoginPage from '../pages/auth/Login.jsx';
import Register from '../pages/auth/Register.jsx'; 
import DashBoard from '../pages/dashboard/DashBoard.jsx';

function Index() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
}

export default Index;