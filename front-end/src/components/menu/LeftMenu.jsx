

function LeftMenu({ role, name }) {
  return (

    <aside className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col">
      
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">Olá, {name}</p>
        </div>
      </div>

      <nav className="mt-6 flex-1">
        {role === 'ONG' && (
          <div className="mb-8">
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-4">
              </span>
              Painel da ONG
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="/dashboard/register-product" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="w-5 h-5 text-[#8b38d1]">
                  </span>
                  <span>Cadastrar Produto</span>
                </a>
              </li>
              <li>
                <a href="/dashboard/list-product" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="w-5 h-5 text-[#8b38d1]">
                  </span>
                  <span>Listar Produtos</span>
                </a>
              </li>
            </ul>
          </div>
        )}

        <div>
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-4">
            </span>
            Minha Conta
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="w-5 h-5">
                </span>
                <span>Meus Pedidos</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="w-5 h-5">
                </span>
                <span>Configurações</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
      
    </aside>
  );
}

export default LeftMenu;