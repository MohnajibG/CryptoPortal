import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";

// pages
import Home from "./pages/Home";
import Education from "./pages/Education";
import News from "./pages/News";
import Security from "./pages/Security";
import Guides from "./pages/Guides";
import Comparisons from "./pages/Comparisons";
import BlockchainApps from "./pages/BlockchainApps";
import Community from "./pages/Community";

const App = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/education" element={<Education />} />
        <Route path="/news" element={<News />} />
        <Route path="/security" element={<Security />} />
        <Route path="/guides" element={<Guides />} />
        <Route path="/comparisons" element={<Comparisons />} />
        <Route path="/apps" element={<BlockchainApps />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </div>
  );
};

export default App;
