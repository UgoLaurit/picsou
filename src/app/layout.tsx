import "~/styles/globals.css";

import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import { type ReactNode } from "react";


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
      <body>
        <TRPCReactProvider cookies={cookies().toString()}>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

export default RootLayout