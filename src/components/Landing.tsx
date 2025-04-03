'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Landing() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="bg-gradient-to-r from-stone-500 to-stone-700 min-h-screen flex flex-col items-center justify-center px-6">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl">
        {/* Left Section - Heading & Subheading */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-snug">
            Search for the Top <br /> Cryptocurrencies
          </h1>
          <p className="text-lg text-gray-300 mt-4">
            Stay updated with the latest trends in the crypto world.
          </p>
        </motion.div>

        {/* Right Section - Animation */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="md:w-1/2 flex justify-center"
        >
          <DotLottieReact
            src="https://lottie.host/30dc2d77-595b-4730-b220-0912605af6d4/WQlwvSDUo8.lottie"
            loop
            autoplay
          />
        </motion.div>
      </div>

      {/* Search Section - Centered below heading & animation */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        className="mt-8 w-full flex justify-center"
      >
        {showSearch ? (
          <div className="bg-white flex px-1 py-1 rounded-full border border-blue-500 overflow-hidden max-w-md w-full mx-auto">
            <input
              type='text'
              placeholder='Search Something...'
              className="w-full outline-none bg-white pl-4 text-sm text-gray-700 placeholder-gray-500"
            />
            <button
              type='button'
              className="bg-blue-600 hover:bg-blue-700 transition-all text-white text-sm rounded-full px-5 py-2.5"
            >
              Search
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowSearch(true)}
            className="bg-amber-300 hover:bg-amber-400 active:scale-95 transition-all text-stone-800 text-lg font-semibold rounded-full px-6 py-3"
          >
            Get Started
          </button>
        )}
      </motion.div>
    </div>
  );
}