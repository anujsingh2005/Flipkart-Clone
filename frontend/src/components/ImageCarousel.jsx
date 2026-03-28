import React from 'react';

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const defaultImage = 'https://via.placeholder.com/400';
  const imageList = images && images.length > 0 ? images : [defaultImage];

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageList.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="bg-white p-4 rounded-md border border-flipkart-lightgray">
      {/* Main Image */}
      <div className="relative w-full h-96 bg-gray-100 rounded-md flex items-center justify-center mb-4">
        <img
          src={imageList[currentIndex]}
          alt="Product"
          className="max-w-full max-h-full object-contain"
        />

        {/* Navigation Buttons */}
        {imageList.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded-full"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Images */}
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {imageList.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
                index === currentIndex
                  ? 'border-flipkart-yellow'
                  : 'border-flipkart-lightgray'
              }`}
            >
              <img
                src={img}
                alt={`Thumb ${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
