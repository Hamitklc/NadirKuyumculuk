export interface BeeProduct {
    id: number;
    name: string;
    slug: string;
    price: number;
    formattedPrice: string;
    image: string;
    images: string[];
    category: "Kovan" | "Ekipman" | "Kıyafet" | "Besleme" | "Diğer";
    description: string;
}

export const beeProducts: BeeProduct[] = [
    {
        id: 1001,
        name: "Langstroth Ahşap Kovan",
        slug: "langstroth-ahsap-kovan",
        price: 3500,
        formattedPrice: "3.500 TL",
        image: "/images/aricilik/kovan.jpg",
        images: ["/images/aricilik/kovan.jpg"],
        category: "Kovan",
        description: "Dayanıklı çam ağacından üretilmiş, kuluçkalık ve ballık katlı profesyonel arı kovanı."
    },
    {
        id: 1002,
        name: "Paslanmaz Çelik Körük",
        slug: "paslanmaz-celik-koruk",
        price: 450,
        formattedPrice: "450 TL",
        image: "/images/aricilik/koruk.jpg",
        images: ["/images/aricilik/koruk.jpg"],
        category: "Ekipman",
        description: "Geniş haznesi ve deri körüğü ile uzun süreli duman sağlayan paslanmaz çelik körük."
    },
    {
        id: 1003,
        name: "Tam Korumalı Arıcı Maskesi",
        slug: "tam-korumali-arici-maskesi",
        price: 850,
        formattedPrice: "850 TL",
        image: "/images/aricilik/maske.jpg",
        images: ["/images/aricilik/maske.jpg"],
        category: "Kıyafet",
        description: "Havadar kumaşı ve geniş görüş açısı sunan tül yapısı ile maksimum güvenlik sağlayan tulum."
    },
    {
        id: 1004,
        name: "Profesyonel El Demiri",
        slug: "profesyonel-el-demiri",
        price: 150,
        formattedPrice: "150 TL",
        image: "/images/aricilik/ekipman.jpg",
        images: ["/images/aricilik/ekipman.jpg"],
        category: "Ekipman",
        description: "Paslanmaz çelikten üretilmiş, çerçeve kaldırma ve kazıma işlemleri için ideal el aleti."
    },
    {
        id: 1005,
        name: "Deri Arıcı Eldiveni",
        slug: "deri-arici-eldiveni",
        price: 250,
        formattedPrice: "250 TL",
        image: "/images/aricilik/maske.jpg",
        images: ["/images/aricilik/maske.jpg"],
        category: "Kıyafet",
        description: "Dirseklere kadar uzanan koruyucu manşetleri ile yumuşak deri eldiven."
    },
    {
        id: 1006,
        name: "Arı Keki (Proteinli)",
        slug: "ari-keki-proteinli",
        price: 85,
        formattedPrice: "85 TL",
        image: "/images/aricilik/kek.jpg",
        images: ["/images/aricilik/kek.jpg"],
        category: "Besleme",
        description: "Kışlatma ve bahar gelişimi için vitamin ve protein takviyeli özel arı keki."
    },
    {
        id: 1007,
        name: "Arı Şekeri (Fondan)",
        slug: "ari-sekeri-fondan",
        price: 950,
        formattedPrice: "950 TL (Çuval)",
        image: "/images/aricilik/ari_foto_final.jpg",
        images: ["/images/aricilik/ari_foto_final.jpg"],
        category: "Besleme",
        description: "Arıların kolay sindirebileceği invert şekerden üretilmiş 25kg'lık fondan şeker."
    },
    {
        id: 1008,
        name: "Ana Arı Izgarası",
        slug: "ana-ari-izgarasi",
        price: 65,
        formattedPrice: "65 TL",
        image: "/images/aricilik/izgara.jpg",
        images: ["/images/aricilik/izgara.jpg"],
        category: "Ekipman",
        description: "Ana arının ballığa geçmesini engelleyerek temiz bal hasadı sağlayan plastik ızgara."
    },
    {
        id: 1009,
        name: "Plastik Polen Tuzağı",
        slug: "plastik-polen-tuzagi",
        price: 120,
        formattedPrice: "120 TL",
        image: "/images/aricilik/polen_tuzagi.jpg",
        images: ["/images/aricilik/polen_tuzagi.jpg"],
        category: "Ekipman",
        description: "Kovan girişine monte edilen, çekmeceli pratik polen toplama aparatı."
    },
    {
        id: 1010,
        name: "Ham Petek (Kutu)",
        slug: "ham-petek-kutu",
        price: 1800,
        formattedPrice: "1.800 TL",
        image: "/images/aricilik/petek.jpg",
        images: ["/images/aricilik/petek.jpg"],
        category: "Kovan",
        description: "Saf balmumundan üretilmiş, arıların hızlı kabartması için uygun temel petek."
    }
];
