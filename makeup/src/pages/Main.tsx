import { type FC, useState /* + useEffect */ } from "react";
import CarouselComponent from "../components/CarouselComponent";
import SectionProducts from "../components/SectionProducts.tsx";
// import axios from "axios";

type Product = {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
};

const Main: FC = () => {
    // Фейкові дані для фронтенду
    const [carouselImages] = useState<string[]>([
        "/image/slide1.jpg",
        "/image/slide2.jpg",
        "/image/slide3.jpg",
    ]);
    const [brandProducts] = useState<Product[]>([
        { id: "1", imageUrl: "/image/slide1.jpg", title: "Продукт 1", description: "Опис продукту 1", category: "Brand", rating: 4.5, reviews: 120, price: 150 },
        { id: "2", imageUrl: "/image/slide2.jpg", title: "Продукт 2", description: "Опис продукту 2", category: "Brand", rating: 4, reviews: 80, price: 200 },
        { id: "3", imageUrl: "/image/slide3.jpg", title: "Продукт 3", description: "Опис продукту 3", category: "Brand", rating: 5, reviews: 83, price: 270 },
    ]);
    const [newProducts] = useState<Product[]>(brandProducts);
    const [promoProducts] = useState<Product[]>(brandProducts);

    /*
    // Логіка для підключення до бекенду та хмари
    useEffect(() => {
        const fetchData = async () => {
            try {
                const carouselRes = await axios.get<string[]>("/api/carousel");
                const brandRes = await axios.get<Product[]>("/api/brand");
                const newRes = await axios.get<Product[]>("/api/new");
                const promoRes = await axios.get<Product[]>("/api/promo");

                setCarouselImages(carouselRes.data);
                setBrandProducts(brandRes.data);
                setNewProducts(newRes.data);
                setPromoProducts(promoRes.data);
            } catch (err) {
                console.error("Помилка отримання даних:", err);
            }
        };

        fetchData();
    }, []);
    */

    return (
        <div>
            <main className="w-full px-4 py-6 space-y-12">
                <CarouselComponent images={carouselImages} />
                <SectionProducts title="Пропозиція брендів" products={brandProducts} />
                <SectionProducts title="Новинки" products={newProducts} />
                <SectionProducts title="Акції" products={promoProducts} />
            </main>
        </div>
    );
};

export default Main;
