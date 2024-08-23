import { useRouter } from 'next/router';
import styles from '@/components/cart/cartObject/CartZero.module.css';

const CartZero = () => {
    const router = useRouter();

    const handleGoHome = () => {
        router.push('/'); // 使用 router.push 直接導航到首頁
    };

    return (
        <main className={styles.CartZero}>
            <div className={`${styles.container} d-none d-lg-block`}>
                <div className="row">
                    <div className="col">
                        <img src="/images/cart/cart_cat.png" alt="購物車空" />
                    </div>
                    <div className={`col ${styles.none_cart}`}>
                        <div>
                            <div>
                                <p>唉呦~</p>
                                <p>購物車沒有商品!!</p>
                            </div>
                            <div>
                                <button className={styles.button} onClick={handleGoHome}>
                                    回首頁
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${styles.container} d-block d-lg-none`}>
                <div className={styles.row_rwd}>
                    <div className={styles.noCartImg}>
                        <img src="/images/cart/cart_cat.png" alt="購物車空" />
                    </div>
                    <div className={styles.none_cart_rwd}>
                        <div>
                            <div>
                                <p>唉呦~</p>
                                <p>購物車沒有商品!!</p>
                            </div>
                            <div className={styles.button_rwd}>
                                <button onClick={handleGoHome}>回首頁</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CartZero;
