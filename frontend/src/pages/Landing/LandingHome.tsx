import { Link } from "react-router-dom"
import { Mobile } from "../../components/Landing/Mobile"

export const LandingHome = () => {
  
  return (
    <main className="bg-primary w-full  text-white flex flex-col md:flex-row  mt-20 ">
      
      <div className="flex-col-center  md:items-start md:justify-start  md:w-[75%]">
        <div className="flex gap-2  items-center border border-secondary text-secondary bg-zinc-800 w-55 p-3 rounded-full justify-center ">
          <div className="w-2 h-2 rounded-full bg-red-400 blink z-0" />
          <p>Now with analytics</p>
        </div>
        <h1 className="text-4xl md:text-7xl text-center md:text-left font-bold md:leading-22 my-5 md:my-0">Everything you are.  <br />
        One simple link.
        </h1>
        <p className="md:text-2xl w-[90%] md:w-auto text-center md:text-left  md:my-5 mt-0 mb-4 text-gray-300 font-light">
          Turn your scattered links into a clean, <br/> beautiful page with <strong className="text-secondary">Linkist</strong>
        </p>

        <div className="flex gap-2 mb-5 md:mb-0">
          <Link to={"/"} className="flex justify-center items-center md:w-50 w-36 h-12 text-black rounded-full bg-secondary hover:opacity-85 ">Join for free</Link>
        <Link to={"/"} className="flex justify-center items-center md:w-50 w-36 h-12  rounded-full border border-white/25 hover:border-white/50 transition-all ">sign in</Link>
        </div>
      </div>
      <div className="flex justify-center md:justify-start ">
        <Mobile />
      </div>
    </main>
  )
}
