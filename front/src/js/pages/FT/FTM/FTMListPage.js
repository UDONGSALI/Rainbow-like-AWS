import FTMList from "../../../component/FT/FTM/FTMList";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';

function FTMListPage(){
    const isAdmin = sessionStorage.getItem("role") === "ADMIN";

    return (
        isAdmin ?
            (
                <div className={styles.postDetailPage}>
                    <FTMList />
                </div>
            )
            :
            (
                <div>
                    <h1>잘못된 접근입니다.</h1>
                </div>
            )
    );
}

export default FTMListPage;