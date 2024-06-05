"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import dynamic from "next/dynamic";
const AuthProviderComponent = dynamic(() => import("@/provider/AuthProvider"), {
  ssr: false,
});
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <AuthProviderComponent>{children}</AuthProviderComponent>
    </NextThemesProvider>
  );
}
