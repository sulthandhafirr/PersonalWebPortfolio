import { useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Projects } from "./pages/Projects";
import { Certificates } from "./pages/Certificates";
import { NotFound } from "./pages/NotFound";
import { Preloader } from "./components/Preloader";
import { Navbar } from "./components/Navbar";
import { Experience } from "./pages/Experience";
import { Maintenance } from "./pages/Maintenance";
import { ScrollTop } from "./components/ScrollTop";
import { ClickHere } from "./components/ClickHere";

function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const clickHereRef = useRef(null);

  const handlePreloaderFinish = () => {
    setShowPreloader(false);
  };

  const handleHireClick = () => {
    clickHereRef.current?.openModal();
  };

  return (
    <>
      {showPreloader ? (
        <Preloader onFinish={handlePreloaderFinish} />
      ) : (
        <BrowserRouter>
          <ScrollTop />
          <Navbar onHireClick={handleHireClick} />
          <ClickHere ref={clickHereRef} />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </BrowserRouter>
      )}
    </>
  );
}

export default App;