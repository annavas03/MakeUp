import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import MainLayout from "./components/Layout/MainLayout";
import './index.css';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <MainLayout>
                <AppRoutes />
            </MainLayout>
        </BrowserRouter>
    );
}


export default App;
