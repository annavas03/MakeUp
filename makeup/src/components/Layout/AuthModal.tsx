import { type FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    isLoggedIn: boolean;
    setLoggedIn: (val: boolean) => void;
    setUserName: (name: string) => void;
    userName?: string;
}

const AuthModal: FC<AuthModalProps> = ({isOpen, onClose, isLoggedIn, userName,}) => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    // Анімація появи/зникнення
    useEffect(() => {
        if (isOpen) {
            setVisible(true);
        } else {
            const timeout = setTimeout(() => setVisible(false), 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Закриття при кліку поза
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    if (!visible) return null;

    return (
        <div
            ref={menuRef}
            className={`absolute top-full right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 transform transition-all duration-200 ${
                isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
            } origin-top-right`}
        >
            {isLoggedIn ? (
                <div className="p-4 flex flex-col gap-3">
                    <p className="font-semibold text-gray-800 text-center">
                        Привіт, {userName}
                    </p>
                    <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
                        Вийти
                    </button>
                    {/* Можна додати посилання на профіль чи налаштування */}
                </div>
            ) : (
                <div className="p-4 flex flex-col gap-3">
                    <h2 className="text-lg font-semibold text-gray-800 text-center">
                        Вхід
                    </h2>
                    <input
                        type="text"
                        placeholder="Логін"
                        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        className="border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-pink-300"
                    />
                    <button className="bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
                        Увійти
                    </button>
                    <p className="text-sm text-center text-gray-600">
                        Немаєш акаунту?{" "}
                        <Link
                            to="/register"
                            className="text-pink-500 font-semibold hover:underline"
                        >
                            Зареєструйся
                        </Link>
                    </p>
                    <button className="flex items-center justify-center gap-2 border py-2 rounded hover:bg-gray-100 transition">
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="h-5 w-5"
                        />
                        Увійти через Google
                    </button>
                </div>
            )}
        </div>
    );
};

export default AuthModal;
