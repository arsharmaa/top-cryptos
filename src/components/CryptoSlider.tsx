"use client";

import { useCryptoStore } from "@/store/useCryptoStore";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CryptoSlider() {
  const { viewedCryptos } = useCryptoStore();
  const router = useRouter();

  if (viewedCryptos.length === 0) return null;

  const sortedCryptos =
    viewedCryptos.length < 10
      ? viewedCryptos
      : [...viewedCryptos].sort((a, b) => b.views - a.views).slice(0, 10);

  return (
    <div className=" text-white flex flex-col items-center mb-16">
      <h2 className="text-4xl font-bold text-center mt-16 md:mt-8">
        Recently Viewed
      </h2>
      <p className="text-gray-400 mt-3 text-center mt-8">
        See which cryptocurrencies have caught your attention.
      </p>

      <div className="w-[90vw] max-w-6xl mt-10 relative px-4">
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
          {sortedCryptos.map((crypto, index) => (
            <SwiperSlide key={crypto.symbol} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-gradient-to-r from-gray-800 to-stone-700 rounded-2xl shadow-lg overflow-hidden w-full max-w-[22rem] h-[40vh] border border-[#30363D] p-6 flex flex-col items-center justify-between"
              >
                <div className="w-[90px] h-[90px] flex items-center justify-center">
                  <Image
                    src={`/crypto-logos/${crypto.id}.jpg`}
                    alt={crypto.name}
                    width={90}
                    height={90}
                    className="object-contain"
                  />
                </div>

                <h3 className="text-2xl font-semibold">{crypto.name}</h3>
                <p className="text-gray-400 text-lg">Symbol: {crypto.symbol}</p>

                <button
                  onClick={() => router.push(`/crypto/${crypto.name.toLowerCase()}`)}
                  className="mt-4 bg-amber-400 hover:bg-amber-500 transition-all text-stone-900 text-lg font-semibold rounded-full px-6 py-3 cursor-pointer"
                >
                  Visit Page
                </button>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
