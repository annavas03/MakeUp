import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

type Product = {
    id: string;
    title: string;
    category: string;
    price: number;
    description: string;
    imageUrl: string;
};

interface SearchProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch?: (query: string) => void;
}

const SearchComponent = ({ isOpen, onClose}: SearchProps) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Product[]>([]);
    const modalRef = useRef<HTMLDivElement>(null);

    // Фейкові продукти
    const fakeProducts: Product[] = [
        { id: "1", title: "Помада", category: "Makeup", price: 150, description: "Червона помада", imageUrl: "/image/slide1.jpg" },
        { id: "2", title: "Туш", category: "Makeup", price: 200, description: "Чорна туш", imageUrl: "/image/slide2.jpg" },
        { id: "3", title: "Тональний крем", category: "Makeup", price: 250, description: "Для всіх типів шкіри", imageUrl: "/image/slide3.jpg" },
    ];


    // лайв-пошук з фейковими даними
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const filtered = fakeProducts.filter(product =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
    }, [query]);

    //реалізація закриття поза полем вводу
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);


    /*
    // коли буде бд
    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            try {
                const res = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
                const data: Product[] = await res.json();
                setResults(data);
            } catch (err) {
                console.error("Помилка пошуку:", err);
            }
        };

        fetchResults();
    }, [query]);
    */

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 bg-black/30 flex items-start justify-center z-50"
        >
            <div className="bg-white rounded-2xl shadow-lg p-6 mt-20 w-[60vw] flex flex-col items-start">
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden mb-4 w-full">
                    <input
                        type="text"
                        placeholder="Пошук продуктів..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 p-3 text-lg outline-none"
                    />
                    <button
                        onClick={onClose}
                        className="px-3 text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="max-h-80 overflow-y-auto w-full flex flex-col items-start">
                    {results.map(product => (
                        <div
                            key={product.id}
                            className="flex items-start gap-4 p-2 hover:bg-gray-100 rounded w-full cursor-pointer"
                        >
                            <img
                                src={product.imageUrl}
                                alt={product.title}
                                className="w-12 h-12 object-cover rounded"
                            />
                            <div className="text-left">
                                <p className="font-medium">{product.title}</p>
                                <p className="text-sm text-gray-500">{product.category} • {product.price} ₴</p>
                            </div>
                        </div>
                    ))}
                    {query && results.length === 0 && (
                        <p className="text-gray-500 text-left">Нічого не знайдено</p>
                    )}
                </div>
            </div>
        </div>

    );
};

export default SearchComponent;
