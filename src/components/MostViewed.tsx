"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useRouter } from "next/navigation"; // Use Next.js router for navigation
import "swiper/css";
import "swiper/css/navigation";
import ConfirmationModal from "./ConfirmationModal";

const cryptos = [
  { name: "Bitcoin", symbol: "BTC", image: "bitcoin" },
  { name: "Ethereum", symbol: "ETH", image: "ethereum" },
  { name: "Binance Coin", symbol: "BNB", image: "binance" },
  { name: "Solana", symbol: "SOL", image: "solana" },
  { name: "XRP", symbol: "XRP", image: "xrp" },
];

export default function MostViewed() {
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (name: string) => {
    setSelectedCrypto(name);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCrypto(null);
  };

  const confirmNavigation = () => {
    if (selectedCrypto) {
      router.push(`/crypto/${selectedCrypto.toLowerCase()}`);
    }
  };

  return (
    <div className="  text-white flex flex-col items-center">
      <h2 className="text-4xl font-bold text-center">What Everyone is Reading</h2>
      <p className="text-gray-400 mt-3 text-center mt-8">
        Get insights into the most valuable cryptocurrencies today.
      </p>

      {/* Swiper Slider */}
      <div className="w-[90vw] max-w-6xl mt-10 relative px-4 pb-16">
        <Swiper
          modules={[Navigation]}
          loop={true}
          navigation={true}
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            600: { slidesPerView: 1, spaceBetween: 10 },
            990: { slidesPerView: 2, spaceBetween: 20 },
            1028: { slidesPerView: 3, spaceBetween: 30 },
            1920: { slidesPerView: 4, spaceBetween: 40 },
          }}
          className="py-4"
        >
          {cryptos.map((crypto, index) => (
            <SwiperSlide key={crypto.symbol} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-r from-gray-800 to-stone-700 rounded-2xl shadow-lg overflow-hidden w-full max-w-[22rem] h-[40vh] border border-[#30363D] p-6 flex flex-col items-center justify-between"
              >
                {/* Fixed Image Sizing */}
                <div className="w-[90px] h-[90px] flex items-center justify-center">
                  <Image
                    src={`/crypto-logos/${crypto.image}.jpg`}
                    alt={crypto.name}
                    width={90}
                    height={90}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-2xl font-semibold">{crypto.name}</h3>
                <p className="text-gray-400 text-lg">Symbol: {crypto.symbol}</p>

                <button
                  onClick={() => {
                    openModal(crypto.name.toLocaleLowerCase());
                  }}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 transition-all text-white text-lg font-semibold rounded-full px-6 py-3 cursor-pointer"
                >
                  Visit Page
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

       {/* Confirmation Modal */}
       <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmNavigation}
        selectedCrypto={selectedCrypto}
      />
    </div>
  );
}