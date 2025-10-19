
function NavBarPublic() {

  return (

    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between">

      <a href="/"><div className="flex flex-1 justify-center items-center space-x-2">
        <span className="text-xl font-semibold text-gray-800">MarketPlace das Ong</span>
      </div></a>

      <div className="flex flex-2 justify-center items-center mx-6">
        <input
          type="text"
          placeholder="Buscar produto..."
          className="w-5/6 px-4 py-2 border border-gray-300 rounded-md 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <a href="/register">
          <button
            className="px-4 py-2 rounded-md border border-[#8b38d1] text-[#8b38d1] 
            hover:bg-[#553b6b] hover:text-white transition-colors duration-200 font-semibold cursor-pointer" >
            Cadastre-se
          </button>
        </a>
        <a href="/login">
          <button
            className="px-4 py-2 rounded-md bg-[#8b38d1] text-white 
            hover:bg-[#553b6b] transition-colors duration-200 font-semibold cursor-pointer" >
            Fazer Login
          </button>
        </a>
      </div>

    </nav>
  );
}

export default NavBarPublic;