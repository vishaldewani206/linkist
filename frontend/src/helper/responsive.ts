import { useMediaQuery } from "react-responsive";

export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 769, maxWidth: 1024 });

  if (isMobile) {
    return {
      initialMaskPos: "50% 50%",
      initialMaskSize: "2500% 2500%",

      maskPos: "50% 18vh",
      maskSize: "75% 75%",
    };
  }

  if (isTablet) {
    return {
      initialMaskPos: "50% -160vh",
      initialMaskSize: "2800% 2800%",
      maskPos: "50% 20vh",
      maskSize: "40% 40%",
    };
  }

  return {
    initialMaskPos: "50% 22%",
    initialMaskSize: "3500% 3500%",
    maskPos: "50% 22%",
    maskSize: "20% 20%",
  };
};