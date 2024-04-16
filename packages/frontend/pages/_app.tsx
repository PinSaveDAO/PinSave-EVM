import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { NextComponentType } from "next";
import type AppProps from "next/app";
import { Analytics } from "@vercel/analytics/react";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { Chain, optimism, mainnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import LayoutApp from "@/components/Layout";
import { OrbisProvider } from "context";

type NextAppProps<P = any> = AppProps & {
  pageProps: P;
  Component: NextComponentType & {
    getLayout?: (page: React.ReactElement) => React.ReactNode;
  };
} & Omit<AppProps<P>, "pageProps">;

export interface MyWalletOptions {
  chains: Chain[];
}

const { chains, publicClient } = configureChains(
  [optimism, mainnet],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: (chain) => {
        return { http: chain.rpcUrls.default.http[0] };
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "PinSave",
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_ID,
  chains,
});

function MyApp({ Component, pageProps }: NextAppProps) {
  const queryClient = new QueryClient();
  const livepeerClient = useMemo(() => {
    return createReactClient({
      provider: studioProvider({
        apiKey: process.env.NEXT_PUBLIC_LIVEPEER,
      }),
    });
  }, []);

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
  });

  return (
    <MantineProvider
      theme={{
        colorScheme: "light",
        primaryColor: "green",
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={wagmiConfig}>
          <NotificationsProvider>
            <RainbowKitProvider chains={chains}>
              <LivepeerConfig client={livepeerClient}>
                <OrbisProvider>
                  <LayoutApp>
                    <Component {...pageProps} />
                  </LayoutApp>
                </OrbisProvider>
              </LivepeerConfig>
            </RainbowKitProvider>
          </NotificationsProvider>
        </WagmiConfig>
      </QueryClientProvider>
      <Analytics />
    </MantineProvider>
  );
}

export default MyApp;
