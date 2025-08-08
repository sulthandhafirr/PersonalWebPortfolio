import { useEffect, useState } from "react";

export const Preloader = ({ onFinish }) => {
  const [textGlowIn, setTextGlowIn] = useState(false);
  const [textFadeOut, setTextFadeOut] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [fadeScreenOut, setFadeScreenOut] = useState(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => setTextGlowIn(true), 100);
    const fadeOutTimer = setTimeout(() => setTextFadeOut(true), 1800);
    const hideTextTimer = setTimeout(() => setHideText(true), 2400);
    const fadeScreenTimer = setTimeout(() => setFadeScreenOut(true), 2600);
    const finishTimer = setTimeout(() => onFinish(), 3000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTextTimer);
      clearTimeout(fadeScreenTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-700 ${
        fadeScreenOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {!hideText && (
        <>
          <h1 className={`font-code text-white text-5xl sm:text-8xl tracking-widest transition-opacity duration-700 ${textFadeOut? "opacity-0": textGlowIn? "opacity-100": "opacity-0"}`}>Hello World!</h1>
          <p className={`absolute bottom-6 text-gray-400 text-sm sm:text-base transition-opacity duration-700 ${textFadeOut? "opacity-0": textGlowIn? "opacity-80": "opacity-0"}`}>Designed and coded by Sulthan DR © 2025</p>
        </>
      )}
    </div>
  );
};
