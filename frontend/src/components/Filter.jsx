import React from 'react';

const Filter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="bg-white p-4 rounded-md border border-flipkart-lightgray">
      <h3 className="font-bold text-lg mb-4">Filters</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <p className="font-semibold text-gray-800 mb-3">Category</p>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={selectedCategory === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="mr-2"
            />
            <span className="text-sm text-gray-700">All Categories</span>
          </label>

          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.id}
                checked={selectedCategory === cat.id.toString()}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="border-t pt-4">
        <p className="font-semibold text-gray-800 mb-3">Price Range</p>
        <div className="space-y-2">
          {[
            { label: 'Under ₹500', min: 0, max: 500 },
            { label: '₹500 - ₹1000', min: 500, max: 1000 },
            { label: '₹1000 - ₹5000', min: 1000, max: 5000 },
            { label: '₹5000+', min: 5000, max: Infinity },
          ].map((range, index) => (
            <label key={index} className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="border-t mt-4 pt-4">
        <p className="font-semibold text-gray-800 mb-3">Rating</p>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-700">
                {rating}★ & above
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
