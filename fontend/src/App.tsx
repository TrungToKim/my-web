import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.scss";

const MainLayout = lazy(() => import("./pages/Authenticator/MainLayout"));
const ItchIoPage = lazy(() => import("./pages/page/ItchIoPage"));

const GamesPage = lazy(() => import("./pages/page/GamesPage"));
const JamsPage = lazy(() => import("./pages/page/JamsPage"));
const DevlopsPage = lazy(() => import("./pages/page/DevlopsPage"));
const DevlogsPage = lazy(() => import("./pages/page/DevlogsPage"));
const CommunityPage = lazy(() => import("./pages/page/CommunityPage"));

function PageFallback() {
  return <div className="page-fallback">Loading...</div>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<ItchIoPage />} />
            <Route path="itch-io" element={<ItchIoPage />} />
            <Route path="games" element={<GamesPage />} />
            <Route path="jams" element={<JamsPage />} />
            <Route path="devlops" element={<DevlopsPage />} />
            <Route path="devlogs" element={<DevlogsPage />} />
            <Route path="community" element={<CommunityPage />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
