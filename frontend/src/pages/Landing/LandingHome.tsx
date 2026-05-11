import { Link } from "react-router-dom"
import { IconAnimation } from "../../components/Landing/IconAnimation"
import { Mobile } from "../../components/Landing/Mobile"

export const LandingHome = () => {
  const images : string[] =  ["/images/instagram.png", "/images/facebook.png", "/images/whatsapp.png"]
  
  return (
    <main className="bg-primary w-full  text-white flex  mt-20 ">
      
      {/* <div className="flex  mt-18 mb-10">
        <div className="md:hidden block">
          <IconAnimation images={images} size={54} />
        </div>
        <div className="md:block hidden">
          <IconAnimation images={images} size={90} />
        </div>
      </div> */}
      
      <div className="flex flex-col w-[75%]">
        <div className="flex gap-2  items-center border border-secondary text-secondary bg-zinc-800 w-55 p-3 rounded-full justify-center">
          <div className="w-2 h-2 rounded-full bg-red-400 blink" />
          <p>Now with analytics</p>
        </div>
        <h1 className="text-7xl font-bold leading-22 ">Everything you are.  <br />
        One simple link.
        </h1>
        <p className="text-2xl  my-5 text-gray-300 font-light">
          Turn your scattered links into a clean, <br /> beautiful page with <strong className="text-secondary">Linkist</strong>
        </p>

        <div className="flex gap-2">
          <Link to={"/"} className="flex justify-center items-center w-50 h-14 text-black rounded-full bg-secondary hover:opacity-85 ">Join for free</Link>
        <Link to={"/"} className="flex justify-center items-center w-50 h-14  rounded-full border border-white/25 hover:border-white/50 transition-all ">sign in</Link>
        </div>
      </div>
      <div>
        <Mobile />
      </div>
    </main>
  )
}
