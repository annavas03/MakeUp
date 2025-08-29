import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Search } from "lucide-react";
import logoUrl from "../../assets/logo.jpg";
import AuthModal from "../Layout/AuthModal";
import ProfileMenu from "../Layout/ProfileMenu";
import CategoryPanel from "../CategoryPanel";
import SearchComponent from "../Layout/SearchComponent.tsx";

const MainHeader = () => {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState<string | undefined>();
    const [isSearchOpen, setIsSearchOpen] = useState(false);


    return (
        <>
            <header className="mx-12 h-20  bg-white flex items-center justify-between relative">

                <div className="flex items-center">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="hover:text-pink-500 transition-colors"
                    >
                        <Search size={24}/>
                    </button>

                    {/* фейкові продукти*/}
                    <SearchComponent
                        isOpen={isSearchOpen}
                        onClose={() => setIsSearchOpen(false)}
                    />
                </div>

                <Link
                    to="/"
                    className="absolute left-1/2 -translate-x-1/2 flex justify-center"
                >
                    <img
                        src={logoUrl}
                        alt="MakeUp Logo"
                        className="h-[80px] w-auto object-contain"
                    />
                </Link>

                <div className="flex items-center gap-4 ml-auto">
                    <ProfileMenu
                        isLoggedIn={isLoggedIn}
                        userName={userName}
                        setLoggedIn={setIsLoggedIn}
                        setUserName={setUserName}
                    />
                    <Link to="/cart" className="hover:text-pink-500 transition-colors">
                        <ShoppingCart size={24}/>
                    </Link>
                </div>

                    {/* Пошук */}
                    {/*
            {isSearchOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50">
                    <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mt-20 p-4 relative">
                        <button
                            onClick={() => setIsSearchOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            <X size={20} />
                        </button>
                        <input
                            type="text"
                            placeholder="Пошук..."
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-pink-300"
                        />
                    </div>
                </div>
            )}
            */}

                {/* AuthModal */}
                {isAuthOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <AuthModal
                            isOpen={isAuthOpen}
                            onClose={() => setIsAuthOpen(false)}
                            isLoggedIn={isLoggedIn}
                            setLoggedIn={setIsLoggedIn}
                            setUserName={setUserName}
                            userName={userName}
                        />
                    </div>
                )}
            </header>
            <CategoryPanel />
        </>
    );
}

export default MainHeader;
