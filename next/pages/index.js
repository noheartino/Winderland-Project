import React from "react";
import HomeNav from "@/components/Header/HomeHeader";
import Footer from "@/components/footer/footer";
import Homepage from "@/components/home/home";
import Arrtotop from "@/components/Header/arr";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>醺迷仙園Winderland葡萄酒專門店｜仙園裡，醉美的迷茫</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <HomeNav />
      <Homepage />
      <Footer />
      <Arrtotop />
    </>
  );
}
