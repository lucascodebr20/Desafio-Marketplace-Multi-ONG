import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
    const displayCurrentPage = currentPage + 1;

    const pages = Array.from({ length: totalPages }, (_, i) => i); // [0, 1, 2, ...]

    if (totalPages <= 1) {
        return null; 
    }

    const handleClick = (pageIndex) => {
        if (pageIndex !== currentPage) {
            onPageChange(pageIndex);
        }
    };

    return (

        <div className="flex justify-center items-center my-6 space-x-2">
            
            <button
                onClick={() => handleClick(currentPage - 1)}
                disabled={currentPage === 0}
                className={`py-2 px-4 rounded-md transition duration-150 ${
                    currentPage === 0
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                Anterior
            </button>

            {pages.map((pageIndex) => (
                <button
                    key={pageIndex}
                    onClick={() => handleClick(pageIndex)}
                    className={`py-2 px-4 rounded-md transition duration-150 text-sm font-semibold ${
                        pageIndex === currentPage
                            ? 'bg-blue-900 text-white'
                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                    }`}
                >
                    {pageIndex + 1}
                </button>
            ))}

            <button
                onClick={() => handleClick(currentPage + 1)}
                disabled={currentPage === totalPages - 1}
                className={`py-2 px-4 rounded-md transition duration-150 ${
                    currentPage === totalPages - 1
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
            >
                Próximo
            </button>
        </div>
    );
}

export default Pagination;