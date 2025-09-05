import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Minus, Plus} from "lucide-react";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    brandName: string;
    categoryId: number;
    categoryName: string;
    rating: number;
}

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const [categoryName, setCategoryName] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [cartCounts, setCartCounts] = useState<{ [id: number]: number }>({});

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`http://localhost:5251/api/Products`);
                if (!res.ok) throw new Error("Помилка при завантаженні продуктів");
                const data: Product[] = await res.json();

                const filtered = data.filter((p) => p.categoryId.toString() === categoryId);
                setProducts(filtered);

                if (filtered.length > 0) setCategoryName(filtered[0].categoryName);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [categoryId]);

    const handleAddToCart = (product: Product) => {
        setCartCounts((prev) => ({
            ...prev,
            [product.id]: (prev[product.id] || 0) + 1,
        }));
    };

    const handleRemoveFromCart = (product: Product) => {
        setCartCounts((prev) => {
            const current = prev[product.id] || 0;
            if (current <= 1) {
                const { [product.id]: _, ...rest } = prev; // видаляємо ключ якщо 0
                return rest;
            }
            return { ...prev, [product.id]: current - 1 };
        });
    };

    if (loading) return <div className="py-6 text-center">Завантаження продуктів...</div>;
    if (products.length === 0) return <div className="py-6 text-center">Продукти відсутні</div>;

    return (
        <div className="w-full px-[35px] py-6 space-y-6">
            <h1 className="text-4xl font-bold text-center py-7">{categoryName}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((p) => (
                    <div
                        key={p.id}
                        className="relative border rounded-xl shadow hover:shadow-lg transition p-5 group w-[300px] h-[400px] mx-auto"
                    >
                        <img
                            src={p.imageUrl}
                            alt={p.name}
                            className="w-full h-56 object-contain rounded-lg bg-white"
                        />

                        <h3 className="mt-3 font-medium py-2.5 text-center">{p.name}</h3>

                        {/*
                        <div className="flex justify-center mt-1 text-yellow-500">
                            {"★".repeat(Math.round(p.rating))}
                        </div>
                        */}

                        <p className="mt-2 font-semibold text-left pt-3.5">{p.price} ₴</p>

                        {/* Кнопки + / - */}
                        <div
                            className="absolute bottom-2 right-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition"
                        >
                            <button
                                onClick={() => handleRemoveFromCart(p)}
                                className="p-2 bg-gray-400 text-white rounded-full hover:bg-black"
                            >
                                <Minus size={18} />
                            </button>

                            {/* показуємо число тільки якщо > 0 */}
                            {cartCounts[p.id] && cartCounts[p.id] > 0 && (
                                <span className="min-w-[20px] text-center font-semibold">
                                    {cartCounts[p.id]}
                                </span>
                            )}

                            <button
                                onClick={() => handleAddToCart(p)}
                                className="p-2 bg-gray-400 text-white rounded-full hover:bg-black"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryPage;
