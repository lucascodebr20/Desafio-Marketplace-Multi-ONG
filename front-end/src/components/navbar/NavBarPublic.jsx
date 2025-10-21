
import { useState } from 'react';
import Title from '../tittle/Title';
import { FaShoppingCart } from 'react-icons/fa';
import { IoMdExit } from 'react-icons/io';
import { BsRobot } from 'react-icons/bs';
import { getUserData } from '../../service/userInfoService';
import axios from 'axios';
import { useEffect } from 'react';

function NavBarPublic({ onSearch }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isCartEmpty, setIsCartEmpty] = useState(true);
  const [isSmartSearchEnabled, setSmartSearchEnabled] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getUserData().then((data) => setUserInfo(data));
    const cartStatus = localStorage.getItem('CartIsEmpty');
    setIsCartEmpty(cartStatus !== 'false');
  }, []);

  const handleLogout = () => {
    axios
      .post('https://api.lucasbuild.xyz/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null);
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
        window.location.href = '/login';
      });
  };

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchText, isSmartSearchEnabled);
    }
  };

  const handleSmartToggle = () => {
    setSmartSearchEnabled(!isSmartSearchEnabled);
  };
  
  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between space-x-6">
      <div className="flex-1">
        <Title className="text-xl font-semibold text-center" />
      </div>
      
      <form className="w-full max-w-lg" onSubmit={handleSearchSubmit}>
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar produto..."
            className="w-full px-4 pr-24 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchText}
            onChange={handleInputChange}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <label
              htmlFor="smart-search-checkbox"
              className="flex items-center cursor-pointer group"
              title="Pesquisa Inteligente"
            >
              <BsRobot
                className={`h-5 w-5 mr-2 transition-colors duration-200 ${
                  isSmartSearchEnabled
                    ? 'text-[#8b38d1]'
                    : 'text-gray-400 group-hover:text-gray-600'
                }`}
              />
              <input
                id="smart-search-checkbox"
                type="checkbox"
                checked={isSmartSearchEnabled}
                onChange={handleSmartToggle}
                className="h-4 w-4 rounded border-gray-300 text-[#8b38d1] focus:ring-[#8b38d1] focus:ring-offset-0"
              />
            </label>
          </div>
        </div>
      </form>

      <div className="flex-1 flex justify-end">
        <div className="flex items-center space-x-4">
          {!userInfo ? (
            <>
              <a href="/register">
                <button className="whitespace-nowrap rounded-md border border-[#8b38d1] px-4 py-2 font-semibold text-[#8b38d1] transition-colors duration-200 hover:bg-[#553b6b] hover:text-white">
                  Cadastre-se
                </button>
              </a>
              <a href="/login">
                <button className="whitespace-nowrap rounded-md bg-[#8b38d1] px-4 py-2 font-semibold text-white transition-colors duration-200 hover:bg-[#553b6b]">
                  Fazer Login
                </button>
              </a>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <a href="/dashboard">
                <button className="whitespace-nowrap rounded-md border border-[#8b38d1] px-4 py-2 
                font-semibold text-[#8b38d1] transition-colors duration-200 hover:bg-[#553b6b] 
                cursor-pointer hover:text-white">
                  Minha Conta
                </button>
              </a>
              <button
                onClick={handleLogout}
                className="rounded-md p-2 text-red-500 cursor-pointer transition-colors duration-200 
                hover:bg-red-100"
                title="Sair"
              >
                <IoMdExit size={24} />
              </button>
            </div>
          )}

          <a href="/cart" className="relative p-2">
            <FaShoppingCart className="h-6 w-6 text-gray-600 hover:text-[#8b38d1]" />
            {!isCartEmpty && (
              <span className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full border-2 border-white bg-red-500"></span>
            )}
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBarPublic;