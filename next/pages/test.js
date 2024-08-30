import React from 'react'
import Header from '@/components/Header/Header'
import Footer from '@/components/footer/footer'
import SortSearch from '@/components/product-list/sortSearch/SortSearch'

export default function Page() {
  return (
    <>
      <Header />
      <SortSearch />
      <Footer />
    </>
  )
}
