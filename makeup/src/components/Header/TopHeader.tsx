import type {FC} from "react";
import { Link } from "react-router-dom";

const TopHeader: FC = () => {
    return (
        <div className="mx-12 py-3 text-sm flex items-center justify-between border-b border-gray-300">
            <span className="font-small ">Безкоштовна доставка по Україні</span>
            <div className="flex items-center gap-6">
                <Link to="/promotions" className="text-pink-500  hover:text-purple-600 transition-colors">
                    Акції
                </Link>
                <Link to="/delivery-info" className="hover:text-purple-600 transition-colors">
                    Доставка та Оплата
                </Link>
                <Link to="/about" className="hover:text-purple-600 transition-colors">
                    Про магазин
                </Link>
            </div>
            <span className="text-pink-500 font-semibold">★ Beauty Crowd</span>
        </div>
    );
};

export default TopHeader;
