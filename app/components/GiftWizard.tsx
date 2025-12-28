"use client";

import { useState } from 'react';
import styles from './GiftWizard.module.css';
import { products } from '../lib/products';
import Image from 'next/image';
import Link from 'next/link';

export default function GiftWizard() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [resultId, setResultId] = useState<number | null>(null);

    const questions = [
        {
            title: "Hediye kimin için?",
            options: ["Sevgilim / Eşim", "Annem", "Arkadaşım", "Kendim"]
        },
        {
            title: "Hangi özel gün?",
            options: ["Doğum Günü", "Yıldönümü", "Evlilik Teklifi", "İçimden Geldi"]
        }
    ];

    const handleOption = (option: string) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // Logic to pick a product
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        // Simple mock logic for demo
        // "Evlilik Teklifi" -> Ring
        // "Annem" -> Necklace
        // "Kendim" -> Bracelet

        let pid = 1; // Default Ring
        const [who, occasion] = finalAnswers;

        if (occasion === "Evlilik Teklifi" || who === "Sevgilim / Eşim") pid = 1; // Ring
        else if (who === "Annem" || occasion === "Yıldönümü") pid = 2; // Necklace
        else pid = 3; // Bracelet

        setResultId(pid);
        setStep(3); // Result Step
    };

    const reset = () => {
        setStep(0);
        setAnswers([]);
        setResultId(null);
    };

    const product = resultId ? products.find(p => p.id === resultId) : null;

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="btn-outline" style={{ marginLeft: '1rem' }}>
                🎁 Hediye Sihirbazı
            </button>

            <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
                <div className={styles.modal}>
                    <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>&times;</button>

                    {step < questions.length ? (
                        <>
                            <h3 className={styles.stepTitle}>{questions[step].title}</h3>
                            <div className={styles.options}>
                                {questions[step].options.map((opt) => (
                                    <button key={opt} onClick={() => handleOption(opt)} className={styles.optionBtn}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            <div style={{ color: '#666' }}>Adım {step + 1} / {questions.length}</div>
                        </>
                    ) : product ? (
                        <div className="fade-in">
                            <h3 className={styles.stepTitle}>Sizin İçin Seçtik</h3>
                            <div className={styles.resultImage}>
                                <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} />
                            </div>
                            <h4 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{product.name}</h4>
                            <p style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', fontSize: '1.2rem' }}>{product.formattedPrice}</p>

                            <Link href={`/product/${product.id}`} className="btn">
                                Ürünü İncele
                            </Link>
                            <br />
                            <button onClick={reset} className={styles.restartBtn}>Baştan Başla</button>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
