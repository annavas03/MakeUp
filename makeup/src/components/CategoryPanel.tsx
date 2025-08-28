//import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

//тимчасово
import { useState } from "react";


/*
interface Category {
    id: number;
    name: string;
    slug?: string; // для URL
}
*/

//тимчасово
const categories = ["Макіяж", "Догляд", "Парфуми", "Аксесуари", "Новинки", "Акції"];
const subcategories = [
    "Тіні для повік", "Помади", "Тональні креми",
    "Креми", "Сироватки", "Маски",
    "Парфуми жіночі", "Парфуми чоловічі",
    "Пензлі та спонжі"
];

const CategoryPanel = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <div
            className="w-full bg-white   flex flex-col items-center relative"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
        >
            <div className="flex flex-wrap justify-center gap-6 py-4">
                {categories.map((cat, index) => (
                    <Link
                        to="#"
                        key={index}
                        className="font-semibold text-gray-800 hover:text-pink-500 transition-colors"
                    >
                        {cat}
                    </Link>
                ))}
            </div>

            {/* Підкатегорії */}
            {isDropdownOpen && (
                //стилі для підкатегорій, залишити!!!!
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


/*
const CategoryPanel = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(""); //  API
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Помилка при завантаженні категорій:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) return <div className="py-4 text-center">Завантаження категорій...</div>;

    return (
        <nav className="bg-white shadow-sm">
            <ul className="flex gap-4 overflow-x-auto py-3 px-6">
                {categories.map((cat) => (
                    <li key={cat.id}>
                        <Link
                            to={`/category/${cat.slug ?? cat.id}`}
                            className="text-gray-700 hover:text-pink-500 font-medium whitespace-nowrap transition-colors"
                        >
                            {cat.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
*/


export default CategoryPanel;

