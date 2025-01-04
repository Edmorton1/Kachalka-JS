import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Pages/Home/Home";
import About from "./components/Pages/About/About";
import TEST from "./components/Tables/TEST";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/test" element={<TEST />}/>
      </Routes>
    </Router>
  );
}