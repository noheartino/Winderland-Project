import React, { useState, useEffect } from 'react';
import styles from '@/components/member/dashboard/order/OrderCardDetailComment.module.css'
import Swal from 'sweetalert2'

export default function OrderCardDetailComment({ orderUuid, orderStatus }) {
    const [commentableItems, setCommentableItems] = useState([]);
    const [comments, setComments] = useState({});
    const [submittedComments, setSubmittedComments] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hoveredRatings, setHoveredRatings] = useState({});


    // useEffect(() => {
    //     fetchCommentableItems();
    // }, [orderUuid]);


    // const fetchCommentableItems = async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await fetch(`http://localhost:3005/api/orders/commentable-items/${orderUuid}`, {
    //             credentials: 'include',
    //         });

    //         if (!response.ok) {
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Failed to fetch commentable items');
    //         }

    //         const data = await response.json();
    //         console.log('Fetched commentable items:', data.data); // 添加日誌
    //         setCommentableItems(data.data);
    //         setComments(data.data.reduce((acc, item) => ({
    //             ...acc,
    //             [item.item_id]: {
    //                 rating: item.existing_rating || 0,
    //                 text: item.existing_comment || ''
    //             }
    //         }), {}));
    //         setSubmittedComments(data.data.reduce((acc, item) => ({
    //             ...acc,
    //             [item.item_id]: item.is_commented ? {
    //                 rating: item.existing_rating,
    //                 text: item.existing_comment
    //             } : null
    //         }), {}));
    //     } catch (err) {
    //         console.error('Error fetching commentable items:', err);
    //         setError(err.message);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };
    
    //可評論
    useEffect(() => {
        if (orderStatus === '已完成') {
            fetchCommentableItems();
        } else {
            setIsLoading(false);
        }
    }, [orderUuid, orderStatus]);

    const fetchCommentableItems = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`http://localhost:3005/api/orders/commentable-items/${orderUuid}`, {
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch commentable items');
            }

            const data = await response.json();
            setCommentableItems(data.data);
            setComments(data.data.reduce((acc, item) => ({
                ...acc,
                [item.item_id]: {
                    rating: item.existing_rating || 0,
                    text: item.existing_comment || ''
                }
            }), {}));
            setSubmittedComments(data.data.reduce((acc, item) => ({
                ...acc,
                [item.item_id]: item.is_commented ? {
                    rating: item.existing_rating,
                    text: item.existing_comment
                } : null
            }), {}));
        } catch (err) {
            console.error('Error fetching commentable items:', err);
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }; 

    // 星星評價
    const handleRatingChange = (itemId, rating) => {
        if (!submittedComments[itemId]) {
            setComments(prev => ({ ...prev, [itemId]: { ...prev[itemId], rating } }));
            setHoveredRatings(prev => ({ ...prev, [itemId]: null }));
        }
    };

    const handleRatingHover = (itemId, rating) => {
        if (!submittedComments[itemId]) {
            setHoveredRatings(prev => ({ ...prev, [itemId]: rating }));
        }
    };

    const handleRatingLeave = (itemId) => {
        if (!submittedComments[itemId]) {
            setHoveredRatings(prev => ({ ...prev, [itemId]: null }));
        }
    };

    // 渲染評價星星的函數
    const renderRatingStars = (rating) => {
        return (
            <span className={styles.ratingStars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className={styles.ratingStar}>
                        {star <= rating ? '★' : '☆'}
                    </span>
                ))}
            </span>
        );
    };

    const handleCommentChange = (itemId, text) => {
        if (!submittedComments[itemId]) {
            setComments(prev => ({ ...prev, [itemId]: { ...prev[itemId], text } }));
        }
    };

    const handleSubmit = async (itemId, itemType) => {
        if (submittedComments[itemId]) return;

        try {
            const response = await fetch('http://localhost:3005/api/orders/submit-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    orderUuid,
                    itemId,
                    itemType,
                    rating: comments[itemId].rating,
                    commentText: comments[itemId].text
                }),
                credentials: 'include',
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit comment');
            }
            setSubmittedComments(prev => ({ ...prev, [itemId]: comments[itemId] }));

            // 使用 SweetAlert2 顯示成功訊息
            await Swal.fire({
                icon: 'success',
                title: '評論提交成功',
                text: '感謝您的寶貴意見！',
                confirmButtonText: '確定',
                confirmButtonColor: '#60464C',
            });
        } catch (err) {
            console.error('Error submitting comment:', err);
            setError(err.message);

            // 使用 SweetAlert2 顯示錯誤訊息
            await Swal.fire({
                icon: 'error',
                title: '評論提交失敗',
                text: '抱歉，提交評論時發生錯誤。請稍後再試。',
                confirmButtonText: '確定',
                confirmButtonColor: '#60464C',
            });
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (orderStatus !== '已完成') return null;
    if (commentableItems.length === 0) return <div className={styles.noCommentItems}>沒有可評論的商品</div>;

    return (
        <>
            {/* desk */}
            <div className={`${styles.orderComment} d-none d-lg-block `}>

                {commentableItems.map(item => (
                    <div key={item.item_id} className={`mb-3 ${styles.productComment}`}>

                        <h3 className={styles.productTitle}>
                            <span className={styles.itemType}>
                                {item.item_type === 'product' ? '商品' : '課程'}－
                            </span>
                            {item.item_name}
                            {item.item_type === 'product' && (
                                <span className={styles.productDetails}>
                                    {item.capacity && `${item.capacity}ml`}
                                    {item.years && ` ${item.years}年`}
                                    {item.country_name && ` ${item.country_name}`}
                                </span>
                            )}
                            {item.item_type === 'class' && item.teacher_name && (
                                <span className={styles.classDetails}>
                                    講師：{item.teacher_name}
                                </span>
                            )}

                        </h3>

                        {submittedComments[item.item_id] ? (

                            <div className={styles.commentDone}>
                                <p >已成功送出評論</p>
                                <p className='ms-5'>
                                    {renderRatingStars(submittedComments[item.item_id].rating)}
                                </p>
                                <div className={`ms-5 ${styles.commentDoneText}`}>
                                    {submittedComments[item.item_id].text}
                                </div>
                            </div>
                        ) : (
                            <div className="comment-area d-flex">
                                <div className={`mb-3 ${styles.commentText}`}>
                                    <label htmlFor={`comment-${item.item_id}`} className={`form-label ${styles.formLabel}`}>
                                        {item.item_type === 'product' ? '商品評論' : '課程評論'}
                                    </label>
                                    <textarea
                                        id={`comment-${item.item_id}`}
                                        className={`form-control ${styles.textArea}`}
                                        rows={4}
                                        value={comments[item.item_id]?.text || ''}
                                        onChange={(e) => handleCommentChange(item.item_id, e.target.value)}
                                    />
                                </div>

                                <div className={`mb-3 ${styles.commentRating}`}>


                                    {/* 星級評分 */}
                                    <label htmlFor={`rating-${item.item_id}`} className={`form-label ${styles.ratingLabel}`}>
                                        {item.item_type === 'product' ? '商品評分' : '課程評分'}
                                    </label>

                                    <div className="div">
                                        <div
                                            id={`rating-${item.item_id}`}
                                            className={`${styles.star} ${styles.starRating}`}
                                            onMouseLeave={() => handleRatingLeave(item.item_id)}
                                        >
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <span
                                                    key={star}
                                                    onClick={() => handleRatingChange(item.item_id, star)}
                                                    onMouseEnter={() => handleRatingHover(item.item_id, star)}
                                                    className={star <= (hoveredRatings[item.item_id] || comments[item.item_id]?.rating || 0) ? styles.active : ''}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="div">
                                        <button
                                            className={styles.commentBtn}
                                            onClick={() => handleSubmit(item.item_id, item.item_type)}
                                        >
                                            送出
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* rwd */}
            <div className={`${styles.orderComment} d-block d-lg-none `}>

                {commentableItems.map(item => (
                    <div key={item.item_id} className={`mb-3 ${styles.productComment}`}>

                        <h3 className={styles.productTitle}>
                            <span className={styles.itemType}>
                                {item.item_type === 'product' ? '商品' : '課程'}－
                            </span>
                            {item.item_name}
                            {item.item_type === 'product' && (
                                <span className={styles.productDetails}>
                                    {item.capacity && `${item.capacity}ml`}
                                    {item.years && ` ${item.years}年`}
                                    {item.country_name && ` ${item.country_name}`}
                                </span>
                            )}
                            {item.item_type === 'class' && item.teacher_name && (
                                <span className={styles.classDetails}>
                                    講師：{item.teacher_name}
                                </span>
                            )}

                        </h3>

                        {submittedComments[item.item_id] ? (

                            <div className={styles.commentDone}>
                                <p >已成功送出評論</p>
                                <p className='ms-5'>
                                    {renderRatingStars(submittedComments[item.item_id].rating)}
                                </p>
                                <div className={`ms-5 ${styles.commentDoneText}`}>
                                    {submittedComments[item.item_id].text}
                                </div>
                            </div>
                        ) : (
                            <div className="comment-area">
                                <div className={`mb-3 ${styles.commentText} d-flex`}>
                                    <label htmlFor={`comment-${item.item_id}`} className={`form-label ${styles.formLabel} me-2`}>
                                        {item.item_type === 'product' ? '商品評論' : '課程評論'}
                                    </label>
                                    <textarea
                                        id={`comment-${item.item_id}`}
                                        className={`form-control ${styles.textArea}`}
                                        rows={4}
                                        value={comments[item.item_id]?.text || ''}
                                        onChange={(e) => handleCommentChange(item.item_id, e.target.value)}
                                    />
                                </div>

                                <div className={`mb-3 ${styles.commentRating} d-flex align-items-center`}>


                                    {/* 星級評分 */}
                                    <label htmlFor={`rating-${item.item_id}`} className={`form-label ${styles.ratingLabel}`}>
                                        {item.item_type === 'product' ? '商品評分' : '課程評分'}
                                    </label>

                                    <div className="div">
                                        <div
                                            id={`rating-${item.item_id}`}
                                            className={`${styles.star} ${styles.starRating}`}
                                            onMouseLeave={() => handleRatingLeave(item.item_id)}
                                        >
                                            {[5, 4, 3, 2, 1].map(star => (
                                                <span
                                                    key={star}
                                                    onClick={() => handleRatingChange(item.item_id, star)}
                                                    onMouseEnter={() => handleRatingHover(item.item_id, star)}
                                                    className={star <= (hoveredRatings[item.item_id] || comments[item.item_id]?.rating || 0) ? styles.active : ''}
                                                >
                                                    ★
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="div">
                                        <button
                                            className={styles.commentBtn}
                                            onClick={() => handleSubmit(item.item_id, item.item_type)}
                                        >
                                            送出
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}