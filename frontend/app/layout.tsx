import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Uncial_Antiqua } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant",
});

const uncial = Uncial_Antiqua({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-uncial",
});

export const metadata: Metadata = {
    title: "Gondor Chic — Élégance Intemporelle",
    description: "Plateforme e-commerce Gondor Chic",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="fr"
            className={`${cinzel.variable} ${cormorant.variable} ${uncial.variable}`}
        >
        <body className="antialiased min-h-screen flex flex-col">{children}</body>
        </html>
    );
}