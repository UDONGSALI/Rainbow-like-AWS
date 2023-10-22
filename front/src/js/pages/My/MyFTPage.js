import styles from "../../../css/pages/mypage/MyActivePage.module.css";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/MyHeader";
import MyFTCList from "../../component/My/FT/MyFTCList";
import MyFTWList from "../../component/My/FT/MyFTWList";

const MyFTPage = () => {
    return (

        <div id={styles.container}>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={'인재풀 신청내역'}/>
            <MyFTWList/>
            <MyFTCList/>
        </div>

    );
}

export default MyFTPage;