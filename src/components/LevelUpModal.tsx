import {useContext} from 'react';
import {challengesContext} from '../contexts/ChallengeContext'
import styles from '../styles/components/LevelUpModal.module.css'


export function LevelUpModal(){

    const {level, closeLevelUpModal} = useContext(challengesContext)


    return(
        <div className={styles.overlay}>
            <div className={styles.container}>
                <header> {level}</header>
                <strong>Congratulation</strong>
                <p>you've reached a new level</p>
                <button type="button" onClick={closeLevelUpModal} >
                    <img src="/icons/close.svg" alt="close modal"/>
                </button>
            </div>
        </div>
    )
}