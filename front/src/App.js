// React & Router Imports
import React, {useEffect, useState} from "react";
import {Navigate, Route, Routes, useLocation} from "react-router-dom";

// CSS Import
import './App.css';

// Layouts
import CustomNavbar from "./js/layout/Navbar/CustomNavbar";

// Hooks
import {useTracking} from "./js/component/hook/useTracking";
import {useToken} from "./js/component/hook/useToken";

// Main & Intro Pages
import MainPage from "./js/pages/Main/MainPage";
import IntroPage from "./js/pages/Intro/IntroPage";

// Login & User-related Pages
import LoginPage from "./js/pages/Login/LoginPage";
import SignUpPage from "./js/pages/Login/SignUpPage";
import MyActivePage from "./js/pages/My/MyActivePage";
import MyEduPage from "./js/pages/My/MyEduPage";
import MyRentPage from "./js/pages/My/MyRentPage";
import MyFTPage from "./js/pages/My/MyFTPage";
import MyClubPage from "./js/pages/My/MyClubPage";
import MyCounselPage from "./js/pages/My/MyCounselPage";
import MyInfoEditPage from "./js/pages/My/MyInfoEditPage";
import MyInfoEditSuccessPage from "./js/pages/My/MyInfoEditSuccessPage";

// Member Management
import MemManagePage from "./js/pages/Member/MemManagePage";

// Education-related Pages
import EduCalendarPage from "./js/pages/Edu/EduCalendarPage";
import EduListPage from "./js/pages/Edu/EduListPage";
import EduDetailPage from "./js/pages/Edu/EduDetailPage";
import EduAddPage from "./js/pages/Edu/EduAddPage";
import EduEditPage from "./js/pages/Edu/EduEditPage";
import EduApplyPage from "./js/pages/Edu/EduApplyPage";
import EduHistListPage from "./js/pages/Edu/EduHistListPage";

// Post-related Pages
import PostDetailPage from './js/pages/Post/PostDetailPage';
import NoticeListPage from './js/pages/Post/NoticeListPage';
import SjNewsPage from "./js/pages/Post/SjNewsPage";
import CslListPage from "./js/pages/Post/CslListPage";
import CslFormPage from "./js/pages/Post/CslFormPage";
import PostFormPage from "./js/pages/Post/PostFormPage";
import PostForm from "./js/component/Post/PostForm";

// Board
import BoardPostListPage from "./js/pages/Board/BoardPostListPage";
import BoardListPage from "./js/pages/Board/BoardListPage";

// Organization
import OrgListPage from "./js/pages/Organization/OrgListPage";

// Logs
import LogListPage from "./js/pages/Log/LogListPage";

// Rent-related Pages
import RentProcessPage from "./js/pages/Rent/RentProcessPage";
import RentStatusPage from "./js/pages/Rent/RentStatusPage";
import RentHistListPage from "./js/pages/Rent/RentHistListPage";
import RentReviewPostPage from "./js/pages/Rent/RentReviewPostPage";
import RentReviewListPage from "./js/pages/Rent/RentReviewListPage";
import RentReviewEditPage from "./js/pages/Rent/RentReviewEditPage";
import RentReviewWritePage from "./js/pages/Rent/RentReviewWritePage";

// FT Pages
import FTMainPage from "./js/pages/FT/FTMainPage";
import FTWListPage from "./js/pages/FT/FTW/FTWListPage";
import FTWFormPage from "./js/pages/FT/FTW/FTWFormPage";
import FTWDtlPage from "./js/pages/FT/FTW/FTWDtlPage";
import FTWEditPage from "./js/pages/FT/FTW/FTWEditPage";
import FTCListPage from "./js/pages/FT/FTC/FTCListPage";
import FTCFormPage from "./js/pages/FT/FTC/FTCFormPage";
import FTCDtlPage from "./js/pages/FT/FTC/FTCDtlPage";
import FTCEditPage from "./js/pages/FT/FTC/FTCEditPage";
import MatchingPopup from "./js/component/FT/FTM/MatchingPopup";

// Club-related Pages
import ClubPage from "./js/pages/Club/ClubPage";
import ClubFormPage from "./js/pages/Club/ClubFormPage";
import ClubDtlPage from "./js/pages/Club/ClubDtlPage";
import ClubEditorPage from "./js/pages/Club/ClubEditorPage";

// Payment & SMS Pages
import Pay from "./js/component/Pay/pay";
import SMSPage from "./js/pages/SMS/SMSPage";
import PayListPage from "./js/pages/Pay/PayListPage";

// Chat-related Pages & Components
import ChatPage from "./js/pages/Chat/ChatPage";
import ChatBot from "./js/component/Chat/ChatBot";
import Chatting from "./js/component/Chat/Chatting";

// Miscellaneous
import SearchPage from "./js/pages/Search/SearchPage";
import QnAPage from "./js/pages/QnA/QnAPage";
import ErrorPage from "./js/pages/ErrorPage";
import Footer from "./js/layout/Footer/footer";

import Cinnamoroll1 from './img/pages/시나모롤1.png'
import Cinnamoroll2 from './img/pages/시나모롤2.jpg'
import Cinnamoroll3 from './img/pages/시나모롤3.jpg'
import Cinnamoroll4 from './img/pages/시나모롤4.jpg'
import Cinnamoroll5 from './img/pages/시나모롤5.jpg'
import Cinnamoroll7 from './img/pages/시나모롤2.png'
import Cinnamoroll8 from './img/pages/시나모롤8.jpg'
import Cinnamoroll9 from './img/pages/시나모롤9.jpg'
import Pompompurin from './img/pages/폼폼푸린_배경.jpg'


function App() {
    const decodeToken = useToken();
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem("role") === "ADMIN");
    const [memId, setMemId] = useState(sessionStorage.getItem('memId'));
    const [jti, setJti ]= useState(sessionStorage.getItem('jti'));
    const {trackButtonClick, trackPageView} = useTracking(memId);
    const location = useLocation();
    const isPaymentRoute = location.pathname.includes("/pay/");
    const isFtPOPRoute = location.pathname.includes("/ftmpop/");
    const isChatRoute = location.pathname.includes("/chat");
    const [selectedBgImage, setSelectedBgImage] = useState("");

    useEffect(() => {
        setMemId(sessionStorage.getItem("memId"));
        setIsAdmin(sessionStorage.getItem("role") === "ADMIN");
        setJti(sessionStorage.getItem("jti"));
    }, [location]);

    useEffect(() => {
        trackPageView();
    }, [trackPageView]);

    useEffect(() => {
        if (memId === "cinnamoroll") {
            // memId가 cinnamoroll인 경우에만 랜덤 이미지 선택
            const randomImage = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];
            setSelectedBgImage(randomImage);
        } else {
            setSelectedBgImage("");  // 그렇지 않은 경우에는 기본 배경 이미지로 설정
        }
    }, [memId, location]);

    const backgroundImages = [
        Cinnamoroll1,
        Cinnamoroll2,
        Cinnamoroll3,
        Cinnamoroll4,
        Cinnamoroll5,
        Cinnamoroll7,
        Cinnamoroll8,
        Cinnamoroll9,
        Pompompurin,
    ];

    return (
        <div className="App"
             style={{ backgroundImage: `url(${selectedBgImage})`, /*backgroundSize:'100%', backgroundPosition:'center center', backgroundRepeat:"no-repeat"*/}}
             onClick={trackButtonClick}>

            {!isPaymentRoute && !isChatRoute &&  !isFtPOPRoute && <CustomNavbar memId={memId} isAdmin={isAdmin} jti={jti}/>}
            <Routes>
                <Route path="/" element={<MainPage/>}/>

                {/*로그인*/}
                <Route path="/login" element={<LoginPage memId={memId} jti={jti}/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
                <Route path="/search" element={<SearchPage/>}/>

                {/*관리자*/}
                <Route path="/admin/member" element={isAdmin ? <MemManagePage/> : null}/>
                <Route path="/admin/edu" element={isAdmin ? <EduListPage type="admin"/> : null}/>
                <Route path="/admin/edu/add" element={isAdmin ? <EduAddPage/> : null}/>
                <Route path="/admin/edu/edit/:eduNum" element={isAdmin ? <EduEditPage/> : null}/>
                <Route path="/admin/eduHist" element={isAdmin ? <EduHistListPage memId={memId} type="admin"/> : null}/>
                <Route path="/admin/rentHist"
                       element={isAdmin ? <RentHistListPage memId={memId} type="admin"/> : null}/>
                <Route path="/admin/pay" element={isAdmin ? <PayListPage/> : null}/>
                <Route path="/admin/org" element={isAdmin ? <OrgListPage/> : null}/>
                <Route path="/admin/board" element={isAdmin ? <BoardListPage/> : null}/>
                <Route path="/admin/board/post/:boardNum" element={isAdmin ? <BoardPostListPage/> : null}/>
                <Route path="admin/ftmain" element={isAdmin ? <FTMainPage type="admin"/> : null}/>
                <Route path="admin/ftmain/ftw/:id" element={isAdmin ? <FTWDtlPage type="admin"/> : null}/>
                <Route path="/admin/log" element={isAdmin ? <LogListPage/> : null}/>

                {/*기관소개*/}
                <Route path="/intro" element={<IntroPage/>}/>

                {/*교육*/}
                <Route path="/edu/calendar" element={<EduCalendarPage/>}/>
                <Route path="/edu/list" element={<EduListPage/>}/>
                <Route path="/edu/list/detail/:eduNum" element={<EduDetailPage/>}/>
                <Route path="/edu/list/apply/:eduNum"
                       element={memId ? <EduApplyPage/> : <Navigate to="/login" replace/>}/>
                <Route path="/edu/applylist"
                       element={memId ? <EduHistListPage memId={memId} type="edu"/> : <Navigate to="/login" replace/>}/>

                {/*결제*/}
                <Route path="/pay/:rentHistNum/:fee" element={<Pay/>}/>

                {/*질문*/}
                <Route path="/qna" element={<QnAPage/>}/>

                {/*에러*/}
                <Route path="/error" element={<ErrorPage/>}/>

                {/*게시글*/}
                <Route path="/post/detail/:boardNum/:postNum" element={<PostDetailPage/>}/>
                <Route path="/imgPost/:boardNum" element={<SjNewsPage/>}/>
                <Route path="/post/:boardNum" element={<NoticeListPage/>}/>
                <Route path="/csl/:boardNum" element={<CslListPage/>}/>
                <Route path="/csl/new" element={<CslFormPage/>}/>
                <Route path="/csl/new/:parentsNum" element={<CslFormPage/>}/>
                <Route path="/post/new" element={<PostFormPage/>}/>
                <Route path="/post/edit/:postNum" element={<PostForm/>}/>

                {/*공간대관페이지관련*/}
                <Route path="/rent/process" element={<RentProcessPage/>}/>
                <Route path="/rent/status" element={<RentStatusPage/>}/>
                <Route path="/rent/review" element={<RentReviewListPage/>}/>
                <Route path="/rent/review/post/:postNum" element={<RentReviewPostPage/>}/>
                <Route path="/rent/review/edit/:postNum"
                       element={memId ? <RentReviewEditPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/rent/review/write" element={<RentReviewWritePage/>}/>

                {/*마이페이지관련*/}
                <Route path="/mypage/edu"
                       element={memId ? <MyEduPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/rent"
                       element={memId ? <MyRentPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/active"
                       element={memId ? <MyActivePage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/ftw"
                       element={memId ? <MyFTPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/club"
                       element={memId ? <MyClubPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/csl"
                       element={memId ? <MyCounselPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/infoEdit"
                       element={memId ? <MyInfoEditPage memId={memId}/> : <Navigate to="/login" replace/>}/>
                <Route path="/mypage/infoEditSuccess"
                       element={memId ? <MyInfoEditSuccessPage memId={memId}/> : <Navigate to="/login" replace/>}/>

                {/*소모임*/}
                <Route path="/clubsMain" element={<ClubPage/>}/>
                <Route path="/clubs/new" element={memId ? <ClubFormPage/> : <Navigate to="/login" replace/>}/>
                <Route path="/clubs/:id" element={<ClubDtlPage/>}/>
                <Route path="/clubs/edit/:id" element={<ClubEditorPage/>}/>

                {/*인재풀*/}
                <Route path="/ftmain" element={<FTMainPage/>}/>
                <Route path="/ftw/new" element={memId ? <FTWFormPage/> : <Navigate to="/login" replace/>}/>
                <Route path="/ftw/dtl/:id" element={<FTWDtlPage/>}/>
                <Route path="/ftw/edit/:id" element={<FTWEditPage/>}/>
                <Route path="/ftc/new" element={memId ? <FTCFormPage/> : <Navigate to="/login" replace/>}/>
                <Route path="/ftc/dtl/:id" element={<FTCDtlPage/>}/>
                <Route path="/ftc/edit/:id" element={<FTCEditPage/>}/>
                <Route path="/admin/ftmain/ftw" element={isAdmin ? <FTWListPage/> : null}/>
                <Route path="/admin/ftmain/ftc" element={isAdmin ? <FTCListPage/> : null}/>
                <Route path="/ftmpop/:ftcNum" element={isAdmin ? <MatchingPopup/> : null}/>

                {/*SMS*/}
                <Route path="/sms" element={isAdmin ? <SMSPage/> : null}/>

                {/*챗봇 / 채팅*/}
                <Route path="/chat" element={<ChatBot/>}/>
                <Route path="/chat/:memNum" element={<Chatting/>}/>
                <Route path="/listchat" element={<ChatPage/>}/>

            </Routes>

            {!isPaymentRoute && !isChatRoute && !isFtPOPRoute && <Footer/>}
        </div>);
}

export default App;