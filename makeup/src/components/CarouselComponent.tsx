import { type FC, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
    images: string[];
}

const CarouselComponent: FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) return null;

    // Автоматичне перемикання кожні 5 секунд
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="w-full max-w-[calc(100%-94px)] mx-auto relative aspect-[5/2] max-h-[500px] overflow-hidden rounded-2xl shadow bg-black">
            <div
                className="flex transition-transform duration-700 ease-in-out w-full h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Slide ${idx + 1}`}
                        className="w-full h-full object-contain flex-shrink-0"
                    />
                ))}
            </div>

            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/40 text-white p-2 rounded-full hover:bg-black/60 transition"
            >
                <ChevronRight size={24} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`w-3 h-3 rounded-full transition ${
                            idx === currentIndex ? "bg-purple-600" : "bg-gray-300"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};


/*
const [images, setImages] = useState<string[]>([]);

useEffect(() => {
 fetch("http://localhost:5000/api/images")
   .then(res => res.json())
   .then(data => {
     // якщо масив  →  img.url
     const normalized = data.map((img: any) =>
       typeof img === "string" ? img : img.url
     );
     setImages(normalized);
   })
   .catch(err => {
     console.error("Помилка завантаження зображень:", err);
   });
}, []);
*/

export default CarouselComponent;