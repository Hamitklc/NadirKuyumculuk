"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import Navbar from "../../components/Navbar";
import { products } from "../../lib/products";
import { beeProducts } from "../../lib/bee-products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const allProducts = [...products, ...(beeProducts as any)];
    const product = allProducts.find((p) => p.id === parseInt(id));
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    // Default to first image if available, else product.image
    const [selectedImage, setSelectedImage] = useState(product?.images?.[0] || product?.image);

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
                    {/* Image Section */}
                    <div className={`${styles.imageSection} fade-in`}>
                        <div className={styles.mainImageContainer}>
                            <Image
                                src={selectedImage || product.image}
                                alt={product.name}
                                fill
                                style={{ objectFit: 'cover' }}
                                priority
                                className={styles.mainImage}
                            />
                        </div>

                        {/* Thumbnail Gallery */}
                        {product.images && product.images.length > 1 && (
                            <div className={styles.gallery}>
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumbnail : ''}`}
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} ${index + 1}`}
                                            width={80}
                                            height={80}
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
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
