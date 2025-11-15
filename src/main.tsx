import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import CheckingMode from "./pages/CheckingMode";
import CollectionMode from "./pages/CollectionMode";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/checking" element={<CheckingMode />} />
      <Route path="/collection" element={<CollectionMode />} />
    </Routes>
  </BrowserRouter>
);
