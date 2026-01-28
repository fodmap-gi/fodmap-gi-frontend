import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import CheckingMode from "./pages/CheckingMode";
import CollectionMode from "./pages/CollectionMode";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CollectionPreview from "./pages/CollectionPreview";
import CollectionSuccess from "./pages/CollectionSuccess";
import EditProfilePage from "./pages/EditProfilePage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/checking" element={<CheckingMode />} />
      <Route path="/collection" element={<CollectionMode />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/collection/preview" element={<CollectionPreview />} />
      <Route path="/collection/success" element={<CollectionSuccess />} />
      <Route path="/profile/edit" element={<EditProfilePage />} />
    </Routes>
  </BrowserRouter>
);
