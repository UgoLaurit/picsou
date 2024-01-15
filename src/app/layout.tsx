import "~/styles/globals.css";

import { type ReactNode } from "react";

export const metadata = {
  title: "Picsou",
  description: "Picsou app by Ugo Laurit",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="fr">
      <body className="bg-polar-night-100 text-snow-storm-200 px-8 py-6">
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
