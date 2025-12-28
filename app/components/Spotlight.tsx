"use client";

import { useEffect, useRef } from 'react';
import { useSpotlight } from '../context/SpotlightContext';
import styles from './Spotlight.module.css';

export default function Spotlight() {
    const { isSpotlightActive } = useSpotlight();
    const overlayRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            if (overlayRef.current && isSpotlightActive) {
                overlayRef.current.style.setProperty('--x', `${e.clientX}px`);
                overlayRef.current.style.setProperty('--y', `${e.clientY}px`);
            }
        };

        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [isSpotlightActive]);

    return (
        <>
            <div
                ref={overlayRef}
                className={`${styles.overlay} ${isSpotlightActive ? styles.active : ''}`}
                style={{ '--x': '50vw', '--y': '50vh' } as React.CSSProperties}
            />
            {isSpotlightActive && (
                <div className={styles.hint}>
                    <h2 style={{ color: 'var(--color-gold)' }}>Vitrin Modu</h2>
                    <p>Mücevherlerin ışıltısını keşfedin</p>
                </div>
            )}
        </>
    );
}
