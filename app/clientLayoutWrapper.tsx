"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Providers } from "./providers";
import { store } from "./store/store";

export function ClientLayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        {children}
      </Providers>
    </Provider>
  );
}
