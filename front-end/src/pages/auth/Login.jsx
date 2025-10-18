
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Tittle from '../../components/tittle/Tittle';

function Login() {

  const navigate = useNavigate();
  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <main className="bg-gray-100 dark:bg-gray-900 min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">

        <Tittle />

        <p className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Acesse sua conta
        </p>

        <form>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="seu.email@exemplo.com"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-[#8b38d1]"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••••"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200
                         focus:outline-none focus:ring-2 focus:ring-[#8b38d1]"
              required
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              className="w-full px-4 py-3 rounded-lg bg-[#8b38d1] text-white 
              hover:bg-[#553b6b] transition-colors duration-300 font-semibold cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b38d1] dark:focus:ring-offset-gray-800"
            > Fazer Login
            </button>

            <button
              onClick={handleRegisterRedirect}
              type="button"
              className="w-full px-4 py-3 rounded-lg border border-[#8b38d1] text-[#8b38d1] 
              hover:bg-[#553b6b] hover:text-white transition-colors duration-300 font-semibold cursor-pointer
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#8b38d1] dark:focus:ring-offset-gray-800"
            > Cadastre-se
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}

export default Login;