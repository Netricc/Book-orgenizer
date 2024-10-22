import { BrowserRouter, Routes, Route } from "react-router-dom";


import Header from "./components/Header/Header.jsx"
import LandingPage from "./Landing Page/LandingPage.jsx"
import About from "./About/About.jsx";
import Main from "./App/Main.jsx"
import NotFoundPage from "./components/404 page/NotFoundPage.jsx";



function App() {

  return (
    <>
    <Header></Header>
   <BrowserRouter>
   <Routes>
      <Route index element={<LandingPage></LandingPage>}></Route>
      <Route path="/app" element={<Main></Main>}></Route>
      <Route path="/about" element={<About></About>}></Route>
      <Route path="*"  element={<NotFoundPage></NotFoundPage>}></Route>
   </Routes>
   </BrowserRouter>
    </>
  )
}

export default App
