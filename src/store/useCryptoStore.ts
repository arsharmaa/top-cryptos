import { create } from "zustand";

interface CryptoStore {
  recentCryptos: string[];
  addCrypto: (id: string) => void;
}

export const useCryptoStore = create<CryptoStore>((set) => ({
  recentCryptos: [],
  addCrypto: (id) =>
    set((state) => ({
      recentCryptos: [...new Set([id, ...state.recentCryptos])].slice(0, 10),
    })),
}));
