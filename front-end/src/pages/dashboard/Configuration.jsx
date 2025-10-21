import React from 'react';
import { FaHardHat } from 'react-icons/fa'; 

function Configuration() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center bg-gray-100 p-8 rounded-lg">
            
            <FaHardHat className="text-5xl text-yellow-500 mb-6" />

            <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Página em Construção
            </h1>

            <p className="text-lg text-gray-500 max-w-md">
                Estamos trabalhando para trazer uma ótima experiência para você.
                Volte em breve para conferir as novidades!
            </p>

        </div>
    );
}

export default Configuration;