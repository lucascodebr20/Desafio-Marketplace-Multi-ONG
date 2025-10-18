

function LeftMenu({ role }) {
  return (

    <aside className="fixed top-0 left-0 h-full w-72 bg-white dark:bg-gray-800 shadow-xl p-6 flex flex-col">
      
      <div className="flex items-center gap-4 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">Nome do Usuário</p>
        </div>
      </div>

      <nav className="mt-6 flex-1">
        {role === 'ONG' && (
          <div className="mb-8">
            <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-4 h-4">
                {/* Cole seu SVG de 'Maleta' aqui. Ex: <svg>...</svg> */}
              </span>
              Painel da ONG
            </h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="w-5 h-5 text-[#8b38d1]">
                    {/* Cole seu SVG de 'Cadastrar' aqui */}
                  </span>
                  <span>Cadastrar Produto</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="w-5 h-5 text-[#8b38d1]">
                    {/* Cole seu SVG de 'Editar' aqui */}
                  </span>
                  <span>Editar Produto</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <span className="w-5 h-5 text-[#8b38d1]">
                    {/* Cole seu SVG de 'Métricas' aqui */}
                  </span>
                  <span>Métricas</span>
                </a>
              </li>
            </ul>
          </div>
        )}

        <div>
          <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-2">
            <span className="w-4 h-4">
              {/* Cole seu SVG de 'Usuário' aqui */}
            </span>
            Minha Conta
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="w-5 h-5">
                  {/* Cole seu SVG de 'Pedidos' aqui */}
                </span>
                <span>Meus Pedidos</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                <span className="w-5 h-5">
                  {/* Cole seu SVG de 'Configurações' aqui */}
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