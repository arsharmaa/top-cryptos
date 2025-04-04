import { useState, useEffect } from "react";
import axios from "axios";

export interface Crypto {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
}

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";

export default function useCryptoData(currency = "usd") {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL, {
          params: {
            vs_currency: currency,
            order: "market_cap_desc",
            per_page: 50,
            page: 1,
            sparkline: false,
          },
        });

        setCryptoList(response.data);
      }catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 429) {
            setError("Too many requests. Please wait a moment.");
          }
          setError("Failed to fetch data. Please try again later.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currency]);

  return { cryptoList, loading, error };
}
