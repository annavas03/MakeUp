import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

interface ProfileMenuProps {
    isLoggedIn: boolean;
    userName?: string;
    setLoggedIn: (val: boolean) => void;
    setUserName: (name: string) => void;
}

//нижче додати для логіки коли користувач залогінився setLoggedIn, setUserName
const ProfileMenu = ({ isLoggedIn, userName }: ProfileMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Закриття при кліку поза
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={wrapperRef} className="relative">
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="hover:text-pink-500 transition-colors"
            >
                <User size={24}/>
            </button>
            
            {/* Дроп-даун меню */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-4">
                    {!isLoggedIn ? (
                        <>
                            <h2 className="text-lg font-semibold text-gray-800 text-center mb-2">Вхід</h2>
                            <input type="text" placeholder="Логін" className="w-full border rounded px-3 py-2 mb-2 focus:outline-none focus:ring focus:ring-pink-300"/>
                            <input type="password" placeholder="Пароль" className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring focus:ring-pink-300"/>
                            <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition mb-2">Увійти</button>
                            <p className="text-sm text-gray-600 text-center mb-2">
                                Немаєш акаунту? <Link to="/register" className="text-pink-500 hover:underline">Зареєструйся</Link>
                            </p>
                            <button className="w-full flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition">
                                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5"/>
                                Увійти через Google
                            </button>
                        </>
                    ) : (
                        <div className="flex flex-col gap-2">
                            <p className="font-semibold text-gray-800">{userName}</p>
                            <button className="w-full text-center bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition">Вийти</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileMenu;