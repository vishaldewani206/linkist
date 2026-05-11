import { Link } from "react-router-dom";

export const Mobile = () => {
  type LinkP = {
    icon: string,
    text: string
  }
  const links:LinkP[] = [
    {
      icon: "/images/whatsapp.png",
      text: "WhatsApp"
    },
    {
      icon: "/images/instagram.png",
      text: "Instagram"
    },
  ]
  return (
    <div className="relative w-75 h-150">
      
      {/* White screen/background */}
      <div className="absolute p-4 pt-12 flex flex-col items-center  inset-3  bg-amber-800 rounded-[30px] z-10">
        <div className="w-16 h-16 bg-gray-400 rounded-full overflow-hidden">
          <img src="/images/profile-photo.png" alt="" />
        </div>
        <h1 className="mt-2">John Doe</h1>
        <p className="text-sm text-amber-100/60 text-center">@johndoe · Creator & Dev</p>
        <div className="w-full mt-8">
          {links.map((e:LinkP, i:number)=>(
          <Link to={"/"} key={i} className="w-full h-10 flex justify-center items-center gap-2 bg-amber-100 text-black my-4 rounded-sm p-2 hover:bg-transparent border border-amber-100 hover:text-white transition-all">
            <img src={e.icon} alt="" className=" h-full object-contain" />
            <p>{e.text}</p>
          </Link>
        ))}

        <button className="bg-amber-300 text-black w-full py-3 rounded-sm mt-4 cursor-pointer hover:scale-105 transition-transform">Subscribe to Newsletter</button>
        </div>
      </div>

      {/* Phone frame */}
      <img
        className="absolute inset-0 w-full h-full object-cover "
        src="/images/phone-frame.png"
        alt="Phone Frame"
      />
    </div>
  );
};