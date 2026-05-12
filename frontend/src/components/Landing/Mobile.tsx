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
    <div className="mobile">
      
      <div className="mobile-wrapper">
        <div className="md:w-16 md:h-16 w-12 h-12 bg-gray-400 rounded-full overflow-hidden">
          <img src="/images/profile-photo.png" alt="" />
        </div>
        <h1 className="mt-2">John Doe</h1>
        <p className="text-xs md:text-sm text-amber-100/60 text-center">@johndoe · Creator & Dev</p>
        <div className="w-full mt-4 md:mt-8">
          {links.map((e:LinkP, i:number)=>(
          <Link to={"/"} key={i} className="mobile-btn">
            <img src={e.icon} alt="" className=" h-full object-contain" />
            <p>{e.text}</p>
          </Link>
        ))}

        <button className="bg-amber-300 text-black w-full py-1 md:py-3 rounded-sm mt-2 md:mt-4 cursor-pointer hover:scale-105 transition-transform text-sm md:text-lg">Subscribe to Newsletter</button>
        </div>
      </div>

      <img
        className="absolute inset-0 w-full h-full object-cover  z-20"
        src="/images/phone-frame.png"
        alt="Phone Frame"
      />
    </div>
  );
};