import Club from '../../../../img/component/Main/Club.png'
import styles from '../../../../css/component/Main/Club/ClubContainer.module.css'

function ClubContainer() {


    return(

        <div className={styles.clubContainer}>
            <img src={Club} alt={'게시판'}  className={styles.image}/>
        </div>
    )

}

export default ClubContainer;