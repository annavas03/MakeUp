import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; //стрілочки

interface Product {
    id: string;
    title: string;
    category: string;
    description: string;
    price: number;
    imageUrl: string;
}

interface Props {
    title: string;
    products: Product[];
}

const ProductSection: React.FC<Props> = ({ title, products }) => {
    const [startIndex, setStartIndex] = useState(0);
    const itemsPerPage = 5;

    const visibleProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        setStartIndex((prev) => Math.max(prev - itemsPerPage, 0));
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            prev + itemsPerPage < products.length ? prev + itemsPerPage : prev
        );
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center relative">
                <h2 className="text-xl font-semibold absolute left-1/2 -translate-x-1/2">
                    {title}
                </h2>
                <div className="ml-auto space-x-2">
                    <button
                        onClick={handlePrev}
                        disabled={startIndex === 0}
                        className="p-2 rounded-full border disabled:opacity-50 hover:bg-gray-100"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={startIndex + itemsPerPage >= products.length}
                        className="p-2 rounded-full border disabled:opacity-50 hover:bg-gray-100"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {visibleProducts.map((p, idx) => (
                        <div
                            key={p.id || idx}
                            className="border rounded-xl shadow hover:shadow-lg transition p-4 w-[220px]"
                        >
                            <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="mt-2 text-lg font-medium">{p.title}</h3>
                            <p className="text-sm text-gray-600">{p.category}</p>
                            <p className="text-sm text-gray-500 line-clamp-2">
                                {p.description}
                            </p>
                            <p className="mt-2 font-semibold">{p.price} ₴</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;