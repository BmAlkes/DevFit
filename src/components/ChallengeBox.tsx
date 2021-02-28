import {useContext} from 'react';
import {challengesContext} from '../contexts/ChallengeContext'
import {CountdownContext} from '../contexts/CountdownContext'

import styles from '../styles/components/ChallengeBox.module.css'

export function ChallengeBox(){

    const {activeChallenge , resetChallenge , completeChallenge} = useContext(challengesContext)
    const {resetContdown} = useContext( CountdownContext)

    function handleChallengeSucess(){
        completeChallenge();
        resetContdown();
    }

    function handleChallengeFailed(){
        resetChallenge();
        resetContdown()
    }
   return(
       <div className={styles.challengeBoxContainer}>
           {activeChallenge ? ( <div className={styles.ChallengeActive}>

            <header>Win {activeChallenge.amount}</header>
            <main>
                <img src={`icons/${activeChallenge.type}.svg`} alt=""/>
                <strong> New Challenge</strong>
                <p>{activeChallenge.description}</p>
            </main>
            
            <footer>
                <button type="button" className={ styles.challengeComplete}
                 onClick={handleChallengeSucess}>Complete
                </button>
                <button type="button" onClick={handleChallengeFailed} className={styles.challengeFailedButton}
                 > Skip Challenge
                  </button>
            </footer>

           </div>): (
             
           <div className={styles.challengeNotActive}>
           <strong>End a cycle to receive new challenges</strong>
           <p>
               <img src="icons/level-up.svg" alt=""/>
               Level up challenges completed
           </p>
           </div>

           )}
       </div>
   ) 
}