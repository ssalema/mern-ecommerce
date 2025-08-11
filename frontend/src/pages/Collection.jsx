import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [religion, setReligion] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const categoryOptions = {
    Muslim: ['Men', 'Women', 'Kid', 'Quran', 'Essential', 'Musalla', 'Mosque'],
    Hindu: ['Mens', 'Womens', 'Kids', 'Books', 'Essentials', 'Painting'],
    Christian: ['Statues', 'Rosaries', 'Bible', 'Alter_Bells', 'Church_Articles'],
  };

  const subCategoryOptions = {
    Men: ['Thobes', 'Kurta Pajama', 'Pathani Suit', 'Bisht', 'Topi'],
    Women: ['Abaya', 'Hijab', 'Hijab Pin', 'Burqa', 'Niqab'],
    Kid: ['Thobes', 'Topi', 'Abaya', 'Hijab'],
    Quran: ['Regular Quran', 'Color Coded Quran', 'Zipper Quran'],
    Essential: ['Tasbih', 'Miswak', 'Qibla Compass'],
    Musalla: ['Regular Musalla', 'Travel Musalla'],
    Mosque: ['Mimbar', 'Janaza Carrier'],

    Mens: ['Casual Wear', 'Dhotis', 'Sherwanis and Achkans', 'Weeding Kurta Pajama'],
    Womens: ['Salwar Kameez', 'Designer Anarkali', 'Patiala'],
    Kids: ['Kurta and Dhoti', 'Sherwani'],
    Books: ['Ramayana', 'Mahabharat', 'Bhagavad Gita'],
    Essentials: ['Diyas and Lamp', 'Urlis', 'Pooja Thali Set', 'Puja Temples', 'Idols Statues'],
    Painting: ['Shiv', 'Durga', 'Ganesh', 'Krishna', 'Laxmi'],

    Statues: ['Jesus', 'Mother Mary', 'Holy Family', 'Catholic Saints'],
    Church_Articles: ['Thurible', 'Tabernacle', 'Monstrance', 'Ciborium', 'Chalice'],
  };

  const toggleReligion = (e) => { const value = e.target.value;
    // Set the selected religion and reset category and subcategory
    setReligion([value]);
    setCategory([]);
    setSubCategory([]);
  };

  const toggleCategory = (e) => { const value = e.target.value;
    // Set the selected category and reset subcategory
    setCategory([value]);
    setSubCategory([]);
  };

  const toggleSubCategory = (e) => { const value = e.target.value;
    // Set the selected subcategory
    setSubCategory([value]);
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (religion.length > 0) {
      productsCopy = productsCopy.filter((item) => religion.includes(item.religion));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [religion, category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Religion Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>RELIGION</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Muslim', 'Hindu', 'Christian'].map((rel) => (
              <p className='flex gap-2' key={rel}>
                <input className='w-3' type="checkbox" value={rel} checked={religion.includes(rel)} onChange={toggleReligion} /> {rel}
              </p>
            ))}
          </div>
        </div>

        {/* Category Filter: Only show if a religion is selected */}
        {religion.length > 0 && (
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {categoryOptions[religion[0]]?.map((cat) => (
                <p className='flex gap-2' key={cat}>
                  <input className='w-3' type="checkbox" value={cat} checked={category.includes(cat)} onChange={toggleCategory} /> {cat}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* SubCategory Filter */}
        {category.length > 0 && !category.some(cat => cat === 'Rosaries' || cat === 'Alter_Bells' || cat === 'Bible') && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {category.flatMap(cat =>
                subCategoryOptions[cat]?.map(subCat => (
                  <p className='flex gap-2' key={subCat}>
                    <input className='w-3' type="checkbox" value={subCat} checked={subCategory.includes(subCat)} onChange={toggleSubCategory} /> {subCat}
                  </p>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection