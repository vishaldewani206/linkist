import { useEffect, useRef } from "react";
import gsap from "gsap";

interface IconAnimationProps {
  images: string[];
  size?: number;
  interval?: number;
  duration?: number;
  altPrefix?: string;
}

export const IconAnimation = ({
  images,
  size = 34,
  interval = 2,
  duration = 0.45,
  altPrefix = "image",
}: IconAnimationProps) => {
  const itemRefs = useRef<(HTMLImageElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (images.length < 2) return;

    const items = itemRefs.current.filter(Boolean) as HTMLImageElement[];

    gsap.set(items, { y: 0, opacity: 0,});
    
    gsap.set(items[0], { opacity: 1 });

    const tick = () => {
      const currentIndex = currentIndexRef.current;
      const nextIndex = (currentIndex + 1) % items.length;

      const current = items[currentIndex];
      const next = items[nextIndex];

      const tl = gsap.timeline();
      timelineRef.current = tl;

      tl.set(next, { y: -size * 0.6, opacity: 0, scale:0.6 })
      tl.set(".box", {y:-4, opacity:0.5})
        .to(
          current,
          { y: size * 0.8, scale: 0.6, opacity: 0, duration, ease: "power2.in" },
          0
        ).to(".box", {y: 0, opacity:1, ease: "power2.out"}, "<=0.3")

        .to(
          next,
          { y: 0, opacity: 1, scale:1, duration, ease: "power2.out" },
          duration * 0.25 
        )

        .set(current, { y: 0, scale: 1 });

      currentIndexRef.current = nextIndex;
    };

    const id = setInterval(tick, interval * 1000);

    return () => {
      clearInterval(id);
      timelineRef.current?.kill();
      gsap.set(items, { clearProps: "all" });
    };
  }, [images, size, interval, duration]);

  return (
    <div className="relative">
    <div
      style={{
        width: size,
        height: size 
      }}
      className="flex flex-col justify-center items-center relative overflow-hidden"
    >
      {images.map((src, i) => (
        <img
          key={src + i}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          src={src}
          alt={`${altPrefix} ${i + 1}`}
          width={size}
          height={size}
          style={{
            width: size,
            height: size,
            objectFit: "cover",
            userSelect: "none",
            draggable: false,
          } as React.CSSProperties}
          className="z-20 absolute  bg-green-500 md:rounded-3xl rounded-xl"
        />
      ))}
    </div>
      <div 
        style={{
            width: size,
            height: size,
            objectFit: "cover",
            userSelect: "none",
            draggable: false,
          } as React.CSSProperties}
          className="bg-gray-500  md:rounded-3xl rounded-xl z-10 absolute -top-2 -left-2"
      />
      <div 
        style={{
            width: size - 10,
            height: size -10,
            objectFit: "cover",
            userSelect: "none",
            draggable: false,
          } as React.CSSProperties}
          className="bg-gray-300 -top-3 -left-3 md:rounded-3xl rounded-xl box absolute "
      ></div>
    </div>
  );
};

