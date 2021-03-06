import { useState, createContext, ReactNode, useEffect } from "react";
import challenges from "../../challenges.json";
import Cookies from 'js-cookie'
import { LevelUpModal } from "../components/LevelUpModal";

interface ChallengesProviderProps {
  children: ReactNode;
  level: number,
  currentExperience: number,
  challengesCompleted:number
}
interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengesData {
  level: number;
  levelUp: () => void;
  activeChallenge: Challenge;
  currentExperience: number;
  challengesCompleted: number;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  ExperienceToNextLevel: number;
  completeChallenge:()=> void;
  closeLevelUpModal: () => void;
}
export const challengesContext = createContext({} as ChallengesData);

export function ChallengesProvider({ children, ...rest}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUpModalOpen, setLevelUpModalOpen] = useState(false)

  const ExperienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(()=>{
    Notification.requestPermission();
  }, [])

  useEffect(()=>{
    Cookies.set('level', String(level));
    Cookies.set('currentExperience', String(currentExperience));
    Cookies.set('challengesCompleted', String(challengesCompleted))
  },[level,currentExperience,challengesCompleted])

  function levelUp() {
    setLevel(level + 1);
    setLevelUpModalOpen(true)
  }

  function closeLevelUpModal(){
    setLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio('/notification.mp3').play()
    
    if(Notification.permission === 'granted'){
      new Notification ('New Challenge 💪',{
        body:` Worth ${challenge.amount} XP@`
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }
    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= ExperienceToNextLevel) {
      finalExperience = finalExperience - ExperienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <challengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        ExperienceToNextLevel,
        completeChallenge,
        closeLevelUpModal
      }}
    >
      {children}
      {isLevelUpModalOpen && <LevelUpModal/>}
    </challengesContext.Provider>
  );
}
