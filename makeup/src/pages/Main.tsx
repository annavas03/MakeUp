import { type FC, useState } from "react"; // + useEffect
import CarouselComponent from "../components/CarouselComponent";
import Section from "../components/Section";
// import axios from "axios";

type Product = {
    id: string;
    imageUrl: string;     // посилання на хмару (бекенд повертає URL)
    title: string;
    description: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
};

const Main: FC = () => {
    /*const [carouselImages, setCarouselImages] = useState<string[]>([]);
    const [brandProducts, setBrandProducts] = useState<Product[]>([]);
    const [newProducts, setNewProducts] = useState<Product[]>([]);
    const [promoProducts, setPromoProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    */


    //видалити після підключення беку та хмари з зображеннями
    const carouselImages: string[] = [
        "/image/slide1.jpg",
        "/image/slide2.jpg",
    ];
    const [brandProducts] = useState<Product[]>([
        { id: "1", imageUrl: "/image/slide1.jpg", title: "Продукт 1", description: "Опис продукту 1", category: "Brand", rating: 4.5, reviews: 120, price: 150 },
        { id: "2", imageUrl: "/image/slide2.jpg", title: "Продукт 2", description: "Опис продукту 2", category: "Brand", rating: 4, reviews: 80, price: 200 },

    ]);
    const [newProducts] = useState<Product[]>(brandProducts);
    const [promoProducts] = useState<Product[]>(brandProducts);

      /*useEffect(() => {
        const fetchData = async () => {
            try {
                // змінити на справжні адреси бекенду, коли їх дадуть
               const carouselRes = await axios.get<string[]>("/api/");
                const brandRes = await axios.get<Product[]>("/api/");
                const newRes = await axios.get<Product[]>("/api/");
                const promoRes = await axios.get<Product[]>("/api/");

                setCarouselImages(carouselRes.data);
                setBrandProducts(brandRes.data);
                setNewProducts(newRes.data);
                setPromoProducts(promoRes.data);
            } catch (err) {
                console.error("Помилка отримання даних:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Завантаження...</p>
            </div>
        );
    }*/

    return (
        <div>
            <main className="w-full px-4 py-6 space-y-12">
                <CarouselComponent images={carouselImages} />
                <Section title="Пропозиція брендів" products={brandProducts} />
                <Section title="Новинки" products={newProducts} />
                <Section title="Акції" products={promoProducts} />
            </main>
        </div>
    );
};

export default Main;
