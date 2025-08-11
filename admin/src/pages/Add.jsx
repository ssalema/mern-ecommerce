import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [price, setPrice] = useState("");
  const [religion, setReligion] = useState("Muslim");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Thobes");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const categoriesByReligion = {
    Muslim: ['Men', 'Women', 'Kid', 'Quran', 'Essential', 'Musalla', 'Mosque'],
    Hindu: ['Mens', 'Womens', 'Kids', 'Books', 'Essentials', 'Painting'],
    Christian: ['Statues', 'Rosaries', 'Bible', 'Alter_Bells', 'Church_Articles'],
  };

  const subcategoriesByCategory = {
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
    Rosaries: [],
    Bible: [],
    Alter_Bells: [],
    Church_Articles: ['Thurible', 'Tabernacle', 'Monstrance', 'Ciborium', 'Chalice'],
  };

  const handleReligionChange = (e) => {
    const selectedReligion = e.target.value;
    setReligion(selectedReligion);

    if (selectedReligion === "Muslim") {
      setCategory("Men");
      setSubCategory("Thobes");
    } else if (selectedReligion === "Hindu") {
      setCategory("Mens");
      setSubCategory("Casual Wear");
    } else {
      setCategory("Statues");
      setSubCategory("Jesus");
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    const subCategories = subcategoriesByCategory[selectedCategory];
    if (subCategories.length > 0) {
      setSubCategory(subCategories[0]);
    } else {
      setSubCategory();
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("description1", description1);
      formData.append("price", price);
      formData.append("religion", religion);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form fields
        setName('');
        setDescription('');
        setDescription1('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Image</p>
          <div className='flex gap-2'>
            {[image1, image2, image3, image4].map((image, index) => (
              <label htmlFor={`image${index + 1}`} key={index}>
                <img className='w-20' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                <input onChange={(e) => { index === 0 ? setImage1(e.target.files[0]) : index === 1 ? setImage2(e.target.files[0]) : index === 2 ? setImage3(e.target.files[0]) : setImage4(e.target.files[0]) }} type="file" id={`image${index + 1}`} hidden />
              </label>
            ))}
          </div>
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' />
        </div>

        <div className='w-full'>
          <p className='mb-2'>Product description</p>
          <textarea onChange={(e) => setDescription1(e.target.value)} value={description1} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' />
        </div>

        <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Religion</p>
            <select onChange={handleReligionChange} className='w-full px-3 py-2' value={religion}>
              <option value="Muslim">Muslim</option>
              <option value="Hindu">Hindu</option>
              <option value="Christian">Christian</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>Product category</p>
            <select onChange={handleCategoryChange} className='w-full px-3 py-2' value={category}>
              {categoriesByReligion[religion].map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <p className='mb-2'>Sub category</p>
            <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' value={subCategory}>
              {subcategoriesByCategory[category].map(subCat => (
                <option key={subCat} value={subCat}>{subCat}</option>
              ))}
            </select>
          </div>

          <div className='w-half'>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e) => { const value = e.target.value;
                // Allow only numbers and a single dot
                if (/^\d*\.?\d*$/.test(value)) {
                  setPrice(value);
                }
              }} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="text" placeholder='Enter Price' required/>
          </div>
        </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
          <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
      </form>
    </div>
  );
}

export default Add;