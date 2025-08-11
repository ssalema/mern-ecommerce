import React from 'react';
import Slider from 'react-slick';
import { assets } from '../assets/assets';

const PreviousBtn = ({ onClick }) => {
  return (
    <button
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-lg hover:bg-gray-300"
      onClick={onClick}
      style={{ fontSize: '18px' }}
    >
      &#10094; {/* HTML code for left arrow */}
    </button>
  );
};

// Custom Next Button
const NextBtn = ({ onClick }) => {
  return (
    <button
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-black bg-white p-2 rounded-full shadow-lg hover:bg-gray-300"
      onClick={onClick}
      style={{ fontSize: '18px' }}
    >
      &#10095; {/* HTML code for right arrow */}
    </button>
  );
};

const Hero = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
  };

  return (
    <div className="w-full relative z-10">
      {/* Slider Component */}
      <Slider {...settings}>
        {/* Slide 1 */}
        <div className="relative">
          <img className="w-full h-auto object-cover" src={assets.hero_img} alt="Hero Slide 1" />
          <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-8 sm:pl-12 px-4 sm:px-10">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">New Arrivals</h1>
            <p className="text-base sm:text-lg lg:text-xl mt-2">Check out our latest collection</p>
            <a href="http://localhost:5173/product/670bb0ab88e201b7e3eb701c" className="mt-4 py-2 px-4 bg-black text-white font-semibold hover:bg-gray-300 transition duration-300 text-sm sm:text-base lg:text-lg">Shop Now</a>
          </div>
        </div>
        
        {/* Slide 2 */}
        <div className="relative">
          <img className="w-full h-auto object-cover" src={assets.hero_img} alt="Hero Slide 2" />
          <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-8 sm:pl-12 px-4 sm:px-10">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">Best Sellers</h1>
            <p className="text-base sm:text-lg lg:text-xl mt-2">Discover our top-rated products</p>
            <a href="/collection" className="mt-4 py-2 px-4 bg-white text-black font-semibold hover:bg-gray-300 transition duration-300 text-sm sm:text-base lg:text-lg">Shop Now</a>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative">
          <img className="w-full h-auto object-cover" src={assets.hero_img} alt="Hero Slide 3" />
          <div className="absolute inset-0 flex flex-col items-start justify-center text-black pl-8 sm:pl-12 px-4 sm:px-10">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold">Limited Edition</h1>
            <p className="text-base sm:text-lg lg:text-xl mt-2">Exclusive designs available</p>
            <a href="/collection" className="mt-4 py-2 px-4 bg-white text-black font-semibold hover:bg-gray-300 transition duration-300 text-sm sm:text-base lg:text-lg">Shop Now</a>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Hero;
