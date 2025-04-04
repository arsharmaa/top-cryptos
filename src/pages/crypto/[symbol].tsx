import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useCryptoStore } from "@/store/useCryptoStore";
import CryptoSlider from "@/components/CryptoSlider";
import axios from "axios";
import Image from "next/image";

interface CryptoDetails {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  image: string;
  price_change_percentage_24h: number;
}

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

const cryptoMap: Record<string, string> = {
  btc: "bitcoin",
  eth: "ethereum",
  bnb: "binancecoin",
  sol: "solana",
  xrp: "ripple",
};

export default function CryptoPage() {
  const router = useRouter();
  const { symbol } = router.query;
  const [crypto, setCrypto] = useState<CryptoDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addCrypto } = useCryptoStore();

  useEffect(() => {
    if (!symbol || typeof symbol !== "string") return;

    const coinId = cryptoMap[symbol.toLowerCase()] || symbol.toLowerCase();

    const fetchCryptoDetails = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: { vs_currency: "usd", ids: coinId },
        });

        if (response.data.length === 0) {
          setError("Crypto not found");
        } else {
          const fetchedCrypto = response.data[0];
          setCrypto(fetchedCrypto);
          addCrypto(fetchedCrypto.id, fetchedCrypto.name, fetchedCrypto.symbol, fetchedCrypto.image);
        }
      } catch (err) {
        console.error("Error fetching crypto details:", err);
        setError("Failed to fetch crypto details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [symbol, addCrypto]);

  if (loading) return <p className="text-center text-gray-300">Loading...</p>;
  if (error) return <p className="text-center text-red-400">{error}</p>;
  if (!crypto) return <p className="text-center text-gray-300">No data available.</p>;

  return (
    <div className="w-[96vw] mx-auto m-5 flex flex-col items-center bg-gradient-to-r from-stone-500 to-stone-700 min-h-screen px-6">
      {/* Crypto Info Card */}
      <div className="max-w-6xl mt-8 w-full bg-stone-600 shadow-xl border border-stone-500 rounded-lg p-6 text-gray-200">
      <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Image
          src={`/crypto-logos/${crypto.id}.jpg`}
          alt={crypto.name}
          width={80}
          height={80}
          className="mr-4 rounded-lg border border-gray-500"
        />
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-100">
            {crypto.name} ({crypto.symbol.toUpperCase()})
          </h1>
          <p className="text-sm md:text-lg text-amber-400 mt-2">
            Market Cap: ${crypto.market_cap.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Price Info */}
      <div className="text-right">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-100">
          Price: ${crypto.current_price.toLocaleString()}
        </h2>
        <p
          className={`text-lg mt-2 ${
            crypto.price_change_percentage_24h < 0 ? "text-red-400" : "text-green-400"
          }`}
        >
          {crypto.price_change_percentage_24h.toFixed(2)}% (24h)
        </p>
      </div>
    </div>

    {/* Other Stats in Grid */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
      <p className="p-4 bg-stone-700 rounded-lg shadow-md">
        🔼 High (24h): <span className="font-semibold">${crypto.high_24h.toLocaleString()}</span>
      </p>
      <p className="p-4 bg-stone-700 rounded-lg shadow-md">
        🔽 Low (24h): <span className="font-semibold">${crypto.low_24h.toLocaleString()}</span>
      </p>
      <p className="p-4 bg-stone-700 rounded-lg shadow-md">
        📊 Total Volume: <span className="font-semibold">${crypto.total_volume.toLocaleString()}</span>
      </p>
    </div>

    {/* Centered Back Button */}
    <div className="mt-8 flex justify-center">
      <button
        onClick={() => router.push("/")}
        className="bg-amber-400 hover:bg-amber-500 active:scale-95 transition-all text-stone-900 text-lg font-semibold rounded-full px-6 py-3 cursor-pointer"
      >
        Back to Home
      </button>
      </div>
      </div>

      {/* Recently Viewed Cryptos - Centered */}
      <div className="w-full flex justify-center">
        <CryptoSlider />
      </div>
    </div>
  );
}
