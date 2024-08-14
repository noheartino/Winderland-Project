import React from 'react'

export default function ArticleDateSearch() {
  return (
    <>
      <div className="a-date row mb-5">
              <div className="a-date-block col">
                <input
                  className="a-date-input py-2"
                  type="text"
                  placeholder="2024.02.01"
                />
              </div>
              -
              <div className="a-date-block col">
                <input
                  className="a-date-input py-2"
                  type="text"
                  placeholder="2024.09.01"
                />
              </div>
            </div>
    </>
  )
}
