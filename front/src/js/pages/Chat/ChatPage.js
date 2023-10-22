import ChatList from "../../component/Chat/ChatList";
import styles from "../../../css/pages/Club/ClubPage.module.css"
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/AdminHeader";
import React from "react";

function ChatPage(){

    return(
        <>
        <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={"채팅 문의"}/>
        <div className={styles.ClubMainPage}>
        <div className={styles.List}>
            <ChatList />
        </div>
        </div>
</>
    )
}

export default ChatPage;