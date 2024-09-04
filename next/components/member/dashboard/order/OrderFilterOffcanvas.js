import React, { useState } from 'react';
import { Offcanvas, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import styles from '@/components/member/dashboard/order/OrderFilterOffcanvas.module.css'

export default function OrderFilterOffcanvas({ onFilterChange }) {
    const [show, setShow] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [dateRange, setDateRange] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleStatusChange = (status, isSpecial = false) => {
        if (isSpecial) {
            setSelectedStatus(prevStatus => prevStatus === status ? '' : status);
        } else {
            setSelectedStatus(status);
        }
    };
    // const handleSpecialStatusChange = (status) => {
    //     setSpecialStatus(prevStatus => prevStatus === status ? '' : status);
    // };
    const handleDateRangeChange = (e) => {
        setDateRange(e.target.value);
        // 根據選擇的日期範圍設置開始和結束日期
        const today = new Date();
        let start = new Date();
        switch(e.target.value) {
            case 'halfYear':
                start.setMonth(today.getMonth() - 6);
                break;
            case 'oneYear':
                start.setFullYear(today.getFullYear() - 1);
                break;
            case 'moreThanYear':
                start.setFullYear(today.getFullYear() - 2); // 假設"一年以上"表示兩年
                break;
            default:
                start = '';
        }
        setStartDate(start ? start.toISOString().split('T')[0] : '');
        setEndDate(today.toISOString().split('T')[0]);
    };
    const handleSubmit = () => {
        const filters = {
            status: selectedStatus ? [selectedStatus] : [],
            startDate,
            endDate
        };
        onFilterChange(filters);
        handleClose();
    };

    const handleReset = () => {
        setSelectedStatus('');
        setDateRange('');
        setStartDate('');
        setEndDate('');
        onFilterChange({ status: [], startDate: '', endDate: '' });
    };

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
                    <Form.Select 
                    className={`${styles.select} mb-3 mb-5`} 
                    onChange={(e) => handleStatusChange(e.target.value)}
                    value={selectedStatus}
                    >
                        <option>選擇訂單狀態</option>
                        <option value="出貨準備中">出貨準備中</option>
                        <option value="已出貨">已出貨</option>
                        <option value="已送達">已送達</option>
                        <option value="已完成">已完成</option>
                    </Form.Select>

                    <p className={`${styles.offcanvasBodyTitle}`}>特殊狀態</p>
                    <div className={`${styles.buttonGroups}`}>
                        <div className={`d-flex mb-2`}>
                        <Button 
                                variant={selectedStatus === "尚未付款" ? "secondary" : "outline-secondary"}
                                className={`me-2 ${styles.button} ${selectedStatus === "尚未付款" ? styles.activeButton : ''}`}
                                onClick={() => handleStatusChange("尚未付款", true)}>
                                尚未付款
                            </Button>
                            <Button 
                                variant={selectedStatus === "訂單已取消" ? "secondary" : "outline-secondary"}
                                className={`${styles.button} ${selectedStatus === "訂單已取消" ? styles.activeButton : ''}`}
                                onClick={() => handleStatusChange("訂單已取消", true)}>
                                訂單已取消
                            </Button>
                        </div>
                        
                    </div>

                    <p className={`${styles.offcanvasBodyTitle} mt-3`}>下單日期</p>
                    <Form.Select 
                    className={`${styles.select} mb-3`}
                    onChange={handleDateRangeChange} 
                    value={dateRange}>
                        <option value="">選擇下單日期</option>
                        <option value="halfYear">近半年</option>
                        <option value="oneYear">一年內</option>
                        <option value="moreThanYear">一年以上</option>
                    </Form.Select>

                    <div className={`${styles.inputDateGroup} d-flex mb-5`}>
                        <Form.Control 
                        type="date" 
                        className={`${styles.input} mb-2`} 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        />
                        <span className={`align-self-center ms-2`}>-</span>
                        <Form.Control 
                        type="date" 
                        className={`${styles.input} ms-3`} 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}

                        />
                    </div>

                    <div className={`${styles.buttonEnd} d-flex justify-content-center`}>
                        <Button 
                        variant="secondary" 
                        className={`${styles.button} me-5`}
                        onClick={handleReset}
                        >重設</Button>
                        <Button 
                        variant="primary" 
                        className={`${styles.button} `}
                        onClick={handleSubmit}>送出篩選</Button>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
}
