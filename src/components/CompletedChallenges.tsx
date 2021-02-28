import {useContext} from 'react';
import { challengesContext} from '../contexts/ChallengeContext'


import styles from '../styles/components/CompleteChallenges.module.css'
export function CompleteChallenge(){

    const{challengesCompleted} = useContext(challengesContext)


    return(
     <div className={styles.completeChallenge}>
         <span>Complete Challenges</span>
         <span>{challengesCompleted}</span>
    </div>
    );
}

// Focopraticagrupo 


