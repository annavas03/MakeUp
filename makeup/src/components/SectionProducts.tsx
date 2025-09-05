import {useEffect, useState} from "react";
import {ChevronLeft, ChevronRight, Plus, Minus} from "lucide-react";

interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    brandId: number;
    brandName: string;
    rating: number;
}

interface BrandSection {
    brandName: string;
    products: Product[];
}

const SectionProducts: React.FC = () => {
    const [brandSections, setBrandSections] = useState<BrandSection[]>([]);
    const [loading, setLoading] = useState(true);

    const [startIndexes, setStartIndexes] = useState<{ [brand: string]: number }>(
        {}
    );
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("http://localhost:5251/api/Products");
                const data: Product[] = await res.json();

                const grouped: { [brand: string]: Product[] } = {};
                data.forEach((p) => {
                    p.imageUrl = p.imageUrl?.replace(/\\\//g, "/") || "/placeholder.jpg";
                    const brand = p.brandName?.trim() || "Без бренду";
                    if (!grouped[brand]) grouped[brand] = [];
                    grouped[brand].push(p);
                });

                const sections: BrandSection[] = Object.entries(grouped).map(
                    ([brandName, products]) => ({brandName, products})
                );

                setBrandSections(sections);

                const indexes: { [brand: string]: number } = {};
                sections.forEach((s) => (indexes[s.brandName] = 0));
                setStartIndexes(indexes);
            } catch (err) {
                console.error("Помилка завантаження продуктів:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handlePrev = (brand: string) => {
        setStartIndexes((prev) => ({
            ...prev,
            [brand]: Math.max((prev[brand] || 0) - itemsPerPage, 0),
        }));
    };

    const handleNext = (brand: string, total: number) => {
        setStartIndexes((prev) => ({
            ...prev,
            [brand]:
                (prev[brand] || 0) + itemsPerPage < total
                    ? (prev[brand] || 0) + itemsPerPage
                    : prev[brand],
        }));
    };

    const handleAddToCart = (product: Product) => {
        console.log("Додано в кошик:", product);
        // TODO: логіка додавання у Redux / Context
    };

    const handleRemoveFromCart = (product: Product) => {
        console.log("Видалено з кошика:", product);
        // TODO: логіка видалення
    };

    if (loading) return <div>Завантаження продуктів...</div>;
    if (brandSections.length === 0) return <div>Продукти відсутні</div>;

    return (
        <>
            {brandSections.map((section) => {
                const startIndex = startIndexes[section.brandName] || 0;
                const visibleProducts = section.products.slice(startIndex, startIndex + itemsPerPage);

                return (
                    <section key={section.brandName} className="space-y-4 mb-12 px-11">
                        <div className="flex justify-between items-center relative">
                            <h2 className="text-xl font-semibold absolute left-1/2 -translate-x-1/2">
                                {section.brandName}
                            </h2>
                            <div className="ml-auto space-x-2">
                                <button
                                    onClick={() => handlePrev(section.brandName)}
                                    disabled={startIndex === 0}
                                    className="p-2 rounded-full border disabled:opacity-50 hover:bg-gray-100"
                                >
                                    <ChevronLeft size={20}/>
                                </button>
                                <button
                                    onClick={() => handleNext(section.brandName, section.products.length)}
                                    disabled={startIndex + itemsPerPage >= section.products.length}
                                    className="p-2 rounded-full border disabled:opacity-50 hover:bg-gray-100"
                                >
                                    <ChevronRight size={20}/>
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                                {visibleProducts.map((p) => (
                                    <div
                                        key={p.id}
                                        className="relative border rounded-xl shadow hover:shadow-lg transition p-6 w-[280px] group"
                                    >
                                        <img
                                            src={p.imageUrl || "/placeholder.jpg"}
                                            alt={p.name}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                        <h3 className="mt-3 text-lg font-medium">{p.name}</h3>

                                        <div className="flex text-yellow-500">
                                            {Array.from({ length: p.rating }, (_, i) => (
                                                <span key={i}>★</span>
                                            ))}
                                        </div>

                                        <p className="mt-2 text-lg font-semibold">{p.price} ₴</p>
                                            <div
                                                className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition">
                                                <button
                                                    onClick={() => handleAddToCart(p)}
                                                    className="p-2 bg-gray-400 text-white rounded-full hover:bg-black "
                                                >
                                                    <Plus size={18}/>
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveFromCart(p)}
                                                    className="p-2 bg-gray-400 text-white rounded-full hover:bg-black"
                                                >
                                                    <Minus size={18}/>
                                                </button>
                                            </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                );
            })}
        </>
    );
};

export default SectionProducts;
