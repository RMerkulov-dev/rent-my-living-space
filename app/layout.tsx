import { Nunito } from "next/font/google";
import "./globals.css";
import NavBar from "@/app/components/navbar/NavBar";

import React from "react";
import RegisterModal from "@/app/components/modals/RegisterModal";
import LoginModal from "@/app/components/modals/LoginModal";
import ToasterProvider from "@/app/providers/ToasterProvider";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const metadata = {
  title: "RMLS",
  description: "Find the best place for you.",
};

const font = Nunito({
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        <NavBar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
