"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '../lib/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const isFavorite = isInWishlist(product.id);

    return (
        <div className={styles.card}>
            <div className={styles.imageContainer}>
                <Link href={`/product/${product.id}`} style={{ display: 'block', width: '100%', height: '100%' }}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                    />
                </Link>
                <button
                    className={`${styles.wishlistBtn} ${isFavorite ? styles.active : ''}`}
                    onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product);
                    }}
                    aria-label="Favorilere Ekle"
                >
                    {isFavorite ? '♥' : '♡'}
                </button>
            </div>
            <div className={styles.info}>
                <Link href={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                    <h3 className={styles.name}>{product.name}</h3>
                </Link>
                <p className={styles.price}>{product.formattedPrice}</p>
                <button
                    className={styles.addBtn}
                    onClick={() => addToCart(product)}
                >
                    Sepete Ekle
                </button>
            </div>
        </div>
    );
}
