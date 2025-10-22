import axios from 'axios';
import {API_URL} from '../../config/api'
import { FaBoxOpen, FaPlusCircle, FaReceipt, FaCog, FaSignOutAlt,
  FaHome, FaUserCircle, FaTachometerAlt, FaUserCog, FaHistory
} from 'react-icons/fa';

const MenuItem = ({ href, icon, children }) => (
  <li>
    <a
      href={href}
      className="flex items-center gap-4 px-4 py-3 text-purple-100 rounded-lg hover:bg-purple-700 
      transition-colors duration-200"
    >
      {icon}
      <span>{children}</span>
    </a>
  </li>
);

const MenuTitle = ({ icon, children }) => (
  <h3 className="px-4 mt-8 mb-2 text-xs font-semibold text-purple-300 
  uppercase tracking-wider flex items-center gap-2">
    {icon}
    {children}
  </h3>
);

function LeftMenu({ role, name }) {
  const handleLogout = () => {
    axios
      .post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        setUserInfo(null);
        window.location.href = '/login';
      })
      .catch((error) => {
        console.error('Erro ao fazer logout:', error);
        window.location.href = '/login';
      });
  };

  return (

    <aside className="fixed top-0 left-0 h-full w-72 bg-purple-900 text-white shadow-xl p-6 flex flex-col">
      <div className="flex flex-col items-center gap-4 pb-6 border-b border-purple-800">
        <a href="/" className="flex items-center gap-3 text-2xl font-bold text-white">
          <FaHome />
          <span>Início</span>
        </a>
        <div className="flex items-center gap-3 mt-4">
          <FaUserCircle className="w-8 h-8 text-purple-300" />
          <div>
            <p className="font-semibold text-white">{name}</p>
            <p className="text-xs text-purple-300">{role === 'ONG' ? 'Perfil ONG' : 
            role === 'ADMIN' ? 'Perfil Administrador' : 'Perfil Usuerio'}</p>
          </div>
        </div>
      </div>

      <nav className="mt-6 flex-1">

        {role === 'ONG' && (
          <div>
            <MenuTitle icon={<FaTachometerAlt />}>Painel da ONG</MenuTitle>
            <ul className="space-y-1">
              <MenuItem href="/dashboard/register-product" icon={<FaPlusCircle size={20} />}>
                Cadastrar Produto
              </MenuItem>
              <MenuItem href="/dashboard/list-product" icon={<FaBoxOpen size={20} />}>
                Listar Produtos
              </MenuItem>
            </ul>
          </div>
        )}

        {role === 'ADMIN' && (
          <div>
            <MenuTitle icon={<FaTachometerAlt />}>Painel da ONG</MenuTitle>
            <ul className="space-y-1">
              <MenuItem href="/dashboard/register-category" icon={<FaPlusCircle size={20} />}>
                Cadastar Categorias
              </MenuItem>
              <MenuItem href="/dashboard/log-pesquisa" icon={<FaHistory size={20} />}>
                Log de Pesquisa
              </MenuItem>
            </ul>
          </div>
        )}



        <div>
          <MenuTitle icon={<FaUserCog />}>Minha Conta</MenuTitle>
          <ul className="space-y-1">
            <MenuItem href="/dashboard/order" icon={<FaReceipt size={20} />}>
              Meus Pedidos
            </MenuItem>
            <MenuItem href="/dashboard/configuration" icon={<FaCog size={20} />}>
              Configurações
            </MenuItem>
          </ul>
        </div>
      </nav>

      <div className="pt-6 border-t border-purple-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-4 px-4 py-3 text-purple-100 bg-purple-800 
          rounded-lg hover:bg-red-600 transition-colors duration-200 cursor-pointer"
        >
          <FaSignOutAlt size={20} />
          <span>Sair</span>
        </button>
      </div>

    </aside>
  );
}

export default LeftMenu;