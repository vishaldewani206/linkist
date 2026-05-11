import { Route, Routes } from "react-router-dom"
import { LandingHome } from "./pages/Landing/LandingHome"
import { LandingAboutUs } from "./pages/Landing/LandingAboutUs"
import { LandingLayout } from "./layout/LandingLayout"

function App() {

  
  
  return (
      <Routes>
        <Route element={<LandingLayout  />}>
          <Route path="/" element={<LandingHome />} />
          <Route path="/about" element={<LandingAboutUs />} />
        </Route>
    </Routes>
    
  )
}

export default App
