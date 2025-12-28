"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "./page.module.css";
import Link from "next/link";
import { Product } from "../lib/products";

interface OrderData {
    id: string;
    date: string;
    status: string;
    total: number;
    items: (Product & { quantity: number })[];
}

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [order, setOrder] = useState<OrderData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Check URLs query param for auto-fill? (Simple version first)

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setOrder(null);

        // Mock API Delay
        setTimeout(() => {
            const stored = localStorage.getItem('lastOrder');

            if (stored) {
                const lastOrder = JSON.parse(stored);
                if (lastOrder.id === orderId.trim()) {
                    setOrder(lastOrder);
                    setLoading(false);
                    return;
                }
            }

            // If not generic match
            if (orderId.startsWith("NADIR")) {
                // Return a mock result for demo even if not saved locally
                setOrder({
                    id: orderId,
                    date: new Date().toLocaleDateString('tr-TR'),
                    status: "Kargoya Verildi",
                    total: 0,
                    items: []
                });
            } else {
                setError("Sipariş bulunamadı. Lütfen kontrol edip tekrar deneyin.");
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <main>
            <Navbar />
            <div className={styles.container}>
                <h1 className={styles.title}>Sipariş Takibi</h1>

                <form className={styles.searchBox} onSubmit={handleTrack}>
                    <input
                        type="text"
                        placeholder="Sipariş Numarası (Örn: #NADIR1234)"
                        className={styles.input}
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.btn} disabled={loading}>
                        {loading ? 'Aranıyor...' : 'SORGULA'}
                    </button>
                </form>

                {error && <p style={{ color: '#ff4444', textAlign: 'center' }}>{error}</p>}

                {order && (
                    <div className={styles.result}>
                        <div className={styles.orderHeader}>
                            <div>
                                <span className={styles.label}>Sipariş No</span>
                                <span className={styles.value}>#{order.id}</span>
                            </div>
                            <div>
                                <span className={styles.label}>Tarih</span>
                                <span className={styles.value}>{order.date}</span>
                            </div>
                            <div>
                                <span className={styles.label}>Durum</span>
                                <span className={styles.value} style={{ color: 'var(--color-gold)' }}>{order.status}</span>
                            </div>
                        </div>

                        {/* Stepper Visualization */}
                        <div className={styles.stepper}>
                            <div className={`${styles.step} ${styles.completed} ${styles.active}`}>
                                <div className={styles.dot}>✓</div>
                                <div className={styles.stepText}>Sipariş Alındı</div>
                            </div>
                            <div className={`${styles.step} ${order.status === "Hazırlanıyor" ? styles.active : ''}`}>
                                <div className={styles.dot}>2</div>
                                <div className={styles.stepText}>Hazırlanıyor</div>
                            </div>
                            <div className={`${styles.step} ${order.status === "Kargoya Verildi" ? styles.active : ''}`}>
                                <div className={styles.dot}>3</div>
                                <div className={styles.stepText}>Kargoda</div>
                            </div>
                            <div className={styles.step}>
                                <div className={styles.dot}>4</div>
                                <div className={styles.stepText}>Teslim Edildi</div>
                            </div>
                        </div>

                        {order.items.length > 0 && (
                            <div style={{ marginTop: '3rem', borderTop: '1px solid #333', paddingTop: '1rem' }}>
                                <p style={{ color: '#aaa', marginBottom: '1rem' }}>Sipariş İçeriği:</p>
                                {order.items.map(item => (
                                    <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', alignItems: 'center' }}>
                                        <div style={{ width: 50, height: 50, background: '#333', borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                                            {item.image && <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                                        </div>
                                        <div>
                                            <div style={{ color: '#fff' }}>{item.name}</div>
                                            <div style={{ color: '#666', fontSize: '0.9rem' }}>{item.quantity} adet</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                )}
            </div>
        </main>
    );
}
