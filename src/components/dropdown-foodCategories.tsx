import React from "react";

type Props = {
  value: string;
  onChange: (selectedCategory: string) => void;
};

const DropdownFoodCategories = ({ value, onChange }: Props) => {
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    onChange(selectedCategory);
  };
  return (
    <>
      <select
      value={value}
      onChange={handleCategoryChange}
      className="hs-dropdown-toggle py-3 px-6 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
    >
      <option value="">Select Food Category</option>
      <option value="Noodle">Noodle</option>
      <option value="Breakfast">Breakfast</option>
      <option value="Beverage">Beverage</option>
      <option value="Steak">Steak</option>
    </select>
    </>
  );
};

export default DropdownFoodCategories;
