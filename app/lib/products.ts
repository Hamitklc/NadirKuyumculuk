export interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    formattedPrice: string;
    image: string;
    images: string[];
    category: string;
    description: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Elmas Tektaş Yüzük",
        slug: "elmas-tektas-yuzuk",
        price: 45000,
        formattedPrice: "45.000 TL",
        image: "/images/product1.png",
        images: ["/images/product1.png", "/images/product1_side.png", "/images/product1_hand.png", "/images/product1_box.png"],
        category: "Yüzük",
        description: "0.50 karat F renk pırlanta ve 18 ayar altın montürün eşsiz uyumu. Özel anlarınız için tasarlandı."
    },
    {
        id: 2,
        name: "Zümrüt Pırlanta Set",
        slug: "zumrut-pirlanta-set",
        price: 120000,
        formattedPrice: "120.000 TL",
        image: "/images/product2.png",
        images: ["/images/product2.png", "/images/product2_closeup.png", "/images/product2_model.png", "/images/product2_case.png"],
        category: "Gerdanlık",
        description: "Kolombiya zümrüdü ve yanlarında sıralanmış markiz kesim pırlantalarla hazırlanan asil bir tasarım."
    },
    {
        id: 3,
        name: "Altın Zincir Bileklik",
        slug: "altin-zincir-bileklik",
        price: 25000,
        formattedPrice: "25.000 TL",
        image: "/images/product3.png",
        images: ["/images/product3.png", "/images/product3.png", "/images/product3.png", "/images/product3.png"],
        category: "Bileklik",
        description: "Günlük kullanıma uygun, zarif ve modern altın zincir bileklik tasarımı."
    },
    {
        id: 4,
        name: "Pırlanta Tektaş Küpe",
        slug: "pirlanta-tektas-kupe",
        price: 35000,
        formattedPrice: "35.000 TL",
        image: "/images/product4.png",
        images: ["/images/product4.png", "/images/product4.png", "/images/product4.png", "/images/product4.png"],
        category: "Küpe",
        description: "Göz alıcı parlaklığıyla her anınıza ışıltı katan 0.50 karat pırlanta küpeler."
    },
    {
        id: 5,
        name: "Klasik Altın Saat",
        slug: "klasik-altin-saat",
        price: 250000,
        formattedPrice: "250.000 TL",
        image: "/images/product5.png",
        images: ["/images/product5.png", "/images/product5.png", "/images/product5.png", "/images/product5.png"],
        category: "Saat",
        description: "İsviçre mekanizmalı, safir camlı ve 18 ayar altın kaplama lüks kol saati."
    },
    {
        id: 6,
        name: "Baget Kesim Yüzük",
        slug: "baget-kesim-yuzuk",
        price: 55000,
        formattedPrice: "55.000 TL",
        image: "/images/product1.png",
        images: ["/images/product1.png", "/images/product1_side.png", "/images/product1_hand.png", "/images/product1_box.png"],
        category: "Yüzük",
        description: "Modern baget kesim pırlantaların eşsiz uyumuyla tasarlanmış özel koleksiyon parçası."
    },
    {
        id: 7,
        name: "Kraliyet Safir Set",
        slug: "kraliyet-safir-set",
        price: 180000,
        formattedPrice: "180.000 TL",
        image: "/images/product2.png",
        images: ["/images/product2.png", "/images/product2_closeup.png", "/images/product2_model.png", "/images/product2_case.png"],
        category: "Gerdanlık",
        description: "Derin mavi safir taşlarının pırlanta ile dansı. Özel geceleriniz için tasarlandı."
    },
    {
        id: 8,
        name: "İtalyan Kelepçe Bilezik",
        slug: "italyan-kelepce-bilezik",
        price: 42000,
        formattedPrice: "42.000 TL",
        image: "/images/product3.png",
        images: ["/images/product3.png", "/images/product3.png", "/images/product3.png", "/images/product3.png"],
        category: "Bileklik",
        description: "İtalyan işçiliği ile şekillendirilmiş, modern ve iddialı altın kelepçe."
    }
];
