import './App.css';
import {routes} from "./app/routes";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {routes.map(({path, Component}, index) => {
            return (
                <Route key={index} path={path} element={<Component/>}></Route>
            )
          })}
        </Routes>
      </BrowserRouter>
  );
}

export default App;
