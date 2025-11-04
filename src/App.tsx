import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} /> {/* Home page */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all 404 */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

