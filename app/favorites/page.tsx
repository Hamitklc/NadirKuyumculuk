"use client";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useWishlist } from "../context/WishlistContext";
import styles from "./page.module.css";
import Link from "next/link";

export default function FavoritesPage() {
    const { wishlist } = useWishlist();

    return (
        <main>
            <Navbar />
            <div className={`container ${styles.container}`}>
                <h1 className={styles.title}>Favorilerim ({wishlist.length})</h1>

                {wishlist.length === 0 ? (
                    <div className={styles.emptyState}>
                        <h2>Henüz favori ürününüz yok.</h2>
                        <Link href="/" className="btn" style={{ marginTop: '2rem' }}>Koleksiyonu Keşfet</Link>
                    </div>
                ) : (
                    <div className={styles.productGrid}>
                        {wishlist.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
