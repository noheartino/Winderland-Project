import React, { useState } from 'react';
import Image from 'next/image';

const OrderAccordion = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (

        <div className="order-card card">
            <div className="card-body d-flex">
                {/* ... 訂單摘要信息 ... */}
            </div>
            
            <button
                type="button"
                className="card-footer text-muted d-flex justify-content-between align-items-center collapsible"
                onClick={toggleAccordion}
            >
                <div>2024.07.10</div>
                <div>訂單編號 ＃a441</div>
                <div>
                    訂單詳情
                    <i className={`fa-solid fa-chevron-${isOpen ? 'up' : 'down'}`} />
                </div>
            </button>
            {isOpen && (
                <div className="content order-detail-card">
                    {/* 手風琴內容 */}
                    <div className="order-detail-title d-flex p-3">
                        <p style={{ marginRight: '60%', marginLeft: '5%' }}>品項</p>
                        <p style={{ marginRight: '10%' }}>件數</p>
                        <p style={{ marginRight: '10%' }}>小計</p>
                        <i className="fa-solid fa-chevron-up" />
                    </div>
                    <div className="order-detail-content">
                        {/* 訂單內容 */}
                        <OrderItem
                            imageSrc="/images/member/order1.png"
                            title="皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園 紅酒 2017"
                            capacity="750ml / 法國"
                            year="2017年"
                            price={5999}
                            quantity={3}
                        />
                        <OrderItem
                            imageSrc="/images/member/order-p1.png"
                            title="皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園 紅酒 2017"
                            capacity="750ml / 法國"
                            year="2017年"
                            price={5999}
                            quantity={3}
                        />
                        {/* 其他內容 */}
                        <hr style={{ border: '1px solid #D4C0C0', margin: '0 15px' }} />
                        <UsedSection />
                        <GetSection />
                        <hr style={{ border: '1px solid #D4C0C0', margin: '0 15px' }} />
                        <CommentSection />
                    </div>
                </div>
            )}
        </div>
    );
};

const OrderItem = ({ imageSrc, title, capacity, year, price, quantity }) => (
    <div className="order-card card">
        <div className="card-body d-flex">
            <Image
                src={imageSrc}
                alt=""
                width={50}
                height={50}
                className="order-img"
            />
            <div className="order-detail d-flex justify-content-between align-items-center">
                <div className="order-detail-p">
                    <span>{title}</span>
                    <div className="p-detail d-flex justify-content-between align-items-center">
                        <div className="p-category">
                            <p className="p-capacity">{capacity}</p>
                            <p className="p-year">{year}</p>
                        </div>
                        <div className="p-price">NT$&nbsp;{price}</div>
                    </div>
                </div>
                <div className="order-detail-n">{quantity}</div>
                <div className="order-detail-t">
                    <p>NT$&nbsp;{price * quantity}</p>
                </div>
            </div>
        </div>
    </div>
);

const UsedSection = () => (
    <div className="order-used d-flex">
        <h5 className="order-used-label">本次使用</h5>
        <div className="used-coupon">
            <div className="coupon-card d-flex align-items-center" style={{ marginLeft: '20%' }}>
                <div className="coupon-ticket">
                    <div className="coupon-n">滿萬元現折350元</div>
                </div>
            </div>
        </div>
        <div className="used-wpoint">
            <div className="point d-flex">
                <div className="point-img" />
                <div className="point-text">
                    <p>W Points</p>
                    <span>-1000 P</span>
                </div>
            </div>
        </div>
    </div>
);

const GetSection = () => (
    <div className="order-get d-flex">
        <h5 className="order-used-label">本次獲得</h5>
        <div className="point d-flex">
            <div className="point-img" />
            <div className="point-text">
                <p>W Points</p>
                <span>1328 P</span>
            </div>
        </div>
    </div>
);

const CommentSection = () => (
    <div className="order-comment">
        <div className="mb-3">
            <select defaultValue="option1" className="form-select form-select-lg">
                <option value="option1">選擇評論商品</option>
                <option value="">皮耶侯奇酒莊 菜刀酒莊 夜聖喬治村卡維一級園紅酒 2017</option>
                <option value="">約瑟夫杜亨酒莊 普里尼蒙哈榭 一級少女園白酒 2019</option>
            </select>
        </div>
        <div className="comment-area d-flex">
            <div className="mb-3 comment-text">
                <label htmlFor="ratingLabel" className="form-label">商品評分</label>
                <textarea className="form-control" rows={6} cols={40} />
            </div>
            <div className="mb-3 comment-rating">
                <label htmlFor="commentLabel" className="form-label">商品評論</label>
                <div className="star">★ ★ ★ ★ ★</div>
                <button className="comment-btn">送出</button>
            </div>
        </div>
    </div>
);

export default OrderAccordion;