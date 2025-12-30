"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { useSpotlight } from "../context/SpotlightContext";
import { useWishlist } from "../context/WishlistContext";
import SearchOverlay from "./SearchOverlay";

export default function Navbar() {
    const { cart, toggleCart } = useCart();
    const { wishlist } = useWishlist();
    const { toggleSpotlight, isSpotlightActive } = useSpotlight();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <nav className={styles.navbar}>
                <Link href="/" className={styles.logo}>NADİR</Link>

                {/* Desktop Links */}
                <div className={styles.navLinks}>
                    <Link href="/" className={styles.navLink}>Ana Sayfa</Link>
                    <Link href="/#koleksiyon" className={styles.navLink}>Koleksiyon</Link>
                    <Link href="/aricilik" className={styles.navLink}>Arıcılık</Link>
                    <button
                        onClick={toggleSpotlight}
                        className={styles.navLink}
                        style={{
                            color: isSpotlightActive ? 'var(--color-gold)' : 'inherit',
                            borderColor: isSpotlightActive ? 'var(--color-gold)' : 'transparent'
                        }}
                    >
                        {isSpotlightActive ? '● Vitrin' : '○ Vitrin'}
                    </button>
                    <button className={styles.navLink} onClick={() => setIsSearchOpen(true)}>Ara</button>
                    <Link href="/track-order" className={styles.navLink}>Sipariş</Link>
                    <Link href="/favorites" className={styles.navLink}>
                        Favorilerim
                        {wishlist.length > 0 && <span className={styles.cartBadge}>{wishlist.length}</span>}
                    </Link>
                    <button onClick={toggleCart} className={styles.navLink}>
                        Sepet
                        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button className={styles.hamburger} onClick={toggleMenu} aria-label="Menu">
                    <span style={{ transform: isMenuOpen ? 'rotate(45deg) translate(5px, 6px)' : 'none' }}></span>
                    <span style={{ opacity: isMenuOpen ? 0 : 1 }}></span>
                    <span style={{ transform: isMenuOpen ? 'rotate(-45deg) translate(5px, -6px)' : 'none' }}></span>
                </button>

                {/* Mobile Menu Overlay */}
                <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
                    <Link href="/" className={styles.navLink} onClick={toggleMenu} style={{ fontSize: '1.5rem' }}>Ana Sayfa</Link>
                    <Link href="/#koleksiyon" className={styles.navLink} onClick={toggleMenu} style={{ fontSize: '1.5rem' }}>Koleksiyon</Link>
                    <Link href="/aricilik" className={styles.navLink} onClick={toggleMenu} style={{ fontSize: '1.5rem' }}>Arıcılık</Link>
                    <button
                        className={styles.navLink}
                        onClick={() => { toggleSpotlight(); toggleMenu(); }}
                        style={{ fontSize: '1.5rem', background: 'none', border: 'none' }}
                    >
                        {isSpotlightActive ? 'Vitrin Modu Kapat' : 'Vitrin Modu Aç'}
                    </button>
                    <Link href="/track-order" className={styles.navLink} onClick={toggleMenu} style={{ fontSize: '1.5rem' }}>Sipariş Takibi</Link>
                    <Link href="/favorites" className={styles.navLink} onClick={toggleMenu} style={{ fontSize: '1.5rem' }}>
                        Favorilerim ({wishlist.length})
                    </Link>
                    <button
                        className={styles.navLink}
                        onClick={() => { toggleCart(); toggleMenu(); }}
                        style={{ fontSize: '1.5rem', background: 'none', border: 'none' }}
                    >
                        Sepetim ({cartCount})
                    </button>
                </div>
            </nav>
            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}
