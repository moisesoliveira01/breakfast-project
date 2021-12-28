import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Lista from "./components/Lista";
import Cafe from "./components/Cafe";
import Edit from "./components/Edit";

function App() {
  return <div>
    <BrowserRouter>
      <Nav />
        <Routes>
          <Route element = { <Home /> } exact path="/"></Route>
          <Route element = { <Lista /> } exact path="/listacolaboradores"></Route>
          <Route element = { <Cafe /> } exact path="/cafe"></Route>
          <Route element = { <Edit /> } exact path="/editar"></Route>
        </Routes>
    </BrowserRouter>
  </div>;
}

export default App;
