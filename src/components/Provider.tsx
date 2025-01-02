"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";

const client = new QueryClient();
const Provider = ({ children }: { children: ReactNode }) => {

  return (
    <KindeProvider
      domain="your-kinde-domain"
      clientId={process.env.KINDE_CLIENT_ID}
      redirectUri={process.env.KINDE_POST_LOGIN_REDIRECT_URL}
      logoutUri={process.env.KINDE_POST_LOGOUT_REDIRECT_URL}
      cookieOptions={{
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      }}
    >
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </KindeProvider>
  );
};

export default Provider;
