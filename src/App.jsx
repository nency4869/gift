import { Routes, Route } from "react-router-dom";
import IntroPage from "./components/pages/IntroPage";
import MainPage from "./components/pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/main" element={<MainPage />} />
    </Routes>
  );
}

export default App;
