
import { useState, useEffect } from "react";

interface RollingTextProps {
  words: string[];
  delay?: number;
}

export const RollingText = ({ words, delay = 2500 }: RollingTextProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [animationState, setAnimationState] = useState<"entering" | "visible" | "exiting">("visible");

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Start exit animation
      setAnimationState("exiting");
      
      // After exit animation completes, change word and start enter animation
      const exitTimeout = setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setAnimationState("entering");
        
        // After enter animation completes, set to visible
        const enterTimeout = setTimeout(() => {
          setAnimationState("visible");
        }, 500);
        
        return () => clearTimeout(enterTimeout);
      }, 500);
      
      return () => clearTimeout(exitTimeout);
    }, delay);

    return () => clearInterval(intervalId);
  }, [words, delay]);

  return (
    <span className={`inline-block min-w-32 transition-all duration-500 text-secondary ${
      animationState === "entering" 
        ? "translate-y-[-10px] opacity-0" 
        : animationState === "exiting" 
          ? "translate-y-[10px] opacity-0" 
          : "translate-y-0 opacity-100"
    }`}>
      {words[currentWordIndex]}
    </span>
  );
};
