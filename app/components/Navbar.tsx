"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useCart } from "../context/CartContext";
import { useState } from "react";

import { useSpotlight } from "../context/SpotlightContext";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
    const { cart, toggleCart } = useCart();
    const { toggleSpotlight, isSpotlightActive } = useSpotlight();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logo}>NADİR</Link>
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Koleksiyonlar</Link>
                    <button
                        onClick={toggleSpotlight}
                        className={styles.navLink}
                        style={{
                            color: isSpotlightActive ? 'var(--color-gold)' : 'inherit',
                            border: isSpotlightActive ? '1px solid var(--color-gold)' : 'none',
                            padding: '0.2rem 0.5rem',
                            borderRadius: '4px'
                        }}
                    >
                        {isSpotlightActive ? '● Vitrin Açık' : '○ Vitrin Modu'}
                    </button>
                    <Link href="/" className={styles.navLink}>Hikayemiz</Link>
                    <Link href="/" className={styles.navLink}>İletişim</Link>
                </div>
                <div className={styles.navLinks}>
                    <button className={styles.navLink} onClick={() => setIsSearchOpen(true)}>Ara</button>
                    <Link href="/track-order" className={styles.navLink}>Sipariş Takibi</Link>
                    <Link href="/favorites" className={styles.navLink}>Favoriler</Link>
                    <button onClick={toggleCart} className={styles.navLink}>
                        Sepet
                        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </button>
                </div>
            </nav>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
