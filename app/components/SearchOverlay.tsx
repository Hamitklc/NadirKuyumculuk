"use client";

import { useState, useEffect, useRef } from 'react';
import styles from './SearchOverlay.module.css';
import { products, Product } from '../lib/products';
import Image from 'next/image';
import Link from 'next/link';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Product[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim().length > 1) {
            const filtered = products.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase()) ||
                p.category.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
            <button className={styles.closeBtn} onClick={onClose}>&times;</button>

            <div className={styles.searchHeader}>
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Nadir bir şeyler arayın..."
                    className={styles.searchInput}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                <div className={styles.resultsGrid}>
                    {results.length > 0 ? (
                        results.map((product) => (
                            <Link
                                key={product.id}
                                href={`/product/${product.id}`}
                                className={styles.resultItem}
                                onClick={onClose}
                            >
                                <div className={styles.resultImage}>
                                    <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                                </div>
                                <div className={styles.resultInfo}>
                                    <span className={styles.resultName}>{product.name}</span>
                                    <span className={styles.resultPrice}>{product.formattedPrice}</span>
                                </div>
                            </Link>
                        ))
                    ) : query.length > 1 ? (
                        <p style={{ color: '#666', gridColumn: '1/-1', textAlign: 'center' }}>Sonuç bulunamadı.</p>
                    ) : (
                        <p style={{ color: '#666', gridColumn: '1/-1', textAlign: 'center' }}>En az 2 harf giriniz...</p>
                    )}
                </div>
            </div>
        </div>
    );
}
