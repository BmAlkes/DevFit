import { useContext} from 'react';
import { challengesContext} from '../contexts/ChallengeContext'
import styles from '../styles/components/Profile.module.css'

export function Profile() {

        const {level} = useContext(challengesContext)
    return (
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/41919686?s=460&v=4" alt=""/>
            <div>
                <strong>Bruno Malkes</strong>
                <p> <img src="icons/level.svg" alt=""/>
                  Level  {level}</p>
            </div>
        </div>
    )
}