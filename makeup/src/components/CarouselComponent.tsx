import type {FC} from "react";

interface CarouselProps {
    images: string[];

}

const CarouselComponent: FC<CarouselProps> = ({ images }) => {
    if (!images || images.length === 0) return null;

    return (
        <div className="w-full overflow-hidden rounded-2xl shadow">
            <div className="flex space-x-4 overflow-x-auto snap-x">
                {images.map((img, idx) => (
                    <img
                        key={idx}
                        src={img}
                        alt={`Slide ${idx + 1}`}
                        className="w-full max-w-md rounded-lg snap-center"
                    />
                ))}
            </div>
        </div>
    );
};

export default CarouselComponent;
