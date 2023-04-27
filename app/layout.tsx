import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/navbar/NavBar";

export const metadata = {
  title: "RMLS",
  description: "Find the best place for you.",
};

const font = Nunito({
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
