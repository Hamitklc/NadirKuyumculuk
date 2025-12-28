"use client";

import { useCart } from '../context/CartContext';
import styles from './CartSidebar.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CartSidebar() {
    const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const router = useRouter();

    const handleCheckout = () => {
        toggleCart();
        router.push('/checkout');
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            toggleCart();
        }
    };

    return (
        <>
            <div
                className={`${styles.cartOverlay} ${isCartOpen ? styles.open : ''}`}
                onClick={handleBackdropClick}
            />
            <div className={`${styles.cartPanel} ${isCartOpen ? styles.open : ''}`}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Sepetiniz ({cart.reduce((a, c) => a + c.quantity, 0)})</h2>
                    <button onClick={toggleCart} className={styles.closeBtn}>&times;</button>
                </div>

                <div className={styles.cartItems}>
                    {cart.length === 0 ? (
                        <p style={{ color: '#666', textAlign: 'center', marginTop: '2rem' }}>Sepetiniz boş.</p>
                    ) : (
                        cart.map((item) => (
                            <div key={item.id} className={styles.cartItem}>
                                <div className={styles.itemImage}>
                                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <div className={styles.itemName}>{item.name}</div>
                                    <div className={styles.itemPrice}>{(item.price * item.quantity).toLocaleString('tr-TR')} TL</div>
                                    <div className={styles.quantityControls}>
                                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                        <span style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                                        <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button
                                            style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem' }}
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Kaldır
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className={styles.footer}>
                    <div className={styles.totalRow}>
                        <span>Toplam</span>
                        <span style={{ color: 'var(--color-gold)' }}>{cartTotal.toLocaleString('tr-TR')} TL</span>
                    </div>
                    <button
                        className={styles.checkoutBtn}
                        disabled={cart.length === 0}
                        onClick={handleCheckout}
                    >
                        Ödemeye Geç
                    </button>
                </div>
            </div>
        </>
    );
}
