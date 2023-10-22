import styles from "../../../css/pages/Club/ClubPage.module.css"

function ClubMain() {
    return (
        <div className={styles.cm}>
            <h1><strong>소모임을 시작해보세요!</strong></h1>
            <p>새로운 소모임을 찾고 있나요? 당신의 소모임이 새로운 멤버를 기다리고 있나요?
                <br/>세종여성플라자가 당신의 소모임과 함께합니다!
                <br/>세종여성플라자에 올라오는 소모임은 모두 관리자의 확인 후 등록되는 소모임이에요.
                <br/>안심하고 새로운 소모임을, 새로운 멤버를 찾아보세요.
            </p>

        </div>
    );

}

export default ClubMain;