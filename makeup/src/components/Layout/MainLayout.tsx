import { type FC, type ReactNode } from "react"; // + useState
import TopHeader from "../Header/TopHeader";
import MainHeader from "../Header/MainHeader";
//import SubFooter from "../Footer/SubFooter";
//import Footer from "../Footer/Footer";
//import AuthModal from "../Layout/AuthModal";

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <TopHeader/>
            <MainHeader/>
            <main className="flex-1">{children}</main>


            {/* <SubFooter /> */}
            {/* <Footer /> */}
        </div>
    );
}

export default MainLayout;