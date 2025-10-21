import React, { useState, useEffect } from 'react';
import { fetchAllCategories } from '../../service/categoryService';

function FilterHome({ onFilterChange }) {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [dataCategories, setDataCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await fetchAllCategories();
        setDataCategories(response);
      } catch (error) {
        console.error("Ocorreu um erro ao buscar as categorias:", error);
      }
    };
    loadCategories();
  }, []);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value) || value === '') {
      setPriceRange(prevRange => ({
        ...prevRange,
        [name]: value,
      }));
    }
  };

  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prevCategories => {
      const newCategories = new Set(prevCategories);
      if (newCategories.has(categoryId)) {
        newCategories.delete(categoryId);
      } else {
        newCategories.add(categoryId);
      }
      return newCategories;
    });
  };

  const handleClearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedCategories(new Set());
    onFilterChange({ price: { min: '', max: '' }, categories: [] });
  };

  const handleApplyFilters = () => {
    const filters = {
      price: {
        min: priceRange.min ? Number(priceRange.min) : '',
        max: priceRange.max ? Number(priceRange.max) : '',
      },
      categories: Array.from(selectedCategories),
    };
    onFilterChange(filters);
  };

  return (
    <div className="w-full bg-gray-900 text-white p-4 md:px-12 shadow-2xl mb-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-start gap-6 md:gap-12">

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <h3 className="text-base font-semibold text-gray-400 whitespace-nowrap">Preço:</h3>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              name="min"
              placeholder="Mínimo"
              value={priceRange.min}
              onChange={handlePriceChange}
              className="w-24 p-2 border border-gray-600 bg-gray-700 text-white rounded-md 
              focus:ring-blue-400 focus:border-blue-400 text-center transition duration-150"
            />
            <span className="font-bold text-gray-500">-</span>
            <input
              type="text"
              name="max"
              placeholder="Máximo"
              value={priceRange.max}
              onChange={handlePriceChange}
              className="w-24 p-2 border border-gray-600 bg-gray-700 text-white rounded-md 
              focus:ring-blue-400 focus:border-blue-400 text-center transition duration-150"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
          <h3 className="text-base font-semibold text-gray-400 whitespace-nowrap">Categorias:</h3>
          <div className="flex flex-wrap gap-2 md:gap-4">
            {dataCategories.length === 0 && <span className="text-sm text-gray-500">Carregando...</span>}
            {dataCategories.map(category => {
              const isSelected = selectedCategories.has(category.categoryId);
              return (
                <label
                  key={category.categoryId}
                  className={`flex items-center px-3 py-1 rounded-md text-sm cursor-pointer 
                  transition duration-150 border ${isSelected
                    ? 'bg-blue-600 border-blue-600 text-white font-medium shadow-sm'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleCategoryToggle(category.categoryId)}
                    className="hidden"
                  />
                  {category.nameCategory}
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3 md:ml-auto">
          <button
            onClick={handleApplyFilters}
            className="py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 
            transition duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Filtrar
          </button>

          <button
            onClick={handleClearFilters}
            className="py-2 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 
            transition duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            Limpar
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterHome;
