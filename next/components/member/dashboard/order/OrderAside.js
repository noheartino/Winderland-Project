import React from 'react'

export default function OrderAside() {
  return (
  <>
      <aside>
            <hr />
            <ul className="list-unstyled ">
              <span>訂單狀態</span>
              <li>出貨準備中</li>
              <li>已出貨</li>
              <li>已送達</li>
              <li>已完成</li>
            </ul>
            <hr />
            <ul className="list-unstyled ">
              <span>其他狀態</span>
              <li>尚未付款</li>
              <li>貨源不足</li>
              <li>包裹損毀</li>
              <li>訂單異常</li>
              <li>已取消</li>
            </ul>
            <hr />
            <span>日期區間</span>
            <br />
            <div className="input-date-gruop">
              <input type="date" />-<input type="date" />
            </div>
            <br />
            <button>日期篩選</button>
          </aside>
  </>
  )
}
