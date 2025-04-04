import { renderHook, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useCryptoData from "../hooks/useCryptoData";

const mock = new MockAdapter(axios);

describe("useCryptoData Hook", () => {
  afterEach(() => {
    mock.reset();
  });

  test("fetches and updates crypto list successfully", async () => {
    const mockData = [
      { id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 50000 },
    ];
    mock.onGet(/\/coins\/markets/).reply(200, mockData);

    const { result } = renderHook(() => useCryptoData("usd"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.cryptoList).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  test("handles API errors correctly", async () => {
    mock.onGet(/\/coins\/markets/).reply(500);

    const { result } = renderHook(() => useCryptoData("usd"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.cryptoList).toEqual([]);
    expect(result.current.error).toBe("Failed to fetch data. Please try again later.");
  });

  test("updates data when currency changes", async () => {
    const mockDataUSD = [{ id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 50000 }];
    const mockDataINR = [{ id: "bitcoin", symbol: "btc", name: "Bitcoin", current_price: 4000000 }];

    mock.onGet(/\/coins\/markets/).reply((config) => {
      if (config.params.vs_currency === "usd") return [200, mockDataUSD];
      if (config.params.vs_currency === "inr") return [200, mockDataINR];
      return [400];
    });

    const { result, rerender } = renderHook(({ currency }) => useCryptoData(currency), {
      initialProps: { currency: "usd" },
    });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.cryptoList).toEqual(mockDataUSD);

    rerender({ currency: "inr" });

    await waitFor(() => expect(result.current.cryptoList).toEqual(mockDataINR));
  });
});
