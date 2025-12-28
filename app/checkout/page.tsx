"use client";

import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import Link from "next/link";
import { useState } from "react";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => {
            // Simulate Order Creation
            const orderId = "NADIR" + Math.floor(Math.random() * 10000);
            const newOrder = {
                id: orderId,
                date: new Date().toLocaleDateString('tr-TR'),
                status: "Hazırlanıyor",
                total: cartTotal,
                items: cart
            };

            // Save for "Order Tracking" demo
            localStorage.setItem('lastOrder', JSON.stringify(newOrder));

            setOrderId(orderId); // Local state for display
            setIsSuccess(true);
            clearCart();
        }, 1500);
    };

    const [orderId, setOrderId] = useState("");

    if (isSuccess) {
        return (
            <main>
                <Navbar />
                <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                    <h1 style={{ color: 'var(--color-gold)', fontSize: '3rem' }}>Siparişiniz Alındı!</h1>
                    <p style={{ color: '#fff', margin: '1rem 0 2rem' }}>
                        Teşekkür ederiz. Sipariş numaranız: <strong>#{orderId}</strong>
                        <br />
                        <span style={{ fontSize: '0.9rem', color: '#999' }}>(Sipariş numaranızı saklayınız)</span>
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                        <Link href="/" className="btn">Ana Sayfaya Dön</Link>
                        <Link href="/track-order" className="btn-outline">Siparişi Takip Et</Link>
                    </div>
                </div>
            </main>
        );
    }

    if (cart.length === 0) {
        return (
            <main>
                <Navbar />
                <div className="container" style={{ paddingTop: '150px', textAlign: 'center' }}>
                    <h1 style={{ color: '#fff' }}>Sepetiniz Boş</h1>
                    <Link href="/" style={{ color: 'var(--color-gold)', marginTop: '1rem', display: 'inline-block' }}>Alışverişe Başla</Link>
                </div>
            </main>
        );
    }

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Ödeme</h1>

                <div className={styles.layout}>
                    <form className={styles.formSection} onSubmit={handleSubmit}>
                        <h3 className={styles.sectionHeader}>Teslimat Bilgileri</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Ad</label>
                                <input required className={styles.input} type="text" placeholder="Adınız" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Soyad</label>
                                <input required className={styles.input} type="text" placeholder="Soyadınız" />
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Adres</label>
                            <input required className={styles.input} type="text" placeholder="Teslimat Adresi" />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Telefon</label>
                            <input required className={styles.input} type="tel" placeholder="05XX XXX XX XX" />
                        </div>

                        <h3 className={styles.sectionHeader} style={{ marginTop: '2rem' }}>Ödeme Yöntemi</h3>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Kart Numarası</label>
                            <input required className={styles.input} type="text" placeholder="XXXX XXXX XXXX XXXX" />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>Son Kullanma</label>
                                <input required className={styles.input} type="text" placeholder="AA/YY" />
                            </div>
                            <div className={styles.formGroup}>
                                <label className={styles.label}>CVC</label>
                                <input required className={styles.input} type="text" placeholder="123" />
                            </div>
                        </div>

                        <button type="submit" className={styles.payBtn}>
                            {cartTotal.toLocaleString('tr-TR')} TL Öde
                        </button>
                    </form>

                    <div className={styles.summarySection}>
                        <h3 className={styles.sectionHeader}>Sipariş Özeti</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                            {cart.map((item) => (
                                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', color: '#ccc' }}>
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>{(item.price * item.quantity).toLocaleString('tr-TR')} TL</span>
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-gold)', fontWeight: 'bold', fontSize: '1.2rem', paddingTop: '1rem', borderTop: '1px solid #333' }}>
                            <span>Toplam</span>
                            <span>{cartTotal.toLocaleString('tr-TR')} TL</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
