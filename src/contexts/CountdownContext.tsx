import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { challengesContext } from "./ChallengeContext";

interface CountdownContextData {
  minutes: number;
  seconds: number;
  hasFinished: boolean;
  isActive: boolean;
  startContdown: () => void;
  resetContdown: () => void;
}

interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);
let countdownTimeout: NodeJS.Timeout;
export function CountdownProvider({ children }: CountdownProviderProps) {
  const { startNewChallenge } = useContext(challengesContext);

  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hasFinished, setHasFinish] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startContdown() {
    setIsActive(true);
  }

  function resetContdown() {
    clearInterval(countdownTimeout);
    setIsActive(false);
    setTime(0.1 * 60);
    setHasFinish(false)
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinish(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinished,
        isActive,
        startContdown,
        resetContdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
}
