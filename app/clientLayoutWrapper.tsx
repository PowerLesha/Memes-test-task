"use client";

import { ReactNode, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { setMemes } from "./store/slices/memeSlice";
import { Providers } from "./providers";
import { fakeMemes } from "./data";
import { Spinner } from "@heroui/react";

const fakeFetch = async (): Promise<typeof fakeMemes> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeMemes);
    }, 2000);
  });
};

export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeMemes = async () => {
      const stored = localStorage.getItem("memes");

      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch(setMemes(parsed));
        setLoading(false);
      } else {
        try {
          const data = await fakeFetch();
          dispatch(setMemes(data));
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch memes:", error);
          setLoading(false);
        }
      }
    };

    initializeMemes();
  }, [dispatch]);

  return (
    <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </Providers>
  );
}
