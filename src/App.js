import './App.css';
import {routes} from "./app/routes";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                {routes.map(({path, Component}, index) => {
                    return (
                        <Route key={index} path={path} element={<Component/>}></Route>
                    )
                })}
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
