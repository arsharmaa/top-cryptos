"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MostViewed from "./MostViewed";
import useCryptoData from "@/hooks/useCryptoData";
import ConfirmationModal from "./ConfirmationModal";

export default function Landing() {
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const cryptoSectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Open confirmation modal
  const openModal = (name: string) => {
    setSelectedCrypto(name);
    setModalOpen(true);
  };

  // Close confirmation modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCrypto(null);
  };

  // Confirm navigation
  const confirmNavigation = () => {
    if (selectedCrypto) {
      router.push(`/crypto/${selectedCrypto.toLowerCase()}`);
    }
  };

  const { cryptoList, loading, error } = useCryptoData(currency);

  const handleScrollToCryptoSection = () => {
    if (cryptoSectionRef.current) {
      cryptoSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Filter crypto based on search query
  const filteredCrypto = cryptoList.filter((coin) =>
    coin.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
<div className="w-full flex flex-col items-center bg-gradient-to-r from-stone-500 to-stone-700">
  {/* Hero Section */}
  <div className="h-auto w-full flex flex-col justify-center items-center px-6 mb-32">
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl">
      
      {/* Left: Text Section (Vertically Centered) */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start justify-center self-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-snug mt-16">
          Search for the Top <br /> Cryptocurrencies
        </h1>
        <p className="text-lg text-gray-300 mt-4">
          Stay updated with the latest trends in the crypto world.
        </p>

        <button
          onClick={handleScrollToCryptoSection}
          className="mt-6 bg-blue-500 hover:bg-blue-600 transition-all text-white text-lg font-semibold rounded-full px-6 py-3 cursor-pointer"
        >
          Learn More
        </button>
      </motion.div>

      {/* Right: Lottie Animation (Vertically Centered & Larger) */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="md:w-2/5 h-full flex justify-center self-center"
      >
        <DotLottieReact
          src="https://lottie.host/30dc2d77-595b-4730-b220-0912605af6d4/WQlwvSDUo8.lottie"
          loop
          autoplay
          className="w-full h-[35vh] md:h-[45vh]"
        />
      </motion.div>

    </div>
        {/* Search Section */}
        <div className="mt-8 md:mt-20 w-full flex flex-col items-center">
          {!showSearch && (
            <motion.button
              onClick={() => setShowSearch(true)}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-amber-400 hover:bg-amber-500 active:scale-95 transition-all w-[50vw] md:w-[30vw] cursor-pointer text-stone-900 text-lg font-semibold rounded-full px-6 py-3 shadow-lg"
            >
              Start Searching
            </motion.button>
          )}

          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ y: 30, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-gradient-to-br from-stone-600 to-stone-800 border border-stone-500 shadow-xl rounded-lg max-w-md w-full mt-4 px-6 py-4 backdrop-blur-lg bg-opacity-90"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowSearch(false)}
                  className="cursor-pointer text-gray-300 hover:text-white transition float-right mb-2"
                >
                  ✕
                </button>

                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a cryptocurrency..."
                  className="w-full outline-none bg-stone-700 text-gray-200 placeholder-gray-400 pl-4 py-2 text-sm rounded-md border border-gray-500 focus:border-amber-400 focus:ring-2 focus:ring-amber-500 transition"
                />

                {/* Currency Selector */}
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="mt-3 w-full px-4 py-2 bg-gradient-to-r from-gray-800 to-stone-700 border border-gray-500 rounded-md text-gray-200 shadow-md focus:outline-none focus:ring-2 focus:ring-amber-500 transition appearance-none"
                >
                  <option className="bg-stone-700" value="usd">USD ($)</option>
                  <option className="bg-stone-700" value="eur">EUR (€)</option>
                  <option className="bg-stone-700" value="gbp">GBP (£)</option>
                  <option className="bg-stone-700" value="inr">INR (₹)</option>
                </select>

                {/* Search Results */}
                {loading ? (
                  <p className="text-center text-gray-400 mt-3">Loading...</p>
                ) : error ? (
                  <p className="text-center text-red-500 mt-3">{error}</p>
                ) : (
                  <ul className="mt-4 bg-stone-700 rounded-md max-h-48 overflow-y-auto border border-gray-600">
                    {filteredCrypto.length > 0 ? (
                      filteredCrypto.map((coin) => (
                        <li
                          key={coin.id}
                          onClick={() => openModal(coin.id)}
                          className="px-4 py-3 hover:bg-stone-600 cursor-pointer flex justify-between text-gray-200 transition"
                        >
                          <span>
                            {coin.name} ({coin.symbol.toUpperCase()})
                          </span>
                          <span className="font-bold text-amber-400">
                            {coin.current_price.toFixed(2)} {currency.toUpperCase()}
                          </span>
                        </li>
                      ))
                    ) : (
                      <p className="text-center py-2 text-gray-400">No Results Found</p>
                    )}
                  </ul>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* MostViewed Section */}
      <div ref={cryptoSectionRef} className="w-full">
        <MostViewed />
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmNavigation} selectedCrypto={selectedCrypto} />
    </div>
  );
}
