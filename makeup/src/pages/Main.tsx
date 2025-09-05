import { type FC, useState } from "react";
import CarouselComponent from "../components/CarouselComponent";
import SectionProducts from "../components/SectionProducts";

const Main: FC = () => {
    const [carouselImages] = useState<string[]>([
        "/image/slide1.jpg",
        "/image/slide2.jpg",
        "/image/slide3.jpg",
    ]);
    return (
        <main className="w-full px-4 py-6 space-y-12">
            <CarouselComponent images={carouselImages} />
            <SectionProducts />
        </main>
    );
};

export default Main;