"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import { products } from "../../lib/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const product = products.find((p) => p.id === parseInt(id));
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    if (!product) {
        return (
            <div className={styles.container}>
                <Navbar />
                <div style={{ textAlign: 'center', marginTop: '4rem', color: '#fff' }}>
                    <h2>Ürün bulunamadı.</h2>
                    <Link href="/" className={styles.backLink}>Ana Sayfaya Dön</Link>
                </div>
            </div>
        );
    }

    const isFavorite = isInWishlist(product.id);

    return (
        <main className={styles.main}>
            <Navbar />

            <div className={`container ${styles.container}`}>
                <div className={styles.detailsWrapper}>
                    {/* Image */}
                    <div className={`${styles.imageSection} fade-in`}>
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>

                    {/* Details */}
                    <div className={styles.infoSection}>
                        <span className={styles.category}>{product.category}</span>
                        <h1 className={styles.title}>{product.name}</h1>
                        <p className={styles.price}>{product.formattedPrice}</p>

                        <div className={styles.description}>
                            <p>{product.description}</p>
                            <p style={{ marginTop: '1rem' }}>
                                Özenle hazırlanmış hediye paketi ve orijinallik sertifikası ile gönderilir.
                                Ücretsiz kargo ve sigortalı teslimat.
                            </p>
                        </div>

                        <div className={styles.actions}>
                            <button
                                className={styles.addToCartBtn}
                                onClick={() => addToCart(product)}
                            >
                                Sepete Ekle
                            </button>
                            <button
                                className={`${styles.wishlistBtn} ${isFavorite ? styles.active : ''}`}
                                onClick={() => toggleWishlist(product)}
                            >
                                {isFavorite ? '♥ Favorilerde' : '♡ Favorilere Ekle'}
                            </button>
                        </div>

                        <Link href="/" className={styles.backLink}>&larr; Alışverişe Devam Et</Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
