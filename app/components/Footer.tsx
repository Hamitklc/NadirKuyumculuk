import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.footerContent}>
                    <div className={styles.footerColumn}>
                        <div className={styles.logo}>NADİR</div>
                        <p style={{ color: 'var(--color-text-muted)', maxWidth: '300px' }}>
                            Zarafet ve kalitenin buluşma noktası.
                        </p>
                    </div>
                    <div className={styles.footerColumn}>
                        <h4>Koleksiyonlar</h4>
                        <Link href="/" className={styles.footerLink}>Yüzükler</Link>
                        <Link href="/" className={styles.footerLink}>Kolyeler</Link>
                        <Link href="/" className={styles.footerLink}>Bileklikler</Link>
                        <Link href="/" className={styles.footerLink}>Alyanslar</Link>
                    </div>
                    <div className={styles.footerColumn}>
                        <h4>Müşteri Hizmetleri</h4>
                        <Link href="/track-order" className={styles.footerLink}>Sipariş Takibi</Link>
                        <Link href="#" className={styles.footerLink}>Sıkça Sorulan Sorular</Link>
                        <Link href="#" className={styles.footerLink}>İade Politikası</Link>
                        <Link href="#" className={styles.footerLink}>Bize Ulaşın</Link>
                    </div>
                    <div className={styles.footerColumn}>
                        <h4>İletişim</h4>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>info@nadirkuyumculuk.com</p>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>+90 212 555 55 55</p>
                        <p style={{ color: 'var(--color-text-muted)' }}>Kapalıçarşı, İstanbul</p>
                    </div>
                </div>
                <div className={styles.copyright}>
                    &copy; 2025 Nadir Kuyumculuk. Tüm hakları saklıdır.
                </div>
            </div>
        </footer>
    );
}
