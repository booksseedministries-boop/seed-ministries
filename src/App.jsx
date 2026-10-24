import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage from "./pages/home/HomePage";
import BooksPage from "./pages/books/BooksPage";
import MagazinesPage from "./pages/magazines/MagazinesPage";
import ArticlesPage from "./pages/articles/ArticlesPage";
import DailyMattersPage from "./pages/daily-matters/DailyMattersPage";
import VideosPage from "./pages/videos/VideosPage";
import AboutPage from "./pages/about/AboutPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="books" element={<BooksPage />} />
          <Route path="magazines" element={<MagazinesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="daily-matters" element={<DailyMattersPage />} />
          <Route path="videos" element={<VideosPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
