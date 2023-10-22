import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Link} from 'react-router-dom';
import * as React from "react";
import {Typography} from "@mui/material";
import mypage_bg from "./rent/mypage_bg.png";

export default function Top() {
    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const tabContainerStyle = {
        width: '100%',
        margin: 0,

    };


    return (
        <main id="container_common">
            <div className="sub_visual">
                <div className="bg"><img src={mypage_bg} alt="마이페이지"/></div>
                <div className="layout">
                    <h2 className="title">마이페이지</h2>
                    <ul className="location">
                        <li><a href="https://sj-equity.or.kr/"><span>HOME</span></a></li>
                        <li><a href="/"><span>마이페이지</span></a></li>
                        <li><a href="javascript:void(0);" className='currently'><span>교육 신청내역</span></a></li>
                    </ul>

                </div>
                <div className="snb">
                    <div className="layout">
                        <div className="snb_tab">
                            <Box sx={tabContainerStyle}>
                                <Tabs value={value}
                                      onChange={handleChange}
                                      textColor="secondary"
                                      indicatorColor="secondary"
                                      aria-label="secondary tabs example">
                                    <Tab value="one"
                                         label={
                                             <Typography sx={{
                                                 fontSize: '1.8rem',
                                                 fontWeight: 'bold',
                                                 color: '#fff',
                                                 fontFamily: 'IBM Plex Mono',
                                                 letterSpacing: '3px',
                                             }}>교육신청내역 </Typography>}
                                         component={Link}
                                         to="https://sj-equity.or.kr/mypage"/>
                                    <Tab value="two"
                                         label={
                                             <Typography sx={{
                                                 fontSize: '1.8rem',
                                                 fontWeight: 'bold',
                                                 color: '#fff',
                                                 fontFamily: 'IBM Plex Mono',
                                                 letterSpacing: '3px',
                                             }}>공간대관신청내역 </Typography>}
                                         component={Link}
                                         to="공간대관신청내역페이지"/>

                                    <Tab value="three"
                                         label={
                                             <Typography sx={{
                                                 fontSize: '1.8rem',
                                                 fontWeight: 'bold',
                                                 color: '#fff',
                                                 fontFamily: 'IBM Plex Mono',
                                                 letterSpacing: '3px',
                                             }}>활동내역 </Typography>}
                                         component={Link}
                                         to="활동내역페이지"/>

                                    <Tab value="four"
                                         label={
                                             <Typography sx={{
                                                 fontSize: '1.8rem',
                                                 fontWeight: 'bold',
                                                 color: '#fff',
                                                 fontFamily: 'IBM Plex Mono',
                                                 letterSpacing: '3px',
                                             }}>인재풀신청내역 </Typography>}
                                         component={Link}
                                         to="인재풀신청내역페이지"/>

                                    <Tab value="five"
                                         label={
                                             <Typography sx={{
                                                 fontSize: '1.8rem',
                                                 fontWeight: 'bold',
                                                 color: '#fff',
                                                 fontFamily: 'IBM Plex Mono',
                                                 letterSpacing: '3px',
                                             }}>소모임신청내역 </Typography>}
                                         component={Link}
                                         to="소모임신청내역페이지"/>

                                    <Tab value="six"
                                         label={
                                             <Typography sx={{
                                                 fontSize: '1.8rem',
                                                 fontWeight: 'bold',
                                                 color: '#fff',
                                                 fontFamily: 'IBM Plex Mono',
                                                 letterSpacing: '3px',
                                             }}>상담내역 </Typography>}
                                         component={Link}
                                         to="상담내역 페이지"/>
                                </Tabs>
                            </Box>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );

}







