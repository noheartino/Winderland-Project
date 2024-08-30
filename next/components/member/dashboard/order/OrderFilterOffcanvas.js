import React, { useState } from 'react';
import { Offcanvas, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from '@/components/member/dashboard/order/OrderFilterOffcanvas.module.css'

export default function OrderFilterOffcanvas() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className={`${styles.orderFilter} `} onClick={handleShow}>
                <FontAwesomeIcon icon={faFilter} />
            </div>

            <Offcanvas show={show} onHide={handleClose} placement="end" className={styles.offcanvasCustomWidth}>
                <Offcanvas.Header closeButton className={`${styles.offcanvasHeader} `} >
                    <FontAwesomeIcon icon={faFilter} />
                    <Offcanvas.Title className={`${styles.offcanvasHeaderTitle} `}>篩選項目</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body className={`${styles.offcanvasBody} `} >
                    <p className={`${styles.offcanvasBodyTitle}`}  >訂單狀態</p>
                    <Form.Select className={`${styles.select} mb-3 mb-5`} >
                    <option>選擇訂單狀態</option>
            <option value="completed">已完成</option>
            <option value="shipping">運送中</option>
            <option value="picking">撿貨中</option>
                    </Form.Select>

                    <p className={`${styles.offcanvasBodyTitle}`}>特殊狀態</p>
                    <div className={`${styles.buttonGroups}`}>
            <div className={`d-flex mb-2`}>
              <Button variant="outline-secondary" className={`me-2 ${styles.button}`}>尚未付款</Button>
              <Button variant="outline-secondary" className={` ${styles.button}`}>包裹毀損</Button>
            </div>
            <div className={`d-flex`}>
              <Button variant="outline-secondary" className={`me-2 ${styles.button}`}>貨源不足</Button>
              <Button variant="outline-secondary" className={`me-2 ${styles.button}`}>訂單異常</Button>
              <Button variant="outline-secondary" className={` ${styles.button}`}>已取消</Button>
            </div>
            </div>

            <p className={`${styles.offcanvasBodyTitle} mt-3`}>下單日期</p>
          <Form.Select className={`${styles.select} mb-3`}>
            <option>選擇下單日期</option>
            <option value="halfYear">近半年</option>
            <option value="oneYear">一年內</option>
            <option value="moreThanYear">一年以上</option>
          </Form.Select>

                    <div className={`${styles.inputDateGroup} d-flex mb-5`}>
                        <Form.Control type="date" className={`${styles.input} mb-2`} />
                        <span className={`align-self-center ms-2`}>-</span>
                        <Form.Control type="date" className={`${styles.input} ms-3`} />
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
