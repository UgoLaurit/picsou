import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { type ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Picsou",
  description: "Picsou app by Ugo Laurit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout =({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <html lang="fr">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

export default RootLayout