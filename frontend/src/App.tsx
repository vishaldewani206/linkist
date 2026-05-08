import { Route, Routes } from "react-router-dom"
import { LandingHome } from "./pages/Landing/LandingHome"
import { LandingAboutUs } from "./pages/Landing/LandingAboutUs"

function App() {

  
  
  return (
      <Routes>
      <Route path="/" element={<LandingHome />} />
      <Route path="/about" element={<LandingAboutUs />} />
    </Routes>
    
  )
}

export default App
