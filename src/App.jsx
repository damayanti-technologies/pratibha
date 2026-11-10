import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import Templates from "./pages/Templates";
import Editor from "./pages/Editor";
import Preview from "./pages/Preview";
import MyResumes from "./pages/MyResumes";
import About from "./pages/About";
import Privacy from "./pages/Privacy";

/**
 * Scroll restoration helper on route change
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/templates" element={<Templates />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:id" element={<Editor />} />
          <Route path="/preview/:id" element={<Preview />} />
          <Route path="/my-resumes" element={<MyResumes />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* Fallback to Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
