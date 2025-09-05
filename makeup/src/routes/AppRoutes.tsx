import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import CategoryPage from "../pages/CategoryPage.tsx";

const AppRoutes: React.FC = () =>{
    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/category/:categoryId" element={<CategoryPage />} />
        </Routes>
    )
}

export default AppRoutes;