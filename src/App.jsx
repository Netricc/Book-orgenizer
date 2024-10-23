import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.jsx";
import LandingPage from "./Landing Page/LandingPage.jsx";
import About from "./About/About.jsx";
import Main from "./App/Main.jsx";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import NotFoundPage from "./components/404 page/NotFoundPage.jsx";
import { AuthProvider } from './contexts/authContext';

function App() {
  return (
    <>
      {/* Wrap BrowserRouter with AuthProvider */}
      <AuthProvider>
  <BrowserRouter>
    <Header /> {/* Now Header will have access to useAuth */}
    <Routes>
      <Route index element={<LandingPage />} />
      <Route path="/app" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
</AuthProvider>

    </>
  );
}

export default App;
