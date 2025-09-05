import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Category {
    id: number;
    name: string;
    slug?: string;
}

const subcategories = ["пусто"]

const CategoryPanel = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:5251/api/Categories");
                if (!res.ok) throw new Error("Помилка при завантаженні категорій");
                const data: Category[] = await res.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <div className="py-4 text-center">Завантаження категорій...</div>;
    }

    return (
        <div
            className="w-full bg-white flex flex-col items-center relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
        >
            <div className="flex flex-wrap justify-center gap-6 py-4">
                {categories.map((cat) => (
                    <Link
                        to={`/category/${cat.slug ?? cat.id}`}
                        key={cat.id}
                        className="font-semibold text-gray-800 hover:text-pink-500 transition-colors"
                    >
                        {cat.name}
                    </Link>
                ))}
            </div>

            {/* Підкатегорії*/}
            {isDropdownOpen && (
                <div className="absolute top-full left-0 right-0 bg-gray-50 py-4 flex flex-wrap justify-center gap-4 shadow-md z-50 hover: border-t border-purple-500">
                    {subcategories.map((sub, index) => (
                        <Link
                            to="#"
                            key={index}
                            className="text-gray-700 hover:text-pink-500 font-medium transition-colors"
                        >
                            {sub}
                        </Link>
                    ))}
                </div>
            )}

        </div>
    );
};

export default CategoryPanel;

