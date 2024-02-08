import "~/styles/globals.css";

import { type ReactNode } from "react";
import NavBar from "~/app/_components/nav/navbar";
import HeaderBar from "~/app/_components/header/header-bar";

export const metadata = {
  title: "Picsou",
  description: "Picsou app by Ugo Laurit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="flex w-full max-w-full flex-row bg-polar-night-100 text-snow-storm-200">
        <NavBar />
        <div className="w-full">
          <HeaderBar />
          <div className="flex w-full flex-col px-12 py-8">{children}</div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
