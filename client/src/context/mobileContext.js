import { createContext, useContext, useEffect, useState } from "react";

export const MobileContext = createContext(false);

export const MobileProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return <MobileContext.Provider value={isMobile}>{children}</MobileContext.Provider>;
};

export const useIsMobile = () => {
  const isMobile = useContext(MobileContext);
  return isMobile;
};
