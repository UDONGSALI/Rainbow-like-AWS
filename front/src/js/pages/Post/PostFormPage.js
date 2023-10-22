import PostForm from "../../component/Post/PostForm";
import useFetch from "../../component/hook/useFetch";
import {SERVER_URL} from "../../component/Common/constants";
import Header from "../../layout/Header/Header";
import {headerInfo, urlData} from "../../layout/Header/Data/InfoShareHeader";
import { useLocation } from "react-router-dom";
import React from "react";
import Footer from "../../layout/Footer/footer";

function PostFormPage() {
    const location = useLocation();
    const { boardNum } = location.state || {};
    const { data: postNum, loading } = useFetch(`${SERVER_URL}post/lastPostNum`);
    let footerTitle = "";

    if (boardNum == "1") {
        footerTitle = "공지사항";
    } else if (boardNum == "2") {
        footerTitle = "언론보도";
    }else if (boardNum == "3") {
        footerTitle = "세종시 기관 및 단체 소식";
    }else if (boardNum == "4") {
        footerTitle = "여플소식";
    }else if (boardNum == "5") {
        footerTitle = "뉴스레터";
    }

    // 로딩 중일 때는 "Loading..." 메시지를 표시
    if (loading || !postNum) {
        return <div>Loading...</div>;
    }

    // 로딩이 끝나면 PostForm 컴포넌트를 렌더링
    return (
        <div>
            <Header headerTitle={headerInfo} urlItems={urlData} footerTitle={footerTitle}/>
            <PostForm postNum={postNum} />
        </div>
    );
}

export default PostFormPage;