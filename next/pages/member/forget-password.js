import React from 'react'
import ForgetPasswordForm from '@/components/member/ForgetPasswordForm'
import Nav from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import Head from "next/head";


export default function ForgetPassword() {
  return (
    <>
    <Head>
          <title>醺迷仙園｜忘記密碼</title>

          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <link rel="icon" href="/logo.png" />
      </Head>
      <Nav />
      <ForgetPasswordForm />
      <Footer />
    </>
  )
}
