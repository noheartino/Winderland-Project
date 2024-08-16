import React, { useState } from 'react';
import { Offcanvas, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from '@/components/member/dashboard/FavoriteFilterOffcanvas.module.css'

export default function FavoriteFilterOffcanvas() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={`${styles.favoriteFilter} `} onClick={handleShow}>
                <FontAwesomeIcon icon={faFilter} />
            </div>

            <Offcanvas show={show} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton className={`${styles.offcanvasHeader} `} >
                    <FontAwesomeIcon icon={faFilter} />
                    <Offcanvas.Title className={`${styles.offcanvasHeaderTitle} `}>篩選項目</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className={`${styles.offcanvasBody} `} >
                    <p className={`${styles.offcanvasBodyTitle}`}  >類別</p>
                    <Form.Select className={`${styles.select} mb-3`} >
                        <option>請選擇收藏類別</option>
                        <option value="all">全部</option>
                        <option value="product">商品</option>
                        <option value="course">課程</option>
                        <option value="article">文章</option>
                    </Form.Select>

                    <p className={`${styles.offcanvasBodyTitle}`}>收藏日期</p>
                    <Form.Select  className={`${styles.select} mb-3`}>
                        <option>選擇下單日期</option>
                        <option value="halfYear">近半年</option>
                        <option value="oneYear">一年內</option>
                        <option value="moreThanYear">一年以上</option>
                    </Form.Select>

                    <div className={`${styles.inputDateGroup} d-flex mb-3`}>
                        <Form.Control type="date" className={`${styles.input} mb-2`} />
                        <span className="align-self-center">-</span>
                        <Form.Control type="date" className={`${styles.input} ms-2`} />
                    </div>

                    <div className={`${styles.buttonEnd} d-flex justify-content-center`}>
                        <Button variant="secondary" className={`${styles.button} me-5`}>重設</Button>
                        <Button variant="primary" className={`${styles.button} `}>送出篩選</Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}
