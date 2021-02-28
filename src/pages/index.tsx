import { ChallengeBox } from '../components/ChallengeBox'
import { CompleteChallenge } from '../components/CompletedChallenges'
import { Countdown } from '../components/CountDown'
import { ExperienceBar } from '../components/ExperienceBar'
import {Profile} from '../components/Perfil'
import { CountdownProvider } from '../contexts/CountdownContext'
import styles from '../styles/pages/Home.module.css'
import {GetServerSideProps} from 'next'
import { ChallengesProvider } from '../contexts/ChallengeContext'

interface Homeprops{
  level: number,
  currentExperience: number,
  challengesCompleted:number
}

export default function Home(props : Homeprops) {

  return (
    <ChallengesProvider level ={props.level}
    currentExperience={props.currentExperience}
    challengesCompleted={props.challengesCompleted}>
    <div className={styles.container}>    
    <ExperienceBar/> 

    <CountdownProvider>
    <section>
      <div>
        <Profile/>
        <CompleteChallenge/>
        <Countdown/>
      </div>
      <div>
        <ChallengeBox/>
      </div>
    </section>
    </CountdownProvider>
  </div>
  </ChallengesProvider>
  )
}

export const  getServerSideProps: GetServerSideProps = async (contexts)=>{
  const {level, currentExperience, challengesCompleted} = contexts.req.cookies;
 return{
   props:{
     level:Number(level),
     currentExperience:Number(currentExperience),
     challengesCompleted:Number(challengesCompleted),
   }
 }
}
