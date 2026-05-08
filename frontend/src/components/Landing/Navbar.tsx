import { useGSAP } from "@gsap/react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { useState } from "react"

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useGSAP(()=>{
    
  },[])

  
  const handleHamburger = (): void=>{
    document.querySelector(".nav-wrapper").classList.toggle("active")
    setIsOpen(prev => !prev)
    gsap.from(".links", {
      scaleY: 0,
      transformOrigin: "top"
    })
    gsap.fromTo(".hover-link", {
      opacity:0,
    }, {
      opacity:1,
      delay:0.5,
      stagger:0.1
    })
  }


  return (
    <nav className="nav">
      <div className={`nav-wrapper ${isOpen ? "active rounded-t-2xl md:rounded-2xl" : "rounded-2xl"}`}>
        <div>
          <a className="text-xl font-bold text-primary" href="/">Linkist</a>
        </div>
        <div className="links">
          <Link className="hover-link" to={"/"}>Home</Link>
          <a className="hover-link" href="#about-us">About Us</a>
          <Link to={"/login"} className="text-primary hover-link">Login</Link>
        </div>
        
        <div onClick={handleHamburger} className="hamburger">
          <div className="ham-line" />
          <div className="ham-line"  />
        </div>
      
      </div>
    </nav>
  )
}
