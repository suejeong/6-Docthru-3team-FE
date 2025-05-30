import "./globals.css";
import localFont from "next/font/local";
import DevNavigation from "@/components/DevNavigation";
import Providers from "./provider";

const pretendard = localFont({
  src: "../assets/font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

const quanticoRegular = localFont({
  src: "../assets/font/QuanticoRegular.ttf",
  display: "swap",
  weight: "400",
  variable: "--font-quantico-regular"
});

const quanticoBold = localFont({
  src: "../assets/font/QuanticoBold.ttf",
  display: "swap",
  weight: "700",
  variable: "--font-quantico-bold"
});

export const metadata = {
  title: "Docthur - 독스루",
  description: "개발문서 번역 플랫폼",
  keywords: ["번역", "개발 문서", "Docthur", "Docs", "번역 플랫폼", "개발 원서 번역", "개발 번역"],
  authors: [{ name: "Docthur", url: ["https://6-docthru-3team-fe-dev.vercel.app/", "https://6-docthru-3team-fe-dun.vercel.app/"] }],
  creator: "Docthur",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Docthur - 개발문서 번역 플랫폼",
    description: "전 세계 개발 문서를 한국어로 쉽게 이해하세요.",
    url: ["https://6-docthru-3team-fe-dev.vercel.app/", "https://6-docthru-3team-fe-dun.vercel.app/"],
    siteName: "Docthur",
    images: [
      {
        url: "/og-image.webp",
        width: 736,
        height: 368,
        alt: "Docthur 서비스 소개 이미지"
      }
    ],
    locale: "ko_KR",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Docthur - 개발문서 번역 플랫폼",
    description: "전 세계 개발 문서를 한국어로 쉽게 이해하세요.",
    images: ["/og-image.webp"]
  },
  metadataBase: new URL("https://6-docthru-3team-fe-dev.vercel.app/")
};

// RootLayout을 async 함수로 변경하여 서버 사이드에서 데이터 페칭 가능하게 함
export default async function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="description" content="전 세계 개발 문서를 한국어로 쉽게 이해하세요." />
        <meta property="og:url" content="https://6-docthru-3team-fe-dev.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Docthur - 개발 문서 번역 플랫폼" />
        <meta property="og:description" content="전 세계 개발 문서를 한국어로 쉽게 이해하세요." />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Docthur - 개발 문서 번역 플랫폼" />
        <meta name="twitter:description" content="전 세계 개발 문서를 한국어로 쉽게 이해하세요." />
        <meta name="twitter:image" content="/og-image.png" />
        <link rel="icon" href="/favicon.svg" />
        <link rel="canonical" href="https://6-docthru-3team-fe-dev.vercel.app/" />
      </head>
      <link rel="icon" href="/favicon.svg" />
      <body className={`${pretendard.variable} font-pretendard flex min-h-screen flex-col antialiased`}>
        <Providers>
          <main className="flex-grow">{children}</main>
        </Providers>
        <DevNavigation />
      </body>
    </html>
  );
}
