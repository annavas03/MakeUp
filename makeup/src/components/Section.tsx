import type { FC } from "react";

type Product = {
    id?: string;
    imageUrl: string;
    title: string;
    description: string;
    category: string;
    rating: number;
    reviews: number;
    price: number;
};

interface SectionProps {
    title: string;
    products: Product[];
}

const Section: FC<SectionProps> = ({ title, products }) => {
    if (!products || products.length === 0) return null;

    return (
        <section className="space-y-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((p, idx) => (
                    <div
                        key={p.id || idx}
                        className="border rounded-xl shadow hover:shadow-lg transition p-4"
                    >
                        <img
                            src={p.imageUrl}
                            alt={p.title}
                            className="w-full h-48 object-cover rounded-lg"
                        />
                        <h3 className="mt-2 text-lg font-medium">{p.title}</h3>
                        <p className="text-sm text-gray-600">{p.category}</p>
                        <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>
                        <p className="mt-2 font-semibold">{p.price} ₴</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section;
