import "~/styles/globals.css";

import { type ReactNode } from "react";
import NavBar from "~/app/_components/nav/navbar";

export const metadata = {
  title: "Picsou",
  description: "Picsou app by Ugo Laurit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="fr">
      <body className="flex w-full max-w-full flex-row bg-polar-night-100 text-snow-storm-200">
        <NavBar />
        <div className="flex w-full flex-col px-12 py-8">{children}</div>
      </body>
    </html>
  );
};

export default RootLayout;
