import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroPage from "./components/pages/IntroPage";
import MainPage from "./components/pages/mainPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
