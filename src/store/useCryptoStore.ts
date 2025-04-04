import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Crypto {
  id: string;
  name: string;
  symbol: string;
  image: string;
  views: number;
}

interface CryptoStore {
  viewedCryptos: Crypto[];
  addCrypto: (id: string, name: string, symbol: string, image: string) => void;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set) => ({
      viewedCryptos: [],
      addCrypto: (id, name, symbol, image) =>
        set((state) => {
          const existing = state.viewedCryptos.find((c) => c.id === id);

          if (existing) {
            return {
              viewedCryptos: state.viewedCryptos.map((c) =>
                c.id === id ? { ...c, views: c.views + 1 } : c
              ),
            };
          }

          const newList = [{ id, name, symbol, image, views: 1 }, ...state.viewedCryptos].slice(0, 10);
          return { viewedCryptos: newList };
        }),
    }),
    {
      name: "crypto-store", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);
