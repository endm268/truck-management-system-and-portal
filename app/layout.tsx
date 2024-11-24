import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ClientSessionProvider from "@/provider/session-provider"; // Import the client-side provider

export const metadata: Metadata = {
  title: "Asset System",
  description: "Asset Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning={true}>
      <body className="font-tajawal">
        <ClientSessionProvider>
          {" "}
          {/* Client-side SessionProvider */}
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
            {children}
          {/* </ThemeProvider> */}
        </ClientSessionProvider>
      </body>
    </html>
  );
}
