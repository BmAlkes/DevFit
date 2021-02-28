import { useContext} from 'react'
import { challengesContext} from '../contexts/ChallengeContext'
import styles from '../styles/components/ExperienceBar.module.css'

export function ExperienceBar(){

    const { currentExperience, ExperienceToNextLevel} = useContext(challengesContext)

    const percentToNextLevel = Math.round(currentExperience * 100) / ExperienceToNextLevel

    return(
        <header className={styles.experienceBar}>
          <span>0 XP</span>
          <div>
              <div style={{width:`${percentToNextLevel}%`}}/>
              <span className={styles.currentExperience} style={{left:`${percentToNextLevel}%`}}>{currentExperience}XP</span>
          </div>
          <span>{ExperienceToNextLevel}XP</span>  
        </header>
    )
}