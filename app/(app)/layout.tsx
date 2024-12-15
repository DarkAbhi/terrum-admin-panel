import "./globals.css";
import {Inter} from "next/font/google";
import LayoutProviders from "@/components/layout-providers";
import {getServerSession} from "next-auth";
import {authOptions} from "./api/auth/[...nextauth]/options";

const inter = Inter({subsets: ["latin"]});

export const metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    return (
        <html lang="en">
        <body className={inter.className}>
        <LayoutProviders session={session}>{children}</LayoutProviders>
        </body>
        </html>
    );
}
