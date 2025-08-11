import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
            <img src={assets.logo} className='mb-3 w-40' alt="" />
            <p className='w-full md:w-2/3 text-gray-600'>
            We believe that faith is a journey, and our carefully chosen religious products are here to help you along the way. From inspiring books to prayer beads, we offer items that encourage your devotion and support your spiritual practice. Since we started, our goal has been to provide high-quality products that connect with people of all beliefs. Each item is selected to uplift your spirit and strengthen your faith.
            </p>
        </div>

        <div>
            <p className='text-xl font-medium mb-3'>COMPANY</p>
            <ul className='flex flex-col gap-1 text-gray-600'>
                <li><a href="/" className="hover:underline">Home</a></li>
                <li><a href="/about" className="hover:underline">About us</a></li>
                <li><a href="/orders" className="hover:underline">Delivery</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
            </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-2'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>022 - 26542777 / +91 - 8160135457</li>
            <li>info@religiousproducts.com</li>
          </ul><br/>

          <div className='social-media'>
            <p className='text-xl font-medium mb-2.5'>FOLLOW US ON</p>
            <ul className='flex flex-row gap-3'>
              <li><a href="https://instagram.com" target="_blank" rel="">
                <img src={assets.instagram_icon} alt="Instagram" />
              </a></li>
              <li><a href="https://facebook.com" target="_blank" rel="">
                <img src={assets.facebook_icon} alt="Facebook" />
              </a></li>
              <li><a href="https://twitter.com" target="_blank" rel="">
                <img src={assets.twitter_icon} alt="Twitter" />
              </a></li>
            </ul>
          </div>
        </div>

      </div>

        <div>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ religiousproducts.com - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer
