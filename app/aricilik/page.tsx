"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { beeProducts } from "../lib/bee-products";
import { Product } from "../lib/products";

export default function AricilikPage() {
    const [filter, setFilter] = useState("Tümü");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const categories = ["Tümü", "Kovan", "Ekipman", "Kıyafet", "Besleme"];

    const filteredProducts = filter === "Tümü"
        ? beeProducts
        : beeProducts.filter(p => p.category === filter);

    return (
        <>
            {isLoading && (
                <div className="elite-preloader">
                    <div className="preloader-logo">NADİR</div>
                </div>
            )}

            <main className={styles.main}>
                <Navbar />

                <section className={styles.hero}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Bereketi Keşfedin</h1>
                        <p className={styles.heroSubtitle}>
                            Doğanın en saf halini, arıcılığın kadim mirasını Nadir güvencesiyle sunuyoruz.
                            En kaliteli ekipmanlar ve uzman destek için doğru yerdesiniz.
                        </p>
                    </div>
                </section>

                <section className={`${styles.collection} container`}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Arıcılık Dünyası</h2>
                        <div className={styles.filterBar}>
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={filter === cat ? styles.filterActive : styles.filterBtn}
                                    onClick={() => setFilter(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className={styles.productGrid}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product as unknown as Product} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
