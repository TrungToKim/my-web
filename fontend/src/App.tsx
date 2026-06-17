import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./pages/Authenticator/MainLayout";
import ItchIoPage from "./pages/page/ItchIoPage";

const GamesPage = () => (
  <div style={{ padding: "20px" }}>
    <h2>🕹️ Danh sách Browse Games Content</h2>
  </div>
);
const JamsPage = () => (
  <div style={{ padding: "20px" }}>
    <h2>🏆 Danh sách Game Jams Content</h2>
  </div>
);
const DevlopsPage = () => (
  <div style={{ padding: "20px" }}>
    <h2>📤 Khu vực Upload Game</h2>
  </div>
);
const DevlogsPage = () => (
  <div style={{ padding: "20px" }}>
    <h2>📝 Nhật ký Developer Logs</h2>
  </div>
);
const CommunityPage = () => (
  <div style={{ padding: "20px" }}>
    <h2>👥 Diễn đàn Community Content</h2>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}
