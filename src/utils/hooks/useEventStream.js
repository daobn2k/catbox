import { useState, useCallback, useRef } from "react";

const API_URL = `${import.meta.env.VITE_API_DOMAIN}/api/v1/turn-games/polling`;

export const useEventStream = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const abortControllerRef = useRef(null);

  const startListening = useCallback(async () => {
    if (isListening) return;
    setIsListening(true);

    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    try {
      const accessToken = sessionStorage.getItem("accessToken");
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        signal,
      });

      if (!response.ok) throw new Error("Failed to connect to stream");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let buffer = ""; // Lưu dữ liệu đọc được chưa hoàn chỉnh

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const events = buffer.split("\n\n");

        events.forEach((event) => {
          if (!event.trim()) return;

          const lines = event.split("\n");
          let jsonString = lines.find((line) => line.startsWith("data: "));

          if (jsonString) {
            jsonString = jsonString.replace("data: ", "");

            try {
              const parsedData = JSON.parse(jsonString);
              setData((prev) => [...prev, ...parsedData.data]);
            } catch (error) {
              console.error("JSON Parse Error:", error, jsonString);
            }
          }
        });

        buffer = events[events.length - 1];
      }
    } catch (err) {
      console.error("Fetch Error:", err);
      setError(err);
      setIsListening(false);
    }
  }, [isListening]);

  const stopListening = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsListening(false);
  }, []);

  return { data, error, startListening, stopListening, isListening };
};
