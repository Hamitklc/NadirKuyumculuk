"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import { products } from "./lib/products";
import GiftWizard from "./components/GiftWizard";

export default function Home() {
  const [filter, setFilter] = useState("Tümü");
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [sparks, setSparks] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const productRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Client-side only generation
    const generatedSparks = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        width: `${Math.random() * 3}px`,
        height: `${Math.random() * 3}px`,
        '--duration': `${8 + Math.random() * 12}s`,
        animationDelay: `${Math.random() * 5}s`
      } as React.CSSProperties
    }));
    setSparks(generatedSparks);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 40;
    const y = (clientY / innerHeight - 0.5) * 40;
    setMousePos({ x, y });
  };

  const filteredProducts = filter === "Tümü"
    ? products
    : products.filter(p => p.category === filter);

  const categories = ["Tümü", "Yüzük", "Gerdanlık", "Bileklik", "Küpe", "Saat"];

  return (
    <>
      {isLoading && (
        <div className="elite-preloader">
          <div className="preloader-logo">NADİR</div>
        </div>
      )}

      <main className={styles.main} onMouseMove={handleMouseMove}>
        <Navbar />

        {/* Improved Hero Section */}
        <section className={styles.hero}>
          <div className="hero-aura"></div>

          {/* Animated Ribbons */}
          <div className={styles.ribbon} style={{ top: '20%', left: '-10%' }}></div>
          <div className={styles.ribbon} style={{ top: '60%', right: '-10%', rotate: '15deg' }}></div>

          <div className="diamond-dust">
            {sparks.map((spark) => (
              <div
                key={spark.id}
                className="spark"
                style={spark.style}
              />
            ))}

          </div>

          <div className={styles.heroImageContainer} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
            <Image
              src="/images/hero.png"
              alt="Luxury Background"
              fill
              style={{ objectFit: 'cover', filter: 'brightness(0.3) saturate(0.5)' }}
              priority
            />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.glassCard}>
              <span className={`${styles.masterpieceTag} reveal-text`}>Özel Koleksiyon 2025</span>
              <h1 className={`${styles.heroTitle} reveal-text`}>
                <span className="title-glass">Kusursuz</span> <br />
                Güzelliğin <br />
                <span style={{ fontWeight: 400 }}>Merkezi</span>
              </h1>
              <p className={`${styles.heroSubtitle} reveal-text`} style={{ animationDelay: '0.4s', textAlign: 'left', maxWidth: '400px' }}>
                Atölyemizde sabırla işlenen her bir taş, sizin eşsiz hikayenizi anlatmak için bekliyor.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'flex-start', marginTop: '3rem' }} className="reveal-text">
                <button className="btn">Koleksiyonu Keşfet</button>
                <div style={{ transform: 'translateY(10px)' }}>
                  <GiftWizard />
                </div>
              </div>
            </div>

            <div className={styles.heroVisual} style={{
              transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`
            }}>
              <div ref={productRef} className={styles.floatingProduct} style={{
                transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`
              }}>
                <Image
                  src="/images/product1.png"
                  alt="Featured Masterpiece"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
            </div>
          </div>

          <div className={styles.scrollIndicator}>
            <div className={styles.scrollLine}></div>
          </div>
        </section>

        {/* Order Tracking Quick Access */}
        <section className={styles.trackSection} style={{ padding: '2.5rem 0', background: 'rgba(212, 175, 55, 0.03)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ color: 'var(--color-gold)', margin: 0, fontFamily: 'var(--font-heading)' }}>Siparişiniz Nerede?</h3>
              <p style={{ color: 'var(--color-text-muted)', margin: '5px 0 0', fontSize: '0.9rem' }}>Nadir emanetinizi adım adım takip edin.</p>
            </div>
            <Link href="/track-order" className="btn-outline" style={{ fontSize: '0.8rem', padding: '0.7rem 2rem' }}>TAKİP ET</Link>
          </div>
        </section>

        {/* Featured Collection */}
        <section className={`${styles.collection} container`} id="koleksiyon">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Seçkin Koleksiyon</h2>
            <div className={styles.filterBar} style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
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
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Featured Banner */}
        <section className={styles.featuredBanner}>
          <Image src="/images/product5.png" alt="Luxury Masterpiece" fill className={styles.bannerImage} />
          <div className={styles.bannerContent}>
            <h2 className="reveal-text">Zarafetin <br /> Zirve Noktası</h2>
            <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '2rem' }}>
              Klasik altın saat koleksiyonumuzla zamanı şıklığa dönüştürün.
            </p>
            <button className="btn">Koleksiyonu İncele</button>
          </div>
        </section>

        {/* Visual Gallery */}
        <section className={`${styles.gallery} container`}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Işıltının Hikayesi</h2>
            <p style={{ color: 'var(--color-text-muted)' }}>Atölyemizden en özel kareler.</p>
          </div>
          <div className={styles.galleryGrid}>
            <div className={styles.galleryItem}>
              <Image src="/images/product2.png" alt="Gallery 1" fill />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/images/product4.png" alt="Gallery 2" fill />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/images/product1.png" alt="Gallery 3" fill />
            </div>
            <div className={styles.galleryItem}>
              <Image src="/images/product3.png" alt="Gallery 4" fill />
            </div>
          </div>
        </section>

        {/* About / Heritage Section */}
        <section className={styles.about}>
          <div className={`${styles.aboutContent} container`}>
            <h2 className={styles.sectionTitle} style={{ color: 'var(--color-gold)' }}>Mirasımız</h2>
            <p className={styles.aboutText}>
              1985'ten beri ustalığı estetikle buluşturuyoruz. Nadir Kuyumculuk olarak,
              sadece takı değil, nesiller boyu aktarılacak hatıralar tasarlıyoruz.
            </p>
            <button className="btn-outline">Hikayemizi Oku</button>
          </div>
        </section>

        {/* Trust Badges */}
        <div className={styles.trustBadges}>
          <div className={styles.badgeItem}>
            <span className={styles.badgeIcon}>💎</span>
            <span className={styles.badgeText}>Sertifikalı Taşlar</span>
          </div>
          <div className={styles.badgeItem}>
            <span className={styles.badgeIcon}>🚚</span>
            <span className={styles.badgeText}>Sigortalı Kargo</span>
          </div>
          <div className={styles.badgeItem}>
            <span className={styles.badgeIcon}>🔒</span>
            <span className={styles.badgeText}>Güvenli Ödeme</span>
          </div>
          <div className={styles.badgeItem}>
            <span className={styles.badgeIcon}>✨</span>
            <span className={styles.badgeText}>Ömür Boyu Bakım</span>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className={styles.newsletter}>
          <div className={`${styles.newsletterContent} container`}>
            <h2>Nadir Dostlarına Katılın</h2>
            <p>Yeni koleksiyonlar ve özel davetlerden ilk siz haberdar olun.</p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className={styles.newsletterInput}
              />
              <button className="btn">Kayıt Ol</button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
