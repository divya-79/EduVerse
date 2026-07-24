import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import About from "./pages/About";

import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <BrowserRouter>

      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />}/>
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="*" element={<NotFound />} /> 
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;