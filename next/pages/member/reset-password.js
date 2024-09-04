import React from "react";
import ResetPasswordForm from "@/components/member/ResetPasswordForm";
import Nav from "@/components/Header/Header";
import Footer from "@/components/footer/footer";
import Head from "next/head";


export default function ResetPassword() {
  return (
    <>
      <Head>
        <title>醺迷仙園｜重設密碼</title>

        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      <ResetPasswordForm />
      <Footer />
    </>
  );
}
