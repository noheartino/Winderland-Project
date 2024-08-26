import React from 'react'
import Image from 'next/image'

export default function OrderCard() {
  return (
    <>
        <div className=" mb-4 d-flex">
                <Image
                  src="/images/member/order1.png"
                  alt=""
                  width={50}
                  height={50}
                  className="order-img mt-4 ms-4"
                />

                <div className="order-detail mt-4">
                  <table className="table ">
                    <thead>
                      <tr>
                        <th scope="col">總件數</th>
                        <th scope="col">付款方式</th>
                        <th scope="col">狀態</th>
                        <th scope="col">總金額</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ letterSpacing: 5 }}>共2件</td>
                        <td>
                          貨到付款
                          <br />
                          7-11
                        </td>
                        <td>已送達</td>
                        <td style={{ color: 'var(--orange)' }}>
                          NT$ 8,120
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
        </div>
    </>
  )
}
